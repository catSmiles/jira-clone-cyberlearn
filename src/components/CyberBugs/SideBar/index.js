import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './styles.scss';
import { OPEN_FORM_CREATE_TASK } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import CreateTask from '~/components/Form/CreateTask';
const { Sider } = Layout;

function SideBar() {
    const dispatch = useDispatch();
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
                <Menu.Item
                    key="1"
                    icon={<PlusOutlined />}
                    onClick={() => {
                        dispatch({
                            type: OPEN_FORM_CREATE_TASK,
                            Component: <CreateTask />,
                            title: 'Create Task',
                        });
                    }}
                >
                    Create task
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SideBar;
