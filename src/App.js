import React from 'react';
import { Layout } from 'antd';
import NavBar from './components/NavBar';
import LeftMenu from './components/LeftMenu';
import Content from './components/Content';
import SiderTrigger from './components/options/SiderTrigger';

document.title='Quản lý sản phẩm';
class App extends React.Component {
  // products = JSON.parse(localStorage.getItem('product'));
  state = {
    collapsed: false,
    products: JSON.parse(localStorage.getItem('product'))
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  handleSave = sp => {
    console.log(sp);
    this.setState({
      products: sp
    });
  };
  render() {
    return (
      <div className="App">
        <Layout>
          <Layout.Header style={{ 'backgroundColor': 'seagreen', 'height': 65 }}>
            <NavBar />
          </Layout.Header>
        </Layout>
        <Layout>
          <Layout.Sider style={{backgroundColor:'white'}} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} trigger={<SiderTrigger isCollapsed={this.state.collapsed}/>}>
            <LeftMenu />
          </Layout.Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content products={this.state.products} saveProducts={this.handleSave}/>
          </Layout>
        </Layout>
        <Layout.Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Layout.Footer>
      </div>
    );
  }
}

export default App;
