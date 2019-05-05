'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async get() {
    const results = await this.app.mysql.select('blog_tags');
    return results;
  }
  async getByPage(params) {
   console.log(params)
    const data = await this.app.mysql.query(` SELECT name from blog_page_tags JOIN blog_tags ON blog_tags.id = blog_page_tags.tags_id 
    where page_id=?`, [params.id]);
   return data
  }
  
  async add({...obj}) {
    let result = await this.app.mysql.insert(`blog_tags`,{...obj});
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
}

module.exports = HomeService;