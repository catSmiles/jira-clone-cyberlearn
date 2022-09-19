/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';

function CreateProject() {
    const dispatch = useDispatch();
    // get data from redux
    const { arrProjectCategory } = useSelector((state) => state.ProjectCategoryReducer);

    // console.log('arrProjectCategory: ', arrProjectCategory);
    const handleEditorChange = (content, editor) => {
        // console.log('Content was updated: ', content);
        formik.setFieldValue('description', content);
    };

    // Call API - GET ProjectCategory
    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        });
    }, []);

    // formik
    const formik = useFormik({
        initialValues: {
            projectName: '',
            description: '',
            categoryId: '0',
        },
        onSubmit: (values) => {
            // console.log(values);
            // alert(JSON.stringify(values, null, 2));

            // dispatch action create project
            dispatch({
                type: CREATE_PROJECT_SAGA,
                newProject: values,
            });
        },
    });

    // const handleChangeSelect = (e) => {
    //   console.log('value select: ', e);
    // };

    return (
        <div className="container">
            <h3 className="mt-5">Create project</h3>
            <form onSubmit={formik.handleSubmit}>
                {/* project name */}
                <div className="form-group">
                    <label htmlFor="nameProject">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameProject"
                        name="projectName"
                        placeholder="Project name..."
                        value={formik.values?.projectName}
                        onChange={formik.handleChange}
                    />
                </div>
                {/* editor - description */}
                <div className="form-group">
                    <label>Description</label>
                    <Editor
                        name="description"
                        onEditorChange={handleEditorChange}
                        initialValue=""
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
                {/*  type project */}
                <div className="form-group">
                    <label htmlFor="typeProject">Type project</label>
                    <select className="form-control" id="typeProject" name="categoryId" onChange={formik.handleChange}>
                        <option value="0">Choose type project...</option>
                        {arrProjectCategory.map((projectCategory) => (
                            <option key={projectCategory.id} value={projectCategory.id}>
                                {projectCategory.projectCategoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4 mb-5">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateProject;
