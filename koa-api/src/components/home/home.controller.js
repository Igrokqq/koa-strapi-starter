module.exports = {
  async index(ctx) {
    await ctx.render('home', {
      layout: 'layouts/base',
    });
  },

  ping(ctx) {
    ctx.body = 'Hello world!';
  },
};
