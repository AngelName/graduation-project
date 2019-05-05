'use strict';
const r = require('../util/r');

const Controller = require('egg').Controller;

class Index extends Controller {
  async get() {
    let { ctx,service } = this;
    let { current=1,pageSize=10,...searchKey } = ctx.query;
    console.log(searchKey)
    r.data = await this.service.tags.get({current,pageSize,...searchKey})
    this.ctx.body =r ; 
  }
  async getByPage() {
    let { ctx,service } = this;
    let params = this.ctx.request.body;

    r.data = await this.service.tags.getByPage(params)

    this.ctx.body =r ; 
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
    this.ctx.body = await this.service.page.update({...params})
  }
  async add(){
    let params = this.ctx.request.body;
    console.log(this.ctx.request.body)
    
    this.ctx.body = "success"
    // this.ctx.body = await this.service.page.add({...params})
  }
}

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = Index;