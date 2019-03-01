const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/controller/page.test.js', () => {
  // test cases

    it('should status 200 and get the body', () => {
      // 对 app 发起 `GET /` 请求
      return app.httpRequest()
      .get('/page/delete/1')
      .expect(200) // 期望返回 status 200
      .expect("1"); // 期望 body 是 1
  });

  it('should status 200 and get the body', () => {
    // 对 app 发起 `GET /` 请求
    app.mockCsrf() 
    return app.httpRequest()
    .post('/page/update')
    .send({name: 'john'})
    .set('Accept', 'application/json')
    .set('x-csrf-token','dLqhmgd-cjYMPYgdf01ih8Rv')
    .expect(200) // 期望返回 status 200
    .expect({name: 'john'}); // 期望 body 是 1
  });

    it('insert data', () => {
      // 对 app 发起 `GET /` 请求
      app.mockCsrf() 
      return app.httpRequest()
      .post('/page/add')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .set('x-csrf-token','dLqhmgd-cjYMPYgdf01ih8Rv')
      .expect(200) // 期望返回 status 200
      .expect({name: 'john'}); // 期望 body 是 1
    });


});