import React from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';



const columns = [ {
  title: '评论ip',
  dataIndex: 'ip',
  key: 'ip',
}, {
  title: '评论内容',
  dataIndex: 'content',
  key: 'content',
  render: text => <a href="javascript:;">{text}</a>,
},
{
  title: '评论创建时间',
  dataIndex: 'create_time',
  key: 'create_time',
},
{
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
const data = [
  {
    ip:"127.0.0.1",
    content:"127.0.0.1",
    create_time:"2018",
  },{
    ip:"127.0.0.1",
    content:"127.0.0.1",
    create_time:"2018",
  },{
    ip:"127.0.0.1",
    content:"127.0.0.1",
    create_time:"2018",
  },{
    ip:"127.0.0.1",
    content:"127.0.0.1",
    create_time:"2018",
  }
]

@connect(({ page }) => ({
  page
}))
class Manage  extends React.Component {
  componentDidMount() {
    console.log(this.props.page)
    const { dispatch } = this.props;
    // dispatch({
    //     type: 'page/fetchList',
    //     payload:{
    //       current: 1,
    //       pageSize:10
    //     }
    // })
}

  getList = (page,pageSize)=>{
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'page/fetchList',
    //   payload:{
    //     current: page,
    //     pageSize:pageSize
    //   }
      
  // })
  }
  delete
  render(){
    let {pagelist={}} = this.props.page;
  let pagination = {pageSize:10, onChange:this.getList, total:pagelist.total}
  return (
    <Table columns={columns} dataSource={data}  pagination={pagination}/>
  )
  }
}

export default Manage
