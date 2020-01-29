'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {


  async upArticle() {
    const { ctx } = this;
    ctx.body = '后端接口';
  }

  async checkLogin() {
    const { userName, passWord } = this.ctx.request.body;


    const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName + "' AND passWord = '" + passWord + "'";

    const res = await this.app.mysql.query(sql);

    if (res.length) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: '登录成功', openId, status: true };
    } else {
      this.ctx.body = { data: '登录失败', status: false };
    }
  }


  // 获取类型
  async getTypeInfo() {
    const data = await this.app.mysql.select('type');
    this.ctx.body = { list: data };
  }

  // 添加文章
  async addAtrticle() {
    const data = this.ctx.request.body;

    const result = await this.app.mysql.insert('article', data);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  // 添加文章后修改文章
  async upAtrticle() {
    const data = this.ctx.request.body;

    const result = await this.app.mysql.update('article', data);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    };
  }

  // 文章列表
  async articleList() {
    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    'type.typeName as typeName ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { list: resList };
  }


  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.content as content,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { list: result };
  }
}

module.exports = HomeController;
