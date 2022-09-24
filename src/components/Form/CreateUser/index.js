/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_SUBMIT_FORM_CREATE_USER, USER_SIGN_UP_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
function CreateUser() {
  const dispatch = useDispatch();

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      passWord: '',
      name: '',
      phoneNumber: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));

      // dispatch action create user
      dispatch({
        type: USER_SIGN_UP_SAGA,
        userInfo: values,
      });
      formik.resetForm();
    },
  });

  // gui action submit form create user len reducer
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_FORM_CREATE_USER,
      submitFunction: formik.handleSubmit,
    });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">User name</label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Enter name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter phone number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passWord">Password</label>
        <input
          value={formik.values.passWord}
          onChange={formik.handleChange}
          type="password"
          className="form-control"
          id="passWord"
          name="passWord"
          placeholder="Enter password"
        />
      </div>

      {/* <button type="submit" className="btn btn-primary">
        Submit
      </button> */}
    </form>
  );
}

export default CreateUser;

{
  /* <div className="row">
<div className="col"></div>
<div className="col">
  <div className="form-group">
    <label htmlFor="passWord">Confirm password</label>
    <input
      type="password"
      className="form-control"
      id="passWord"
      name="passWord"
      placeholder="Enter password"
    />
  </div>
</div>
</div> */
}
