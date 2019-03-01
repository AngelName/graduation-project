'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/page/get', controller.page.get);
  router.get('/page/delete/:id', controller.page.delete);
  router.post('/page/update', controller.page.update);
  router.post('/page/add', controller.page.add);

};
