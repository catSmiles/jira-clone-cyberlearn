/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
    GET_ALL_PRIORITY_SAGA,
    GET_ALL_PROJECT_SAGA,
    GET_ALL_TASK_TYPE_SAGA,
    GET_USER_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
import './styles.scss';

const handleSearch = (value) => {
    console.log(`Search: ${value}`);
};

function CreateTask() {
    const dispatch = useDispatch();
    // state time tracking
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    });

    const { timeTrackingSpent, timeTrackingRemaining } = timeTracking;

    // Call API - getAllProject
    const { arrProject } = useSelector((state) => state.ProjectReducer);
    // console.log('arrProject: ', arrProject);

    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_SAGA,
        });
    }, []);

    // Call API - getAllTaskType
    const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
    // console.log('arrTaskType: ', arrTaskType);

    useEffect(() => {
        dispatch({
            type: GET_ALL_TASK_TYPE_SAGA,
        });
    }, []);

    // Call API - getAllPriority
    const { arrPriority } = useSelector((state) => state.PriorityReducer);
    // console.log('arrPriority: ', arrPriority);
    useEffect(() => {
        dispatch({
            type: GET_ALL_PRIORITY_SAGA,
        });
    }, []);

    // Call API - getUser
    const { usersSearch } = useSelector((state) => state.UserReducer);
    // console.log('usersSearch: ', usersSearch);
    useEffect(() => {
        dispatch({
            type: GET_USER_SAGA,
        });
    }, []);

    // transfrom data option for select component of antd
    const usersOption = usersSearch.map((user) => ({ label: user.name, value: user.userId }));

    // formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            listUserAsign: [0],
            taskName: '',
            description: '',
            statusId: '',
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0,
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    // ----------- Handle change field -------------

    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated: ', content);
        formik.setFieldValue('description', content);
    };

    const handleChangeSelect = (name) => {
        // console.log(`Selected: ${name}`);
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value);
        };
    };

    const handleChangeTimeTracking = (value) => {
        // console.log('handleChangeSlider: ', value);
        if (value > 10 || value < 0) return;
        setTimeTracking({
            ...timeTracking,
            timeTrackingSpent: value,
        });
    };

    useEffect(() => {
        formik.setFieldValue('timeTrackingSpent', timeTrackingSpent);
        formik.setFieldValue('timeTrackingRemaining', timeTrackingRemaining);
    }, [timeTrackingSpent, timeTrackingRemaining]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {/* projectId + Task name*/}
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="projectId">ID</label>
                        <select className="form-control" id="projectId" name="projectId" onChange={formik.handleChange}>
                            <option value={0}>please select...</option>
                            {arrProject.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name</label>
                        <input
                            className="form-control"
                            placeholder="please input..."
                            name="taskName"
                            id="taskName"
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Priority - OK + Task type - OK */}
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="priorityId">Priority</label>
                        <select
                            className="form-control"
                            id="priorityId"
                            name="priorityId"
                            onChange={formik.handleChange}
                        >
                            <option value={0}>please select...</option>
                            {arrPriority.map((priority) => (
                                <option key={priority.priorityId} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="typeId">Task Type</label>
                        <select className="form-control" id="typeId" name="typeId" onChange={formik.handleChange}>
                            <option value={0}>please select...</option>
                            {arrTaskType.map((taskType) => (
                                <option key={taskType.id} value={taskType.id}>
                                    {taskType.taskType}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            {/* Assignees + Time tracking */}
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="listUserAsign">Assignees</label>
                        <Select
                            id="listUserAsign"
                            name="listUserAsign"
                            className="my-select"
                            mode="multiple"
                            size="large"
                            options={usersOption}
                            placeholder="Please select..."
                            optionFilterProp="label"
                            // defaultValue={['reactjs']}
                            // value=[]
                            onChange={handleChangeSelect('listUserAsign')}
                            onSearch={handleSearch}
                            style={{
                                width: '100%',
                            }}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="projectName">Time tracking</label>
                        <Slider
                            className="my-slider"
                            min={0}
                            // max={Number(timeTrackingSpent) + Number(timeTrackingRemaining)}
                            max={20}
                            // onChange={onChange}
                            onChange={handleChangeTimeTracking}
                            // value={typeof inputValue === 'number' ? inputValue : 0}
                            // value={Number(timeTrackingSpent) + Number(timeTrackingRemaining)}
                            defaultValue={0}
                            value={timeTrackingSpent}
                            tooltip={{
                                // open: true,
                                open: false,
                            }}
                        />
                        <div
                            className="d-flex justify-content-between px-1 text-secondary"
                            style={{ fontSize: 12, fontWeight: 500 }}
                        >
                            <div>
                                <span style={{ paddingRight: 1 }}>{timeTrackingSpent}</span>h logged
                            </div>
                            <div>
                                <span style={{ paddingRight: 1 }}>{timeTrackingRemaining}</span>h remaining
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Original Estimate + Time spent (hours) + Time remaining (hours) */}
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="originalEstimate" style={{ width: '100%', fontSize: 13 }}>
                            Original Estimate
                        </label>
                        <InputNumber
                            name="originalEstimate"
                            id="originalEstimate"
                            min={0}
                            max={20}
                            // size="large"
                            style={{
                                // margin: '8px 0',
                                width: '100%',
                            }}
                            value={formik.values.originalEstimate}
                            onChange={handleChangeInputNumber('originalEstimate')}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="timeTrackingSpent" style={{ fontSize: 13 }}>
                                Time spent (hours)
                            </label>
                            <InputNumber
                                name="timeTrackingSpent"
                                id="timeTrackingSpent"
                                min={0}
                                max={10}
                                style={{
                                    width: '100%',
                                }}
                                value={timeTrackingSpent}
                                onChange={(value) => {
                                    // console.log('value of inpput number antd: ', value);
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: value,
                                    });
                                }}
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="timeTrackingRemaining" style={{ fontSize: 13 }}>
                                Time remaining (hours)
                            </label>
                            <InputNumber
                                name="timeTrackingRemaining"
                                id="timeTrackingRemaining"
                                min={0}
                                max={10}
                                style={{
                                    // margin: '8px 0',
                                    width: '100%',
                                }}
                                value={timeTrackingRemaining}
                                onChange={(value) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: value,
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Description */}
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Description</label>
                        <Editor
                            name="description"
                            onEditorChange={handleEditorChange}
                            initialValue=""
                            value=""
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
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
}

export default CreateTask;

// data form
// {
//   "listUserAsign": [
//     0
//   ],
//   "taskName": "string",
//   "description": "string",
//   "statusId": "string",
//   "originalEstimate": 0,
//   "timeTrackingSpent": 0,
//   "timeTrackingRemaining": 0,
//   "projectId": 0,
//   "typeId": 0,
//   "priorityId": 0
// }

{
    /* <div className="row">
<div className="col">
    <div className="form-group">
        <label htmlFor="projectName">Project Name</label>
        <Select
            className="my-select"
            mode="multiple"
            size="large"
            options={[
                { label: 'ReactJS', value: 'reactjs' },
                { label: 'VueJS', value: 'vuejs' },
                { label: 'Angular', value: 'angular' },
            ]}
            placeholder="Please select"
            defaultValue={['reactjs']}
            // value=[]
            onChange={handleChange}
            style={{
                width: '100%',
            }}
        >
        </Select>
    </div>
    <div className="row">
        <div className="col">
            <div className="form-group">
                <label htmlFor="projectName" style={{ width: '100%' }}>
                    Original Estimate
                </label>
                <InputNumber
                    min={1}
                    max={20}
                    // size="large"
                    style={{
                        // margin: '8px 0',
                        width: '100%',
                    }}
                    value={inputValue}
                    onChange={onChange}
                />
            </div>
        </div>
    </div>
</div>
<div className="col">
    <div className="form-group">
        <label htmlFor="projectName">Time tracking</label>
        <Slider
            min={1}
            max={20}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            defaultValue={1}
            tooltip={{
                // open: true,
                open: false,
            }}
        />
        <div
            className="d-flex justify-content-between px-1 text-secondary "
            style={{ fontSize: 13, fontWeight: 500 }}
        >
            <div>
                <span>{inputValue}</span>h logged
            </div>
            <div>
                <span>{inputValue}</span>h remaining
            </div>
        </div>
    </div>
    <div className="row" style={{ marginTop: 34 }}>
        <div className="col">
            <label htmlFor="projectName" style={{ fontSize: 13 }}>
                Time spent (hours)
            </label>
            <InputNumber
                min={1}
                max={20}
                style={{
                    // margin: '8px 0',
                    width: '100%',
                }}
                value={inputValue}
                onChange={onChange}
            />
        </div>
        <div className="col">
            <label htmlFor="projectName" style={{ fontSize: 13 }}>
                Time remaining (hours)
            </label>
            <InputNumber
                min={1}
                max={20}
                style={{
                    // margin: '8px 0',
                    width: '100%',
                }}
                value={inputValue}
                onChange={onChange}
            />
        </div>
    </div>
</div>
</div> */
}
