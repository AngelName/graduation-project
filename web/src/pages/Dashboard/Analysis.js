import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts'
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import Trend from '@/components/Trend';

import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import request from '@/utils/request';
import moment  from 'moment';

const SalesCard = React.lazy(() => import('./SalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));
const OfflineData = React.lazy(() => import('./OfflineData'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    data: {}
  };

  componentDidMount() {
    const { dispatch } = this.props;
    console.log(this.state.rangePickerValue,'ddd')
    request("/analysis/get", { method: 'GET' }).then(res => {
      console.log(res)
      res.data.today.map(item=>{
        item.x=moment(item.x).format('YYYY-MM-DD')
      })
      res.data.thendy.map(item=>{
        item.x=moment(item.x).format('YYYY-MM-DD')
      })
      this.setState({ data: res.data,salesData:res.data.today })

    }).then(e=>{
      request("/analysis/getTop7",{method:'GET'}).then(res =>{
        res.data.map(item=>{
          item.total = item.eye;
        })
        this.setState({rankingListData:res.data})
      })
    })

    
  }

  componentWillUnmount() {
  
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    if(type==='week'){
      this.setState({
        salesData:this.state.data.thendy
      });
    }else{
        this.setState({
          salesData:this.state.data.today
        });
    }

  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    const {total={}} = this.state.data;
    console.log(this.state.data.total)
    return (
      <GridContent styles={{ padding: '20px' }}>
        <Suspense fallback={<PageLoading />}>
          <Row gutter={24}>
            <Col  {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                title={"总文章数"}
                loading={loading}
                total={total.page + '个'}
                contentHeight={46}
              >
                <Trend flag="down">
                日同比
                  <span className={styles.trendText}>0.1%</span>
                </Trend>
              </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={"访问量"}
                total={total.eye+'次'}
                contentHeight={46}
              >
                <Trend flag="down">
             
                  日同比
                  <span className={styles.trendText}>11%</span>
                </Trend>
              </ChartCard>
            </Col>

            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={"点赞量"}
                total={total.like+"个"}
                contentHeight={46}
              >
                <Trend flag="down">
                  日同比
                  
                  <span className={styles.trendText}>1%</span>
                </Trend>
              </ChartCard>
            </Col>
            <Col {...topColResponsiveProps}>
              <ChartCard
                bordered={false}
                loading={loading}
                title={"评论数"}
                total={total.comment+"个"}
                contentHeight={46}
              >
                <Trend flag="down">
                
                  日同比
                  <span className={styles.trendText}>0.1%</span>
                </Trend>
              </ChartCard>
            </Col>

          </Row>
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={this.state.salesData}
            rankingListData={this.state.rankingListData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          />
        </Suspense>
      </GridContent>
    );
  }
}

export default Analysis;
