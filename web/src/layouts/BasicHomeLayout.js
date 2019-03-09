import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Link from 'umi/link';
import { Input, Card, Pagination } from 'antd';
import PageCard from '@/components/PageCard'
const Search = Input.Search;

import styles from './BasicHomeLayout.less';

class Home extends Component {
    render() {
        return (

            <div className={styles.bg}>
                <Row>
                    <Col span={16} offset={4} style={{ height: "100% " }}>
                        <article className={styles.page}>
                            <header>
                                <div className={styles.title}> bexr blog</div>
                                <nav className={styles.navigation}>
                                    <Link to="/home">文章 </Link>
                                    <Link to="/about">关于</Link>
                                    <Link to="/callme">和联系我</Link>

                                </nav>
                                <Search style={{ width: 200 }}></Search>
                            </header>

                            <div className={styles.content}>
                                <article className={styles.sidebar}>
                                    <section>
                                        <div>文章分类</div>
                                        <section>
                                            <Link to="/home">文章 </Link>
                                            <Link to="/about">关于</Link>
                                            <Link to="/callme">和联系我</Link>
                                        </section>
                                    </section>
                                    <section>
                                        <div>文章</div>
                                        <section>
                                            <Link to="/home">文章 </Link>
                                            <Link to="/about">关于</Link>
                                            <Link to="/callme">和联系我</Link>
                                        </section>
                                    </section>
                                    <section>关于博主</section>
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