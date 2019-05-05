import React from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';
import request from '@/utils/request';
import {Link} from 'react-router-dom'



@connect(({ page }) => ({
  page
}))
class Manage  extends React.Component {
  constructor(props){
    super(props)
    this.state={
      current:1,
    }
  }
  componentDidMount() {
    console.log(this.props.page)
    const { dispatch } = this.props;
    dispatch({
        type: 'page/fetchList',
        payload:{
          current: 1,
          pageSize:10
        }
    })

}

  getList = (page,pageSize)=>{
    const { dispatch } = this.props;
    this.setState({
      current:page
    })
    dispatch({
      type: 'page/fetchList',
      payload:{
        current: page,
        pageSize:pageSize
      }
      
  })
  }
  handleDelPage=(item)=>{
    console.log(item)
    request("/page/delete/"+item.id,{
      method:"GET",
    }).then(()=>{
      this.getList(1,10)
    })
  }
  goShow=(item)=>{

  }
  render(){
    const columns = [ {
      title: '文章id',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '浏览次数',
      dataIndex: 'eye',
      key: 'eye',
    },{
      title: '点赞',
      key: 'like',
      dataIndex: 'like',
    }, 
    {
      title: '评论',
      key: 'message',
      dataIndex: 'message',
    },{
      title: '创建时间',
      key: 'creat_time',
      dataIndex: 'creat_time',
    },{
      title: '更新时间',
      key: 'update_time',
      dataIndex: 'update_time',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleDelPage.bind(this,record)}>删除</a>
          <Divider type="vertical" />
         <Link to={{
                    pathname: `/manage/page/add`,
                    state: { record }
                }} >查看</Link>
        </span>
      ),
    }];
    
    let {pagelist={}} = this.props.page;
  let pagination = {pageSize:10, onChange:this.getList, total:pagelist.total}
  return (
    <Table columns={columns} dataSource={pagelist.data}  pagination={pagination}/>
  )
  }
}

export default Manage
