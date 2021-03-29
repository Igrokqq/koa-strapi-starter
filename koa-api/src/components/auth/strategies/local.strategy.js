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

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return done(null, false, {
      message: 'Password is not equal to existing',
    });
  }

  return done(null, user);
};

module.exports = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, authenticate);
