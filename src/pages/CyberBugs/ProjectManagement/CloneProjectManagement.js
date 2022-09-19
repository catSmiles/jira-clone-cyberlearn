/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Space, Table, Tag, Popconfirm, Avatar, Tooltip, Popover, AutoComplete, Button } from 'antd';
import { UserAddOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
// import parse from 'html-react-parser';
// import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import {
    ASSIGN_USER_PROJECT_SAGA,
    DELETE_PROJECT_SAGA,
    EDIT_PROJECT,
    GET_ALL_PROJECT_SAGA,
    GET_USER_SAGA,
    OPEN_FORM_EDIT_PROJECT,
    REMOVE_USER_FROM_PROJECT_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import FormEditProject from '~/components/Form/EditProject';
import { useState } from 'react';
import { useDebounce } from '~/hooks';

const onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
};

function ProjectManagement() {
    const [valueAutoComplete, setValueAutoComplete] = useState('');

    // start debounce search - custom
    const debounceValue = useDebounce(valueAutoComplete, 500);
    useEffect(() => {
        handleSearch(debounceValue);
    }, [debounceValue]);

    const handleSearch = (value) => {
        dispatch({
            type: GET_USER_SAGA,
            keyWord: value,
        });
    };
    // end debounce search - custom

    // ket noi voi reducer lay usersSearch
    const { usersSearch } = useSelector((state) => state.UserReducer);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            // width: '10%',
            sorter: (id1, id2) => {
                if (id1 > id2) return 1;
                return -1;
            },
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            // width: '25%',
            // sorter: {
            //   compare: (a, b) => a.chinese - b.chinese,
            //   multiple: 3,
            // },
            sorter: (item1, item2) => {
                const projectName1 = item1.projectName.toLowerCase().trim();
                const projectName2 = item2.projectName.toLowerCase().trim();
                if (projectName1 < projectName2) return -1;
                return 1;
            },
        },
        // {
        //     title: 'description',
        //     dataIndex: 'description',
        //     width: '50%',
        //     // sorter: {
        //     //   compare: (a, b) => a.math - b.math,
        //     //   multiple: 2,
        //     // },
        //     render: (text, record, index) => {
        //         const jsxText = parse(text);
        //         return <Fragment key={text}>{jsxText}</Fragment>;
        //     },
        // },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            // width: '30%',
            sorter: (item1, item2) => {
                if (item1.categoryName < item2.categoryName) return -1;
                return 1;
            },
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            // width: '20%',
            render: (text, record, index) => <Tag color="blue">{record.creator?.name}</Tag>,
            sorter: (item1, item2) => {
                const creator1 = item1.creator.name.toLowerCase().trim();
                const creator2 = item2.creator.name.toLowerCase().trim();
                if (creator1 < creator2) return -1;
                return 1;
            },
        },
        {
            title: 'Members',
            dataIndex: 'members',
            render: (text, record, index) => {
                return (
                    <div className="d-flex align-items-center justify-content-between">
                        {/* show list member */}

                        <Avatar.Group
                            maxCount={2}
                            maxPopoverTrigger="click"
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                        >
                            {record.members?.map((member) => (
                                <Tooltip key={member.userId} title={member.name} placement="top">
                                    <Avatar src={member.avatar} />
                                </Tooltip>
                            ))}
                        </Avatar.Group>

                        {/* Group action */}
                        <div className="d-flex">
                            {/* add member */}
                            <Popover
                                // content={<a onClick={hide}>Close</a>}
                                title="Add member"
                                // content={<AutoComplete placeholder="Search members..." style={{ width: 150 }} />}
                                content={() => (
                                    <AutoComplete
                                        placeholder="Search members..."
                                        style={{ width: 150 }}
                                        value={valueAutoComplete}
                                        // onSearch={(value) => {
                                        //     dispatch({
                                        //         type: GET_USER_SAGA,
                                        //         keyWord: value,
                                        //     });
                                        // }}
                                        onSearch={(value) => setValueAutoComplete(value)}
                                        onChange={(text) => {
                                            setValueAutoComplete(text);
                                        }}
                                        options={usersSearch.map((user) => {
                                            return { label: user.name, value: user.userId.toString() };
                                        })}
                                        onSelect={(value, option) => {
                                            // console.log('value: ', value);
                                            // console.log('option: ', option);
                                            // setValueAutoComplete(option.label);

                                            // goi api gui ve backend
                                            dispatch({
                                                type: ASSIGN_USER_PROJECT_SAGA,
                                                project: {
                                                    projectId: record.id,
                                                    userId: option.value,
                                                },
                                            });

                                            // clear field
                                            setValueAutoComplete('');
                                        }}
                                    />
                                )}
                                trigger="click"
                                // open={open}
                                // onOpenChange={handleOpenChange}
                                className="mr-2"
                            >
                                {/* <Button type="primary">Click me</Button> */}
                                <Avatar
                                    size="large"
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                >
                                    <UserAddOutlined style={{ fontSize: 20 }} />
                                </Avatar>
                            </Popover>

                            {/* remove member */}
                            <Popover
                                title="Remove member"
                                // content={<AutoComplete placeholder="Search members..." style={{ width: 150 }} />}
                                content={
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Avatar</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {record.members?.map((member) => (
                                                <tr key={member.userId}>
                                                    <th scope="row">{member.userId}</th>
                                                    <td>{member.name}</td>
                                                    <td>
                                                        <Avatar
                                                            className="d-flex align-items-center justify-content-center"
                                                            src={member.avatar}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger d-flex align-items-center px-2"
                                                            onClick={() => {
                                                                dispatch({
                                                                    type: REMOVE_USER_FROM_PROJECT_SAGA,
                                                                    project: {
                                                                        projectId: record.id,
                                                                        userId: member.userId,
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            <DeleteOutlined />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                                trigger="click"
                                // open={open}
                                // onOpenChange={handleOpenChange}
                            >
                                {/* <Button type="primary">Click me</Button> */}
                                <Avatar
                                    size="large"
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                                >
                                    <UserDeleteOutlined style={{ fontSize: 20 }} />
                                </Avatar>
                            </Popover>
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            // key: 'action',
            // width: '15%',
            render: (text, record, index) => (
                <Space size="small">
                    <button
                        // className="d-inline-block text-secondary "
                        className="btn btn-primary"
                        onClick={() => {
                            const action = {
                                type: OPEN_FORM_EDIT_PROJECT,
                                Component: <FormEditProject />,
                            };
                            dispatch(action);

                            // Dispatch dong du lieu hien tai len reducer
                            const actionEdit = {
                                type: EDIT_PROJECT,
                                payload: record,
                            };
                            dispatch(actionEdit);
                        }}
                    >
                        <EditOutlined style={{ fontSize: 22 }} />
                    </button>
                    {/* <button className="d-inline-block text-secondary"> */}
                    <Popconfirm
                        title={`Are you sure to delete project ${record.id}?`}
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                projectId: record.id,
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 22 }} />
                        </button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const dispatch = useDispatch();
    // lay data tu reducer vao component
    const { arrProject } = useSelector((state) => state.ProjectReducer);

    // Call API
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA,
        });
    }, []);

    console.log('arrProject: ', arrProject);

    return (
        <div className="container">
            <h3 className="mt-5">Project management</h3>
            <Table columns={columns} dataSource={arrProject} onChange={onChange} rowKey={'id'} />
        </div>
    );
}

export default ProjectManagement;

// const columns = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//   },
//   {
//     title: 'Chinese Score',
//     dataIndex: 'chinese',
//     sorter: {
//       compare: (a, b) => a.chinese - b.chinese,
//       multiple: 3,
//     },
//   },
//   {
//     title: 'Math Score',
//     dataIndex: 'math',
//     sorter: {
//       compare: (a, b) => a.math - b.math,
//       multiple: 2,
//     },
//   },
//   {
//     title: 'English Score',
//     dataIndex: 'english',
//     sorter: {
//       compare: (a, b) => a.english - b.english,
//       multiple: 1,
//     },
//   },
// ];
