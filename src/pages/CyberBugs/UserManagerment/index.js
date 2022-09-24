/* eslint-disable react-hooks/exhaustive-deps */
import { Space, Table, Popconfirm, Button, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_USER_SAGA,
  OPEN_FORM_CREATE_USER,
  OPEN_FORM_EDIT_USER,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import './styles.scss';
import CreateUser from '~/components/Form/CreateUser';
import EditUser from '~/components/Form/EditUser';

const { Search } = Input;

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};

function UserManagerment() {
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      sorter: (userId1, userId2) => {
        if (userId1 > userId2) return 1;
        return -1;
      },
    },
    {
      title: 'User Name',
      dataIndex: 'name',
      sorter: (item1, item2) => {
        const projectName1 = item1.name.toLowerCase().trim();
        const projectName2 = item2.name.toLowerCase().trim();
        if (projectName1 < projectName2) return -1;
        return 1;
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => (
        <Space size="small">
          <button
            className="btn btn-primary"
            onClick={() => {
              // alert('edit user');
              dispatch({
                type: OPEN_FORM_EDIT_USER,
                Component: <EditUser />,
                title: 'Edit User',
              });

              dispatch({
                type: EDIT_USER,
                userDetail: record,
              });

              // const action = {
              //   type: OPEN_FORM_EDIT_PROJECT,
              //   Component: <FormEditProject />,
              //   title: 'Edit Project',
              // };
              // dispatch(action);
              // Dispatch dong du lieu hien tai len reducer
              // const actionEdit = {
              //   type: EDIT_PROJECT,
              //   payload: record,
              // };
              // dispatch(actionEdit);
            }}
          >
            <EditOutlined style={{ fontSize: 22 }} />
          </button>
          <Popconfirm
            title={`Are you sure to delete user ${record.userId}?`}
            onConfirm={() => {
              // alert('delete user');
              dispatch({
                type: DELETE_USER_SAGA,
                id: record.userId,
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

  const { usersSearch } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    dispatch({
      type: GET_USER_SAGA,
    });
  }, []);

  return (
    <div className="container">
      <h3 className="mt-5">Users management</h3>
      <div className="d-flex justify-content-between">
        <Button
          size="large"
          className="mb-3"
          type="primary"
          shape="round"
          icon={<UserAddOutlined style={{ fontSize: 18 }} />}
          onClick={() => {
            // alert('add user');
            dispatch({
              type: OPEN_FORM_CREATE_USER,
              Component: <CreateUser />,
              title: 'Create User',
            });
          }}
        >
          Add user
        </Button>
        <Search
          size="large"
          className="my-search d-inline-block"
          style={{ width: 300, marginLeft: 'auto' }}
          placeholder="Search user..."
          onSearch={() => {}}
          enterButton
        />
      </div>
      <Table columns={columns} dataSource={usersSearch} onChange={onChange} rowKey={'userId'} />
    </div>
  );
}

export default UserManagerment;

// const [valueAutoComplete, setValueAutoComplete] = useState('');

// start debounce search - custom
// const debounceValue = useDebounce(valueAutoComplete, 500);
// useEffect(() => {
//   handleSearch(debounceValue);
// }, [debounceValue]);

// const handleSearch = (value) => {
//   if (value === '') return;
//   dispatch({
//     type: GET_USER_SAGA,
//     keyWord: value,
//   });
// };
// end debounce search - custom
