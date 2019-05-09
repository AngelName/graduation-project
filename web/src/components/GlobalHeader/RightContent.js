import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import cookie from 'cookie';
export default class GlobalHeaderRight extends PureComponent {
 

 

 

 
  logout=()=>{

  }
  render() {
    const {
      theme,
    } = this.props;
 
 
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
   let currentUser = cookie.parse(document.cookie)
    return (
      <div className={className}>
        {currentUser.user_name ? (
            <span className={`${styles.action} ${styles.account}`}>
              <span style={{margin:'0 20px'}}>{currentUser.user_name}</span>
              <span onClick={this.logout}>退出登陆</span>
            </span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    );
  }
}
