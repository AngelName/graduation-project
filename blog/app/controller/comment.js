'use strict';

const Controller = require('egg').Controller;
const r = require('../util/r')
class HomeController extends Controller {
  async get() {
    let { current=1,pageSize=10 } = this.ctx.query;
console.log(this.ctx.query)
    r.data=await this.service.comment.get({...this.ctx.query})
    this.ctx.body = r;

  }
  async getByPage() {
    const { ctx } = this;
    const page_id = ctx.params.id;

    r.data=await this.service.comment.getByPage(page_id)

    this.ctx.body = r;

  }
  async delete(){
    let { ctx,service } = this;
    let { id } = ctx.params;
    this.app.mysql.delete('blog_comment',{id:id})
    this.ctx.body = "删除成功"

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
    this.ctx.body = await this.service.comment.add({...params})
  }
}

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = HomeController;