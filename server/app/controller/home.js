'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async about() {
    const { ctx } = this;
    ctx.body = '这是about页面';
  }
}

module.exports = HomeController;
