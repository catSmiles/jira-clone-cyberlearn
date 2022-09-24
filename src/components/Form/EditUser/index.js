/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SUBMIT_FORM_EDIT_USER, UPDATE_USER_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';

function EditUser(props) {
  const dispatch = useDispatch();

  // Dua action submit form len reducer
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_FORM_EDIT_USER,
      submitFunction: formik.handleSubmit,
    });
  }, []);

  // get user by id
  const { userDetail } = useSelector((state) => state.UserReducer);
  console.log('userDetail: ', userDetail);

  // Formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: userDetail.email,
      passWord: '',
      id: userDetail.userId,
      name: userDetail.name,
      phoneNumber: userDetail.phoneNumber,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch({
        type: UPDATE_USER_SAGA,
        userUpdate: values,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input disabled value={formik.values.id} type="text" className="form-control" id="id" name="id" />
      </div>
      <div className="form-group">
        <label htmlFor="name">User name</label>
        <input
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          className="form-control"
          id="name"
          name="name"
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
        />
      </div>
      <div className="form-group">
        <label htmlFor="passWord">Password</label>
        <input
          value={formik.values.passWord}
          onChange={formik.handleChange}
          placeholder="Enter new password..."
          type="password"
          className="form-control"
          id="passWord"
          name="passWord"
        />
      </div>
    </form>
  );
}

export default EditUser;
