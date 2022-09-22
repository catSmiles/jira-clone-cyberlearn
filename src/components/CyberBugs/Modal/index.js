/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@tinymce/tinymce-react';
import images from '~/assets/images';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { useEffect } from 'react';
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  REMOVE_USER_ASSIGNESS,
  UPDATE_STATUS_TASK_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import { Avatar, InputNumber, Select, Slider, Tooltip } from 'antd';
import { useState } from 'react';

// search on select user - antd
const handleSearch = (value) => {
  console.log(`Search: ${value}`);
};

function ModalCyberBugs(props) {
  const dispatch = useDispatch();

  // Get taskDetail from reducer
  const { taskDetail } = useSelector((state) => state.ProjectReducer);
  console.log('taskDetail: ', taskDetail);

  const [visibleEditor, setVisibleEditor] = useState(false);
  const [contentEditor, setContentEditor] = useState(taskDetail.description);

  // Editor
  const renderDescription = (text) => {
    if (text == null) return;
    const jsxDescription = parse(text);
    // console.log('text is: ', text);

    return (
      <>
        {(visibleEditor && (
          <div>
            <Editor
              name="description"
              onEditorChange={(content, editor) => {
                setContentEditor(content);
              }}
              initialValue={taskDetail.description}
              value={taskDetail.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
            />
            <div className="mt-3">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  // alert('clicked on save');
                  dispatch({
                    type: CHANGE_TASK_MODAL,
                    name: 'description',
                    value: contentEditor,
                  });

                  setVisibleEditor(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setVisibleEditor(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        )) || (
          <Tooltip title="Double click to edit">
            <div
              onDoubleClick={() => {
                setVisibleEditor(true);
              }}
              className="cursor-pointer"
            >
              {jsxDescription}
            </div>
          </Tooltip>
        )}
      </>
    );
  };

  // get project detail
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  console.log('projectDetail: ', projectDetail);

  // Call API - get all TaskType
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  // console.log('arrTaskType', arrTaskType);
  useEffect(() => {
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
  }, []);

  // Call API - get arrStatus
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  // console.log('arrStatus: ', arrStatus);
  useEffect(() => {
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
  }, []);

  // Call API - get arrPriority
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  // console.log('arrPriority: ', arrPriority);
  useEffect(() => {
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
  }, []);

  // Tranform data
  const transformData = (name, value) => {
    const e = { target: {} };
    e.target.value = value;
    e.target.name = name;
    return e;
  };

  const handleInputNumber = (name) => {
    return (value) => {
      const e = transformData(name, value);
      handleChange(e);
    };
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log("your're changed task modal");
    alert(`name is ${name}. Value is ${value}`);

    dispatch({
      type: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  // test get unique user
  // const uniqueObjArray = [...new Map(projectDetail.members?.map((item) => [item['userId'], item])).values()];
  // const membersTest = projectDetail.member?.filter((member) => {
  //   const { userId, name } = member;
  // });

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            {/* Task type */}
            <div className="task-title d-flex align-items-center">
              <div className="mr-2">
                <i className="fa fa-bookmark"></i>
              </div>
              <select
                className="custom-select"
                name="typeId"
                value={taskDetail.typeId}
                // cach 1 - onChange
                // onChange={(e) => {
                //   handleChange(e);
                // }}
                // cach 2 - onChange
                onChange={handleChange}
              >
                {arrTaskType?.map((taskType) => (
                  <option key={taskType.id} value={taskType.id}>
                    {taskType.taskType} - {taskDetail.taskId}
                  </option>
                ))}
              </select>

              {/* <span className="font-weight-bold">TASK - {taskDetail.taskId}</span> */}
            </div>
            <div className="task-click d-flex">
              <div>
                <i className="fab fa-telegram-plane"></i>
                <span className="pl-1">Give feedback</span>
              </div>
              <div className="mx-3">
                <i className="fa fa-link"></i>
                <span className="pl-1">Copy link</span>
              </div>
              {/* <div>
                <i className="fa fa-trash-alt cursor-pointer"></i>
              </div> */}
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <i className="fa fa-times"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">{taskDetail?.taskName}</p>

                  {/* Description */}
                  <div className="description">
                    <p className="mt-1">Description</p>
                    <div className="mt-1 mb-3">{renderDescription(taskDetail.description)}</div>
                  </div>

                  {/* Commment */}
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment d-flex align-items-start">
                      <div className="avatar rounded-circle border">
                        <img src={images.avatar1} alt="avatar" />
                      </div>
                      <div className="input-comment">
                        <input type="text" className="form-control" placeholder="Add a comment..." />
                        <p>
                          {/* <span style="font-weight: 500; color: gray;"> */}
                          <span className="font-weight-bold text-secondary pr-1">Tip:</span>
                          <span>
                            press
                            <span
                              className="font-weight-bold d-inline-block px-2 m-2 text-secondary"
                              style={{
                                backgroundColor: '#ecedf0',
                                color: '#b4bac6',
                              }}
                            >
                              M
                            </span>
                            to comment.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment d-flex align-items-start">
                          <div className="avatar rounded-circle border">
                            <img src={images.avatar1} alt="" />
                          </div>
                          <div>
                            <p className="mb-2">
                              <span className="pr-2 font-weight-bold">Lord Gaben</span>
                              <span className="text-secondary">a month ago</span>
                            </p>
                            <p className="mb-2">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad accusamus molestiae?
                            </p>
                            <div>
                              <span
                                className="mr-2 p-1 cursor-pointer border d-inline-block"
                                style={{ color: '#929398' }}
                              >
                                Edit
                              </span>
                              <span className="p-1 border cursor-pointer d-inline-block" style={{ color: '#929398' }}>
                                Delete
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  {/* Status */}
                  <div className="status">
                    <label className="font-weight-bold" htmlFor="statusId">
                      STATUS
                    </label>

                    <div className="input-group">
                      <select
                        className="custom-select"
                        id="statusId"
                        name="statusId"
                        // defaultValue={taskDetail.statusId}
                        value={taskDetail.statusId}
                        onChange={(e) => {
                          handleChange(e);

                          // Change status when user click
                          // const value = e.target.value;
                          // console.log('value of select status task: ', value);
                          // dispatch({
                          //   type: UPDATE_STATUS_TASK_SAGA,
                          //   taskStatusUpdate: {
                          //     taskId: taskDetail.taskId,
                          //     statusId: value,
                          //     projectId: taskDetail.projectId,
                          //   },
                          // });
                        }}
                      >
                        {arrStatus?.map((status) => (
                          <option key={status.statusId} value={status.statusId}>
                            {status.statusName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* assignees */}
                  <div className="assignees">
                    <h6 className="font-weight-bold mb-2">ASSIGNEES</h6>
                    <div className="d-flex align-items-center">
                      <Avatar.Group
                        maxCount={2}
                        size="large"
                        maxStyle={{
                          color: '#f56a00',
                          backgroundColor: '#fde3cf',
                          cursor: 'pointer',
                        }}
                      >
                        {taskDetail.assigness?.map((member) => (
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

                      {/* {taskDetail.assigness.map((member) => (
                        <div className="d-flex item align-items-center">
                          <div className="avatar mr-1">
                            <img src={member.avatar} alt={member.name} />
                          </div>
                          <p className="name">
                            {member.name}
                            <span className="d-inline-block pl-2 cursor-pointer">
                              <i className="fa fa-times"></i>
                            </span>
                          </p>
                        </div>
                      ))} */}
                      {/* items  */}
                      {/* <div className="d-flex item align-items-center">
                        <div className="avatar mr-1">
                          <img src={images.avatar1} alt="" />
                        </div>
                        <p className="name">
                          Pickle Rick
                          <span className="d-inline-block pl-2 cursor-pointer">
                            <i className="fa fa-times"></i>
                          </span>
                        </p>
                      </div> */}

                      {/* <div style="display: flex; align-items: center;"> */}
                      {/* <div className="d-flex align-items-center cursor-pointer border ml-2 btn btn-primary">
                        <span className="d-inline-block mr-2">
                          <i className="fa fa-plus"></i>
                        </span>
                        <span>Add more</span>
                      </div> */}
                    </div>
                  </div>

                  {/* assignees test */}
                  <div className="assignees">
                    <h6 className="font-weight-bold mb-2 mt-3">ASSIGNEES TEST</h6>
                    {taskDetail.assigness?.map((member) => (
                      <div
                        key={member.id}
                        className="member-item mb-2 d-flex align-items-center justify-content-between py-1 px-2 w-full"
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar">
                            <img src={member.avatar} alt={member.name} />
                          </div>
                          <p className="name mx-2">
                            <strong> {member.name}</strong>
                          </p>
                        </div>
                        <div
                          className="px-2 cursor-pointer"
                          style={{ fontSize: 18 }}
                          onClick={() => {
                            // alert(`clicked on uderId:  ${member.id}`);
                            dispatch({
                              type: REMOVE_USER_ASSIGNESS,
                              userId: member.id,
                            });
                            // dispatch here - deleted
                          }}
                        >
                          <i className="fa fa-times"></i>
                        </div>
                      </div>
                    ))}
                    <div className="mt-2">
                      <Select
                        options={projectDetail.members
                          ?.filter((member) => {
                            let index = taskDetail.assigness?.findIndex((user) => user.id === member.userId);
                            return index !== -1 ? false : true;
                          })
                          .map((member) => {
                            return { value: member.userId, label: member.name };
                          })}
                        size="large"
                        optionFilterProp="label"
                        style={{ width: '100%', fontWeight: 500 }}
                        name="lstUser"
                        value="+ Add member"
                        className="text-primary"
                        onSelect={(value) => {
                          if (value === '0') return;
                          let userSelected = projectDetail.members.find((member) => member.userId === value);
                          userSelected = { ...userSelected, id: userSelected.userId };
                          //dispatchReducer

                          dispatch({
                            type: CHANGE_ASSIGNESS,
                            userSelected,
                          });
                        }}
                      ></Select>
                    </div>
                  </div>

                  {/* reporter */}

                  {/* priority */}
                  <div className="priority">
                    <label htmlFor="priorityId" className="font-weight-bold mt-3 mb-2">
                      PRIORITY
                    </label>

                    <div className="input-group">
                      <select
                        className="custom-select"
                        id="priorityId"
                        name="priorityId"
                        value={taskDetail.priorityId}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {arrPriority?.map((priority) => (
                          <option key={priority.priorityId} value={priority.priorityId}>
                            {priority.priority}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* estimate */}
                  <div className="estimate">
                    <label htmlFor="originalEstimate" className="font-weight-bold mt-3 mb-2">
                      ORIGINAL ESTIMATE (HOURS)
                    </label>
                    {/* <input type="text" className="estimate-hours form-control" /> */}
                    {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} /> */}
                    <InputNumber
                      min={0}
                      max={20}
                      id="originalEstimate"
                      name="originalEstimate"
                      value={taskDetail.originalEstimate}
                      style={{ width: '100%' }}
                      onChange={handleInputNumber('originalEstimate')}
                    />
                  </div>

                  <div className="time-tracking">
                    {/* time tracking */}
                    <div className="form-group">
                      <label className="font-weight-bold mt-3 mb-0">TIME TRACKING</label>
                      <Slider
                        className="my-slider"
                        min={0}
                        max={Number(taskDetail.timeTrackingSpent) + Number(taskDetail.timeTrackingRemaining)}
                        // max={20}
                        // onChange={onChange}
                        // value={typeof inputValue === 'number' ? inputValue : 0}
                        defaultValue={taskDetail.timeTrackingSpent}
                        value={taskDetail.timeTrackingSpent}
                        tooltip={{
                          // open: true,
                          open: false,
                        }}
                      />
                      <div
                        className="d-flex justify-content-between px-1 text-secondary"
                        style={{ fontSize: 13, fontWeight: 500 }}
                      >
                        <div>
                          <span style={{ paddingRight: 1 }}>{taskDetail.timeTrackingSpent}</span>h logged
                        </div>
                        <div>
                          <span style={{ paddingRight: 1 }}>{taskDetail.timeTrackingRemaining}</span>h remaining
                        </div>
                      </div>
                    </div>

                    {/* Time spent + Time remaining */}
                    <div className="form-goup">
                      <div className="row">
                        <div className="col">
                          <label htmlFor="timeTrackingSpent" style={{ fontSize: 13 }}>
                            <strong>Time spent (h)</strong>
                          </label>
                          <InputNumber
                            name="timeTrackingSpent"
                            id="timeTrackingSpent"
                            min={0}
                            max={10}
                            style={{
                              width: '100%',
                            }}
                            value={taskDetail.timeTrackingSpent}
                            onChange={handleInputNumber('timeTrackingSpent')}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="timeTrackingRemaining" style={{ fontSize: 13 }}>
                            <strong>Time remaining (h)</strong>
                          </label>
                          <InputNumber
                            name="timeTrackingRemaining"
                            id="timeTrackingRemaining"
                            min={0}
                            max={10}
                            style={{
                              width: '100%',
                            }}
                            value={taskDetail.timeTrackingRemaining}
                            onChange={handleInputNumber('timeTrackingRemaining')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* <h6 className="font-weight-bold mt-3 mb-2">TIME TRACKING</h6>
                    <div className="d-flex">
                      <div>
                        <i className="fa fa-clock"></i>
                      </div>
                      <div className="w-full">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '25%' }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <p className="logged">4h logged</p>
                          <p className="estimate-time">12h estimated</p>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  {/* <div style="color: #929398;"> */}
                  {/* <div>Create at a month ago</div> */}
                  {/* <div style="color: #929398;"> */}
                  {/* <div>Update at a few seconds ago</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCyberBugs;

// reporter
{
  // <div className="reporter">
  //   <h6 className="font-weight-bold mt-3 mb-2">REPORTER</h6>
  //   <div className="d-flex item align-items-center">
  //     <div className="avatar mr-1">
  //       <img src={images.avatar1} alt="" />
  //     </div>
  //     <p className="name">
  //       Pickle Rick
  //       <span className="d-inline-block pl-2 cursor-pointer">
  //         <i className="fa fa-times"></i>
  //       </span>
  //     </p>
  //   </div>
  // </div>;
}

// descript
{
  /* <div className="font-weight-bold mb-2">Jira Software (software projects) issue types:</div>
<div className="title">
  <div className="title-item">
    <h5>
      <i className="fa fa-bug"></i>
      <span className="d-inline-block ml-2">BUG</span>
    </h5>
    <p>A bug is a problem which impairs or prevents the function of a product.</p>
  </div>
  <div className="title-item">
    <h5>
      <i className="fa fa-book-reader"></i>
      <span className="d-inline-block ml-2">STORY</span>
    </h5>
    <p>A user story is the smallest unit of work that needs to be done.</p>
  </div>
  <div className="title-item">
    <h5>
      <i className="fa fa-tasks"></i>
      <span className="d-inline-block ml-2">TASK</span>
    </h5>
    <p>A task represents work that needs to be done</p>
  </div>
</div> */
}

// select

// <Select
// id=""
// name=""
// className="my-select form-control"
// mode="multiple"
// size="large"
// options={projectDetail.members
//   ?.filter((member) => {
//     const index = taskDetail.assigness?.findIndex((user) => user.id === member.userId);
//     return index !== -1 ? false : true;
//   })
//   .map((member) => ({ label: member.name, value: member.userId }))}
// placeholder="Please select..."
// optionFilterProp="label"
// // defaultValue={['reactjs']}
// // value={[]}
// // onChange={(values) => formik.setFieldValue('listUserAsign', values)}
// onChange={(values) => {
//   console.log('value change select: ', values); // get many value
// }}
// onSearch={handleSearch}
// onSelect={(value) => {
//   console.log('value select: ', value); // get one value
//   // formik.setFieldValue('listUserAsign', value);
// }}
// style={{
//   width: '100%',
// }}
// />
