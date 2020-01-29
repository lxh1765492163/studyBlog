'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const result = await app.mysql.get('blog_content', {});
    ctx.body = result;
  }

  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
              'article.title as title,' +
              'article.introduce as introduce,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
              'article.content as content ,' +
              'article.view_count as view_count ,' +
              '.type.typeName as typeName ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }

  // 获取文章详情
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
        'article.title as title,' +
        'article.introduce as introduce,' +
        'article.content as content,' +
        "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
        'article.view_count as view_count ,' +
        'type.typeName as typeName ,' +
        'type.id as typeId ' +
        'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
        'WHERE article.id=' + id;


    const result = await this.app.mysql.query(sql);


    this.ctx.body = { data: result };

  }


  // 获取博客 head type类型
  async getTypeInfo() {

    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };

  }

  // 获取head type相应id下 对应的列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = HomeController;
