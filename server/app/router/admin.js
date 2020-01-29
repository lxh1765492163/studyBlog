'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/admin/upArticle', controller.admin.home.upArticle);
  router.post('/admin/checkLogin', controller.admin.home.checkLogin);
  router.get('/admin/getTypeInfo', controller.admin.home.getTypeInfo);
  router.post('/admin/addAtrticle', controller.admin.home.addAtrticle);
  router.post('/admin/upAtrticle', controller.admin.home.upAtrticle);
  router.get('/admin/articleList', controller.admin.home.articleList);
  router.get('/admin/delArticle/:id', controller.admin.home.delArticle);
  router.get('/admin/getArticleById/:id', controller.admin.home.getArticleById);
};
