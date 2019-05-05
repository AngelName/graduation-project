import React, { Component, Fragment } from 'react';
import { Row, Col,Spin } from 'antd';
import Link from 'umi/link';
import { Input, Card, Pagination } from 'antd';
import PageCard from './PageCard'
const Search = Input.Search;
import { connect } from 'dva';
import request from '@/utils/request';
import { stringify } from 'qs';

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
      this.state={
        spinning:true,
      }
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: 'page/fetchList',
            payload:{
              current: 1,
              pageSize:5,
            
            }
        })
    }
    componentDidUpdate(nexrProp){
        console.log(this.props.page,'page 也买呢')

      let {pagelist={},currentTag={},searchKey=""} = this.props.page;
      let {page}= nexrProp;
      if(pagelist!=page.pagelist){
        this.setState({spinning:true},()=>{
            setTimeout(()=>{
                this.setState({spinning:false})
            },300)
        })    
      }
      if(this.props.page.currentTag!==nexrProp.page.currentTag
        ||this.props.page.searchKey!==nexrProp.page.searchKey
        ){
        const { dispatch } = this.props;
            this.getList({})
 
             
    }
     
    }
    getList = ({page=1,pageSize=5})=>{
      const { dispatch } = this.props;
      let {pagelist={},currentTag={},searchKey=""} = this.props.page;

      dispatch({
        type: 'page/fetchList',
        payload:{
          current: page,
          pageSize:5,
          tag:currentTag.name,
          content:searchKey,
          title:searchKey,
        }
    })
    }
    render() {
      let {pagelist={}} = this.props.page;
        
      return (
            <Fragment>
             <Spin tip="Loading..." spinning={this.state.spinning}>
             <div >
                    {pagelist.data && pagelist.data.map((i, key) => {
                        return <PageCard 
                            key={key}
                            data={i}
                        ></PageCard>
                    })}
                    <Pagination pageSize={5} style={{ textAlign: "center", marginTop: "20px" }} onChange={this.getList} total={pagelist.total} />
                </div>
            </Spin>
               
            </Fragment>
        )
    }
}
export default Home;