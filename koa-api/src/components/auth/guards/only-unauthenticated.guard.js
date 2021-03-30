module.exports = async function (ctx) {
  if (ctx.isAuthenticated()) {
    ctx.redirect('back');
  }
};
