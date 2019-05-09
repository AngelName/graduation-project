import React from 'react'
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';
import request from '@/utils/request';
import qs from 'qs';
import { Link } from 'react-router-dom'

const data = [
  {
    ip: "127.0.0.1",
    content: "127.0.0.1",
    create_time: "2018",
  }, {
    ip: "127.0.0.1",
    content: "127.0.0.1",
    create_time: "2018",
  }, {
    ip: "127.0.0.1",
    content: "127.0.0.1",
    create_time: "2018",
  }, {
    ip: "127.0.0.1",
    content: "127.0.0.1",
    create_time: "2018",
  }
]

@connect(({ page }) => ({
  page
}))
class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    console.log(this.props.page)
    this.getList()
  }

  getList = (page, pageSize) => {
    const { dispatch } = this.props;
    request("/comment/getall?" + qs.stringify({ current: 1, pageSize: 10 }), {
      method: "GET",
    }).then(res => {
      console.log(res)
      this.setState({ data: res.data })
    })
  }
  handleDelete = (item)=>{

    request(`/comment/delete/${item.id}`).then(e=>{
      console.log(12312312)
      this.getList()
    })
  }
  render() {

    const columns = [{
      title: '评论文章',
      dataIndex: 'title',
      key: 'title',
      render: (value, item) => {
        return <Link to={{
          pathname: `/detail/${item.id}`,
          state: { data: item }
        }} >{value}</Link>
      }
    }, {
      title: '评论内容',
      dataIndex: 'page_comment',
      key: 'page_comment',
    },
    {
      title: '评论创建时间',
      dataIndex: 'create_data',
      key: 'create_data',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleDelete.bind(this, record)}>删除 {record.name}</a>
        </span>
      ),
    }];
    let { pagelist = {} } = this.props.page;
    let pagination = { pageSize: 10, onChange: this.getList, total: pagelist.total }
    return (
      <Table columns={columns} dataSource={this.state.data} pagination={pagination} />
    )
  }
}

export default Manage
