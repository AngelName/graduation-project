'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async get() {
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
 
  async update(){
    let params = this.ctx.request.body;
    if(!params.id){
      throw Error("参数必需有id")
    }
    console.log(params)
    this.ctx.body = await this.service.page.update({...params})
  }
  async add(){
    let params = this.ctx.request.body;
    console.log(params)
    this.ctx.body = await this.service.page.add({...params})
  }
}

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = HomeController;