/* eslint-disable no-lone-blocks */
import { Avatar, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import images from '~/assets/images';
import { GET_TASK_DETAIL_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
function Content({ projectDetail }) {
  const dispatch = useDispatch();
  //   const { taskDetail } = useSelector((state) => state.ProjectReducer);

  const renderCardTaskList = () => {
    return projectDetail.lstTask?.map((task) => (
      <div key={task.statusName} className="card col pb-2">
        <div className="card-header" style={{ fontSize: 13, fontWeight: 500, paddingLeft: 4 }}>
          {task.statusName}
        </div>
        <ul className="list-group list-group-flush">
          {task.lstTaskDeTail.map((taskDetail, index) => (
            <li
              key={index}
              className="list-group-item cursor-pointer"
              data-toggle="modal"
              data-target="#infoModal"
              onClick={() => {
                dispatch({
                  type: GET_TASK_DETAIL_SAGA,
                  taskId: taskDetail.taskId,
                });
              }}
            >
              <p className="mt-1 mb-3" style={{ fontWeight: 400 }}>
                {taskDetail.taskName}
              </p>
              <div className="block d-flex">
                <div className="block-left">
                  <span className="d-inline-block mr-1">
                    <i className="fa fa-bookmark"></i>
                  </span>
                  <span className="d-inline-block text-danger font-weight-bold">
                    {taskDetail.priorityTask.priority}
                  </span>

                  {/* <span className="d-inline-block mr-1">
                                        <i className="fa fa-bookmark"></i>
                                    </span>
                                    <span className="d-inline-block">
                                        <i className="fa fa-arrow-up"></i>
                                    </span> */}
                </div>
                <div className="block-right">
                  <div className="avatar-group d-flex">
                    <Avatar.Group
                      maxCount={2}
                      maxStyle={{
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                      }}
                    >
                      {taskDetail.assigness.map((member) => (
                        <Tooltip key={member.id} title={member.name} placement="top">
                          <Avatar
                            style={{
                              backgroundColor: '#87d068',
                            }}
                            src={member.avatar}
                          />
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                    {/* <div className="avatar rounded-circle border mr-1">
                                            <img src={images.avatar1} alt="" />
                                        </div>
                                        <div className="avatar rounded-circle border">
                                            <img src={images.avatar2} alt="" />
                                        </div> */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ));
  };
  return (
    <div className="container">
      <div className="content row">{renderCardTaskList()}</div>
    </div>
  );
}

export default Content;

{
  /* <div className="card col">
<div className="card-header font-weight-bold">BACKLOG 3</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item cursor-pointer" data-toggle="modal" data-target="#infoModal">
        <p>Each issue has a single reporter but can have multiple assignees</p>
        <div className="block d-flex">
            <div className="block-left">
                <span className="d-inline-block mr-1">
                    <i className="fa fa-bookmark"></i>
                </span>
                <span className="d-inline-block">
                    <i className="fa fa-arrow-up"></i>
                </span>
            </div>
            <div className="block-right">
                <div className="avatar-group d-flex">
                    <div className="avatar rounded-circle border mr-1">
                        <img src={images.avatar1} alt="" />
                    </div>
                    <div className="avatar rounded-circle border">
                        <img src={images.avatar2} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </li>
    <li className="list-group-item">
        <p>Each issue has a single reporter but can have multiple assignees</p>
        <div className="block d-flex">
            <div className="block-left">
                <span className="d-inline-block mr-1">
                    <i className="fa fa-check-square"></i>
                </span>
                <span className="d-inline-block mr-1">
                    <i className="fa fa-arrow-up"></i>
                </span>
            </div>
            <div className="block-right">
                <div className="avatar-group d-flex">
                    <div className="avatar rounded-circle border mr-1">
                        <img src={images.avatar1} alt="" />
                    </div>
                    <div className="avatar rounded-circle border">
                        <img src={images.avatar2} alt="" />
                    </div>
                </div>
            </div>
        </div>
    </li>
    <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div>
<div className="card col">
<div className="card-header font-weight-bold">SELECTED FOR DEVELOPMENT 2</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card col">
<div className="card-header font-weight-bold">IN PROGRESS 2</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>
<div className="card col">
<div className="card-header font-weight-bold">DONE 3</div>
<ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */
}
