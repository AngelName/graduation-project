const { app, mock, assert } = require('egg-mock/bootstrap');

describe('/test/service/page.test.js', () => {

  it('get page', async () => {
    const ctx = app.mockContext();
    const obj = await ctx.service.page.get();
    assert(total === 14);
  });


});