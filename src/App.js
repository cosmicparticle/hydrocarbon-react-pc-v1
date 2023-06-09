import React, { Component } from 'react';
import { ConfigProvider,Spin } from 'antd';
import dayjs from "dayjs";
import zhCN from 'antd/locale/zh_CN';
dayjs.locale('zh-cn');

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN} theme={{
        token: {
          colorPrimary: '#08979c',
        },
      }}>
        {this.props.children}
      </ConfigProvider>
    );
  }
}

export default App;
