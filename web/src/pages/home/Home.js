import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import Link from 'umi/link';
import { Input, Card, Pagination } from 'antd';
import PageCard from '@/components/PageCard'
const Search = Input.Search;
import { connect } from 'dva';

const data = [{
    title: "demo",
    content: "contentcontentcontentcontentcontentcontentcontentcontentcontentcontentc",
    like: 20,
    message: 3,
    eye: 100
}, {
    title: "demo",
    content: "content",
    like: 20,
    message: 3,
    eye: 100
}, {
    title: "demo",
    content: "content",
    like: 20,
    message: 3,
    eye: 100
}, {
    title: "demo",
    content: "content",
    like: 20,
    message: 3,
    eye: 100
}]
@connect(({ page }) => ({
    page
}))
class Home extends Component {
    constructor(props){
      super(props);
    }

    componentDidMount() {
        console.log(this.props.page)
        const { dispatch } = this.props;
        dispatch({
            type: 'page/fetchList',
            payload:{
              current: 1,
              pageSize:5
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
    render() {
      let {pagelist={}} = this.props.page;
        
      return (
            <Fragment>
                <div style={{ height: "10vh" }}>
                    {pagelist.data && pagelist.data.map((i, key) => {
                        return <PageCard title={i.title} content={i.content}
                            like={i.like}
                            message={i.message}
                            eye={i.eye}
                            key={key}
                        ></PageCard>
                    })}
                    <Pagination pageSize={5} style={{ textAlign: "center", marginTop: "20px" }} onChange={this.getList} total={pagelist.total} />
                </div>
            </Fragment>
        )
    }
}
export default Home;