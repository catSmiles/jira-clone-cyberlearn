import images from '~/assets/images';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';
import { Avatar, Tooltip } from 'antd';

function Info({ title, members, description }) {
    // console.log('description: ', typeof description);

    const renderJSX = (value) => {
        if (value != null) return parse(value);
    };

    return (
        <>
            <h3 className="mt-3 mb-2">{title}</h3>
            <div className="description mt-3 mb-4">{renderJSX(description)}</div>
            <div className="info d-flex align-items-center">
                <div className="search-block">
                    {/* <input className="search" placeholder="search" /> */}
                    <input type="text" className="form-control" placeholder="Search..." aria-label="search" />
                </div>

                <div className="avatar-group d-flex">
                    <Avatar.Group
                        maxCount={2}
                        maxStyle={{
                            color: '#f56a00',
                            backgroundColor: '#fde3cf',
                            cursor: 'pointer',
                        }}
                        size="large"
                    >
                        {members?.map((member) => (
                            <Tooltip key={member.userId} title={member.name} placement="top">
                                <Avatar src={member.avatar} />
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                </div>
                <div className="text ml-3">Only My Issues</div>
                <div className="text ml-3">Recently Updated</div>
            </div>
        </>
    );
}

export default Info;
