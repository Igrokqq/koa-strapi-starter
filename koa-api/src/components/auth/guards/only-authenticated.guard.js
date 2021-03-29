module.exports = function (ctx) {
  if (ctx.isUnauthenticated()) {
    ctx.redirect('/login');
  }
};
