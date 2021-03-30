const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');

const StudentService = () => require('../../student/student.service');

const authenticate = async function (email, password, done) {
  const studentService = StudentService();
  const user = await studentService.getByEmail(email);

  if (!user) {
    return done(null, false, {
      message: 'This user does not exist or email is incorrect',
    });
  }

  try {
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return done(null, false, {
        message: 'Password is not equal to existing',
      });
    }
    // @todo find a way to get rid of global.user = user statement here.
    global.user = user;

    return done(null, user);
  } catch (error) {
    return done(null, false, {
      message: 'password is not equal to existing',
    });
  }
};

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, authenticate);
