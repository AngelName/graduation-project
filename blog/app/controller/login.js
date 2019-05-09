'use strict';

const Controller = require('egg').Controller;
const r = require('../util/r')
class HomeController extends Controller {
  async login(){
    const {ctx,app} = this;
    const param = ctx.request.body
    const result = await app.mysql.get('blog_user',param)
    console.log(result)
    if(result){
      ctx.session.user = result;
      ctx.cookies.set('user_name',result.user_name,{
        httpOnly:false
      })
      ctx.cookies.set('user_id',result.id,{
        httpOnly:false
      })
      ctx.body={
        data:result,
        msg:"登陆成功"}

    }else{
      ctx.body={
        data:null,
        msg:'登陆失败'
      };
    }
  }
  async register(){
    const {ctx,app} = this;
    const param = ctx.request.body
    console.log(param,ctx.session.captcha)
    const hasUser = await app.mysql.get('blog_user',{user_name:param.user_name})
    
    if(param.captcha.toLowerCase()===ctx.session.captcha.toLowerCase()){
      if(hasUser){
        ctx.body={
          data:null,
          msg:'用户名重复'
        }
      }else{
        const result = await app.mysql.insert('blog_user',{'user_name':param.user_name,'password':param.password})
        const insertSuccess = result.affectedRows === 1;
        if(insertSuccess){
          ctx.body={
            data:"ok",
            msg:'注册成功'
          };
        }
      }
    }else{
      ctx.body={
        data:null,
        msg:'验证码错误'
      };
    }
   
  }
  async verify(){

    const ctx = this.ctx;
    let captcha = await this.app.captcha.generate();
    ctx.session.captcha = captcha.text;
    ctx.response.type = 'image/svg+xml';  
    ctx.body = captcha.data;

  }
  
}

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = HomeController;