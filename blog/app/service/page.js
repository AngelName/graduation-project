'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async get({current=1,pageSize=10,...searchKey}) {
    let limit = pageSize*1;
    let offset = (current-1)*pageSize;
    console.log(searchKey)
    let body = {}
    let total = await this.app.mysql.queryOne('select count(*) as total from  blog_page where content like ? or title like ?', [ '%'+searchKey.content+"%",'%'+searchKey.title+"%"]);
    let data =  await this.app.mysql.query('select * from  blog_page where content like ? or title like ? limit ?,?', [ '%'+searchKey.content+"%",'%'+searchKey.title+"%",offset,limit]);
    // await this.app.mysql.select(``,{
    //   where:{...searchKey},
    //   limit:limit,
    //   offset:offset,
    // });

    body.total = total.total;
    body.data = data;
    return body;
  }
  

  async add({...obj}) {
    console.log(obj)
    let result = await this.app.mysql.insert(`blog_page`,{...obj});
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async update({...obj}) {
    let {id,...row} = obj;
    let option = {
      where:{
        id:id
      }
    }
    let result = await this.app.mysql.update(`blog_page`,{...row},option);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async delete(id) {
    console.log(id)
    let {app,ctx} = this;
    try{
    await app.mysql.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      await conn.delete('blog_page_tags', {
        page_id: id
      });
      await conn.delete('blog_page', {
        id: id
      });
      return true;
    }, ctx);
    }catch{
    return false;
    }
  }
}

module.exports = HomeService;