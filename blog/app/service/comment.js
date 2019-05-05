'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async get() {
    const results = await this.app.mysql.select('blog_comment');
    return results;
  }
  async getByPage(page_id){
    const results = await this.app.mysql.select('blog_comment',{
      where: { page_id: page_id},
      orders: [['create_data','desc']]
    });
    return results;
  }

  async add({...obj}) {
    let result = await this.app.mysql.insert(`blog_comment`,{...obj});
    let comments = await this.getByPage(obj.page_id)
    let length = comments.length;
    await this.app.mysql.update("blog_page",{message:length},{ where: {
      id: obj.page_id
    }})
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
}

module.exports = HomeService;