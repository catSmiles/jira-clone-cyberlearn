/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@tinymce/tinymce-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
    GET_ALL_PROJECT_CATEGORY_SAGA,
    SET_SUBMIT_FROM_EDIT_PROJECT,
    UPDATE_PROJECT_SAGA,
} from '~/redux/constants/CyberBugs/UserCyberBugsSaga';

function FormEditProject() {
    // Get data: projectEdit from redux
    const { projectEditing } = useSelector((state) => state.ProjectReducer);
    // console.log('projectEdit: ', projectEditing);

    // Get data: arrProjectCategory from redux
    const { arrProjectCategory } = useSelector((state) => state.ProjectCategoryReducer);
    // console.log('arrProjectCategory: ', arrProjectCategory);

    const dispatch = useDispatch();

    // // submit
    // const handleSubmitEditForm = (e) => {
    //     e.preventDefault();
    //     alert('submited edit form');
    // };

    // Class component - life circel => componentDidMount
    useEffect(() => {
        dispatch({ type: SET_SUBMIT_FROM_EDIT_PROJECT, payload: formik.handleSubmit });
    }, []);

    // Call API - GET ProjectCategory
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        });
    }, []);

    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated: ', content);
        formik.setFieldValue('description', content);
    };

    // formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: projectEditing.id,
            projectName: projectEditing.projectName,
            description: projectEditing.description,
            categoryId: projectEditing.categoryId,
        },
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));

            // when user click on submit button => Send data info backend from API
            // Goi saga
            dispatch({
                type: UPDATE_PROJECT_SAGA,
                projectUpdate: values,
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <input
                            disabled
                            value={formik.values?.id}
                            type="text"
                            className="form-control"
                            id="id"
                            name="id"
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            value={formik.values?.projectName}
                            type="text"
                            className="form-control"
                            id="projectName"
                            name="projectName"
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className="col">
                    {/* <div className="form-group">
                        <label htmlFor="categoryId">category Id</label>
                        <input
                            value={formik.values?.categoryId}
                            type="text"
                            className="form-control"
                            id="categoryId"
                            name="categoryId"
                        />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="categoryId">Category ID</label>
                        <select
                            id="categoryId"
                            className="form-control"
                            name="categoryId"
                            onChange={formik.handleChange}
                            value={formik.values.categoryId}
                        >
                            {arrProjectCategory.map((projectCategory) => (
                                <option key={projectCategory.id} value={projectCategory.id}>
                                    {projectCategory.projectCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label>Description</label>
                        <Editor
                            name="description"
                            onEditorChange={handleEditorChange}
                            initialValue={formik.values?.description}
                            value={formik.values.description}
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
        </form>
    );
}

export default FormEditProject;
