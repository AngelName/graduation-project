import React from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';



const columns = [ {
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
      <a href="javascript:;">删除 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">查看</a>

    </span>
  ),
}];


@connect(({ page }) => ({
  page
}))
class Manage  extends React.Component {
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
    dispatch({
      type: 'page/fetchList',
      payload:{
        current: page,
        pageSize:pageSize
      }
      
  })
  }
  delete
  render(){
    let {pagelist={}} = this.props.page;
  let pagination = {pageSize:10, onChange:this.getList, total:pagelist.total}
  return (
    <Table columns={columns} dataSource={pagelist.data}  pagination={pagination}/>
  )
  }
}

export default Manage
