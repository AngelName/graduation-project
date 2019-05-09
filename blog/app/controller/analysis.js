'use strict';

const Controller = require('egg').Controller;
const r = require('../util/r')
class HomeController extends Controller {
  async get(){
    const {mysql} = this.app;
    const data = await mysql.query("SELECT count(id) as page ,sum(eye) as eye,sum(message) as comment,sum(blog_page.`like`) as `like` FROM blog_page ") 
    const thendy = await mysql.query("select count(*) as x,date(update_time) as y from blog_page where datediff(now(),update_time)<=6  group by day(update_time)")
    const today = await mysql.query("select count(*) as x,date(update_time) as y  from blog_page where to_days(update_time) = to_days(now()) GROUP BY HOUR(update_time);")
    r.data={total:data[0]}
    r.data.thendy = thendy
    r.data.today = today
    this.ctx.body = r;
  }
} 

// data = {
//   total:number,//总数
//   current:number,
//   pageSize:number,
//   data:[]//数据
// }

module.exports = HomeController;