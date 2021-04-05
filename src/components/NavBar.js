import { Menu } from 'antd';
import React from 'react';
import { Row, Col } from 'antd';
import {
  SettingOutlined,
  CodeSandboxOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  ProjectOutlined,
  ReadOutlined
} from '@ant-design/icons';

function NavBar(props) {
  return (
    <Row>
      <Col span={1}></Col>
      <Col span={22}>
        <Menu style={{'backgroundColor':'seagreen', 'color': 'white'}} mode='horizontal' defaultSelectedKeys={['2']} >
          <Menu.Item key={'1'} style={{'paddingLeft':10, 'paddingRight':10}}><SettingOutlined style={{'marginRight':4}}/><span>Hệ thống</span> </Menu.Item>
          <Menu.Item key={'2'} style={{'paddingLeft':10, 'paddingRight':10}}><CodeSandboxOutlined style={{'marginRight':4}}/><span>Sản phẩm</span></Menu.Item>
          <Menu.Item key={'3'} style={{'paddingLeft':10, 'paddingRight':10}}><ShoppingCartOutlined style={{'marginRight':4}}/><span>Bán hàng</span></Menu.Item>
          <Menu.Item key={'4'} style={{'paddingLeft':10, 'paddingRight':10}}><AccountBookOutlined style={{'marginRight':4}}/><span>Sổ quỹ</span> </Menu.Item>
          <Menu.Item key={'5'} style={{'paddingLeft':10, 'paddingRight':10}}><CustomerServiceOutlined style={{'marginRight':4}}/><span>CRM</span></Menu.Item>
          <Menu.Item key={'6'} style={{'paddingLeft':10, 'paddingRight':10}}><TeamOutlined style={{'marginRight':4}}/><span>Nhân sự</span></Menu.Item>
          <Menu.Item key={'7'} style={{'paddingLeft':10, 'paddingRight':10}}><ProjectOutlined style={{'marginRight':4}}/><span>Dự án</span></Menu.Item>
          <Menu.Item key={'8'} style={{'paddingLeft':10, 'paddingRight':10}}><ReadOutlined style={{'marginRight':4}}/><span>Giáo dục và đào tạo</span></Menu.Item>
        </Menu>
      </Col>
      <Col span={1}></Col>
    </Row>
  );
}

export default NavBar;
