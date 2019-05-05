'use strict';

const Controller = require('egg').Controller;
const r = require('../util/r')
class HomeController extends Controller {
  async get() {
    console.log(this.ctx)

    let { ctx,service } = this;
    let { current=1,pageSize=10,...searchKey } = ctx.query;
    console.log(searchKey)

    this.ctx.body = await this.service.page.get({current,pageSize,...searchKey})
  }
  async delete(){
    let { ctx,service } = this;
    let { id } = ctx.params;
    this.ctx.body = await this.service.page.delete(id);
  }
  async getTop(){
    const results = await this.app.mysql.select('blog_page',{ // 搜索 post 表
      orders: [['update_time','desc']], // 排序方式
      limit: 5, // 返回数据量
      offset: 0, // 数据偏移量
    });
    r.data = results
    this.ctx.body = r;
  }
 
  async update(){
    let params = this.ctx.request.body;
    if(!params.id){
      throw Error("参数必需有id")
    }
    this.ctx.body = await this.service.page.update({...params})
  }
  async add(){
    let params = this.ctx.request.body;
    console.log(this.ctx.request.body)
    
    this.ctx.body = await this.service.page.add({...params})
  }
  async addPraise(){
    let params = this.ctx.request.body;
    this.ctx.body = await this.service.page.addPraise({...params})
  }
  async addEye(){
    let params = this.ctx.request.body;
    this.ctx.body = await this.service.page.addEye({...params})
  }
}

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = HomeController;