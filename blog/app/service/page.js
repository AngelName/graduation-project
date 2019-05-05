'use strict';

const Service = require('egg').Service;

class HomeService extends Service {

  async get({ current = 1, pageSize = 10, ...searchKey }) {
    let limit = pageSize * 1;
    let offset = (current - 1) * pageSize;
    console.log(searchKey)
    let { content = "", title = "", tag = "" } = searchKey
    let body = {}
    let data, total;

    if (tag !== "") {
      data = await this.app.mysql.query(`select * from blog_page_tags   
    join blog_page on blog_page.id=blog_page_tags.page_id 
    join blog_tags on blog_tags.id=blog_page_tags.tags_id where ( content like ? or title like ? ) and name like ? order by eye desc,update_time desc limit ?,? `, ['%' + content + "%", '%' + title + "%", '%' + tag + "%", offset, limit]);

      total = await this.app.mysql.query(`select * from blog_page_tags   
    join blog_page on blog_page.id=blog_page_tags.page_id 
    join blog_tags on blog_tags.id=blog_page_tags.tags_id where ( content like ? or title like ? ) and name like ? order by eye desc,update_time desc`, ['%' + content + "%", '%' + title + "%", '%' + tag + "%"]);
    } else {
      data = await this.app.mysql.query(`select * from blog_page    
  where ( content like ? or title like ? )order by eye desc,update_time desc limit ?,? `, ['%' + content + "%", '%' + title + "%", offset, limit]);

      total = await this.app.mysql.query(`select * from blog_page    
  where ( content like ? or title like ? )  order by eye desc,update_time desc`, ['%' + content + "%", '%' + title + "%"]);
    }



    body.total = total.length;
    body.data = data;
    return body;
  }

  async addPraise({ ...obj }) {
    await this.app.mysql.update("blog_page", { like: obj.like + 1 }, {
      where: {
        id: obj.id
      }
    })
    return 'success'
  }
  async addEye({ ...obj }) {
console.log(obj)
    await this.app.mysql.update("blog_page", { eye: obj.eye + 1 }, {
      where: {
        id: obj.id
      }
    })
    return 'success'
  }
  async add({ ...obj }) {
    console.log(obj)
if(obj.page.id){
  let page = await this.app.mysql.get(`blog_page`,{...obj.page});

   await this.app.mysql.update(`blog_page`,{...obj.page},{where:{id:obj.page.id}});
   await this.app.mysql.delete(`blog_page_tags`,{page_id:obj.page.id});
   for (const index in obj.tags) {
    try{
      await this.app.mysql.insert(`blog_tags`,{name:obj.tags[index]});
      console.log("未存在，已插入")
    }catch(e){
      console.log("存在")
    }
    let tag = await this.app.mysql.get(`blog_tags`,{name:obj.tags[index]});
    console.log(tag,page)
    await this.app.mysql.insert(`blog_page_tags`,{page_id:obj.page.id,tags_id:tag.id});
  
  }
}else{
  let result = await this.app.mysql.insert(`blog_page`,{...obj.page});
  let page = await this.app.mysql.get(`blog_page`,{...obj.page});
  for (const index in obj.tags) {
    try{
      await this.app.mysql.insert(`blog_tags`,{name:obj.tags[index]});
      console.log("未存在，已插入")
    }catch(e){
      console.log("存在")
    }
    let tag = await this.app.mysql.get(`blog_tags`,{name:obj.tags[index]});
    console.log(tag,page)
    await this.app.mysql.insert(`blog_page_tags`,{page_id:page.id,tags_id:tag.id});
  
  }
}
    

    return "success"
  }

  async update({ ...obj }) {
    let { id, ...row } = obj;
    let option = {
      where: {
        id: id
      }
    }
    let result = await this.app.mysql.update(`blog_page`, { ...row }, option);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async delete(id) {
    console.log(id)
    let { app, ctx } = this;
    try {
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
    } catch{
      return false;
    }
  }
}

module.exports = HomeService;