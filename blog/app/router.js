'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/page/get', controller.page.get);
  router.get('/page/getTop', controller.page.getTop);


  router.get('/page/delete/:id', controller.page.delete);
  router.post('/page/update', controller.page.update);
  router.post('/page/add', controller.page.add);

  router.post('/page/praise/add', controller.page.addPraise);
  router.post('/page/eye/add', controller.page.addEye);
  router.post('/comment/add', controller.comment.add);
  router.get('/comment/getall', controller.comment.get);
  router.get('/comment/get/:id', controller.comment.getByPage);
  router.get('/comment/delete/:id',controller.comment.delete)
  router.get('/tags/get', controller.tags.get);
  router.get('/verify/:id', controller.login.verify);
  router.post('/login', controller.login.login);
  router.post('/register', controller.login.register);
  router.get('/analysis/get',controller.analysis.get)
  router.post('/tags/getByPage', controller.tags.getByPage);

  // router.get('/tags/add', controller.tags.add);

  router.get('/tags/delete/:id', controller.tags.delete);

};
