import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  DesktopOutlined,
  NotificationOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  CodeSandboxOutlined,
  HddOutlined,
  ClusterOutlined,
  AuditOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons';

const {SubMenu} = Menu;
function LeftMenu(props) {
  return (
    <div>
      <Menu
              mode="inline"
              defaultSelectedKeys={['5']}
              defaultOpenKeys={['sub2']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Thông tin người dùng">
                <Menu.Item key="1"><a href="/"><h2>Jack</h2></a></Menu.Item>
                <Menu.Item key="2" icon={<HomeOutlined />}>Thông tin cửa hàng</Menu.Item>
                <Menu.Item key="3" icon={<KeyOutlined />}>Thay đổi mật khẩu</Menu.Item>
                <Menu.Item key="4" icon={<LogoutOutlined/>}>Thoát tài khoản</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<DesktopOutlined />} title="Chức năng chính">
                <Menu.Item key="5" icon={<CodeSandboxOutlined />}>Sản phẩm</Menu.Item>
                <Menu.Item key="6" icon={<HddOutlined />}>Phân loại sản phẩm</Menu.Item>
                <Menu.Item key="7" icon={<ClusterOutlined />}>Nhóm sản phẩm</Menu.Item>
                <Menu.Item key="8" icon={<AuditOutlined />}>Đơn vị</Menu.Item>
                <Menu.Item key="9" icon={<MoneyCollectOutlined />}>Nhóm sản phẩm</Menu.Item>
              </SubMenu>
            </Menu>
    </div>
  );
}

export default LeftMenu;
