import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'dva/router'

import style from './index.less';
import request from '@/utils/request';
export default class PageCard extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            like: this.props.data.like,
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    componentDidUpdate(){
    }
    addEye=()=>{
        let { data } = this.props;
        request("/page/eye/add",{
            method:"POST",
            body:{
             ...data
            }
          }) 
    }
    handleButtonClick = (type,item) => {
        let state = this.state;
        let { data } = this.props;
        data[type] = state[type];
        state[type]++;
        console.log(data);
        this.setState(state)
        request("/page/praise/add",{
            method:"POST",
            body:{
             ...data
            }
          })
    }
    render() {
        let { data } = this.props;
        let { id, title, content, message, eye, tag } = data;
        let { like } = this.state;
        return (
            <Card className={style.pageCard}
                // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                title={<Link to={{
                    pathname: `/detail/${id}`,
                    state: { data }
                }} onClick={this.addEye}>{title}</Link>} bordered={true}>
                <p style={{ overflowWrap: "break-word" }}>{content}</p>
                <Button type="primary" shape="circle" icon="like" onClick={e => this.handleButtonClick("like")} ghost={true} />{like}
                <Button type="primary" shape="circle" icon="message" onClick={e => this.handleButtonClick("message")} ghost={true} />{message}
                <Button type="primary" shape="circle" icon="eye"  ghost={true} />{eye}
                {/* <Button type="primary" shape="circle" icon="tag" onClick={e => this.handleButtonClick("tag")} ghost={true} />{tag} */}

            </Card>
        )
    }
}
PageCard.defaultProps = {
    title: "demo",
    content: "content",
    like: 20,
    message: 3,
    eye: 100
}