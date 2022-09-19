import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
const { Sider } = Layout;

function SideBar() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ minHeight: '100%' }}
            className="my-class"
        >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PlusOutlined />}>
                    Create issue
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideBar;
