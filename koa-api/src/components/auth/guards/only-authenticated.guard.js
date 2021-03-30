module.exports = async function (ctx) {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login');
  }
};
