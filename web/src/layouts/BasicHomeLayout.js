import React, { Component } from 'react';
import { Row, Col, Tag } from 'antd';
import Link from 'umi/link';
import { Input, Card, Pagination } from 'antd';
import PageCard from '@/components/PageCard'
const Search = Input.Search;
import request from '@/utils/request';
import { connect } from 'dva';

import styles from './BasicHomeLayout.less';

const colorSet = ["red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple",]
const { CheckableTag } = Tag;
@connect(({ page }) => ({
    page
}))
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            tops: [],
        }
    }
    componentDidMount() {
        request("/tags/get").then(res => {
            this.setState({ tags: res.data })
        })
        request("/page/getTop").then(res => {
            this.setState({ tops: res.data })
        })

    }
    handleTageClick = (index, currentTag) => {
        let { tags } = this.state;
        tags.map((_, i) => {
            if (i === index) _.checked = true;
            else _.checked = false;
        })
        this.setState(tags)
        const { dispatch } = this.props;
        dispatch({
            type: "page/changeStorage",
            payload: {
                currentTag
            }
        })
    }
    handleChange = (searchKey) => {
        const { dispatch } = this.props;
        dispatch({
            type: "page/changeStorage",
            payload: {
                searchKey
            }
        })
    }
    render() {
        console.log(this.props, 'tets')
        const { tags, tops } = this.state;
        const { location } = this.props;
        let isDetail = true;
        if (location.pathname.indexOf("detail") !== -1) {
            isDetail = false;
        }
        return (

            <div className={styles.bg}>
                <Row>
                    <Col span={16} offset={4} style={{ height: "100% " }}>
                        <article className={styles.page}>
                            <header>
                                <div className={styles.title}> bexr blog</div>
                                <nav className={styles.navigation}>
                                    <Link to="/">文章 </Link>
                                    <Link to="/about">关于</Link>
                                    <Link to="/callme">和联系我</Link>
                                </nav>
                                <Search style={{ width: 200 }} onSearch={this.handleChange}></Search>
                            </header>

                            <div className={styles.content}>
                                <article className={styles.sidebar}>
                                    {isDetail && <section>
                                        <div>文章分类</div>
                                        <section style={{ minHeight: "60px" }}>
                                            {tags.map((item, index) => {
                                                return <CheckableTag key={item.id}
                                                    checked={item.checked}
                                                    color={colorSet[item.id % tags.length]} onChange={this.handleTageClick.bind(this, index, item)}>
                                                    {item.name}
                                                </CheckableTag>
                                            })}
                                            <CheckableTag onChange={this.handleTageClick.bind(this, -1, {})}>全部
                                                </CheckableTag>
                                        </section>
                                    </section>}
                                    <section className={styles.recently}>
                                        <div>最近文章</div>
                                        <section >
                                            {tops.map(item => {
                                                return <Link to={{
                                                    pathname: `/detail/${item.id}`,
                                                    state: { data: item }
                                                }} onClick={i => console.log(i)}>{item.title}</Link>
                                            })}
                                        </section>
                                    </section>
                                  
                                </article>
                                <article className={styles.contentPage}>

                                    {this.props.children}
                                </article>
                            </div>
                        </article>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Home;