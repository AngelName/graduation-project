import React, { Component } from 'react';
import { Card, Button } from 'antd';
import style from './index.less';
export default class PageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            like: this.props.like,
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick = (type) => {
        let state = this.state;
        state[type]++;
        this.setState(state)
    }
    render() {
        let { title, content, message, eye, tag } = this.props;
        let { like } = this.state;
        return (
            <Card className={style.pageCard}
                // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                title={<a href={"/123"} onClick={i => console.log(i)}>{title}</a>} bordered={true}>
                <p style={{ overflowWrap: "break-word" }}>{content}</p>
                <Button type="primary" shape="circle" icon="like" onClick={e => this.handleButtonClick("like")} ghost={true} />{like}
                <Button type="primary" shape="circle" icon="message" onClick={e => this.handleButtonClick("message")} ghost={true} />{message}
                <Button type="primary" shape="circle" icon="eye" onClick={e => this.handleButtonClick("eye")} ghost={true} />{eye}
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