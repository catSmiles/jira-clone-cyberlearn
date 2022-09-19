// import { USER_SIGNIN } from '../constants/Cyberbugs/Cyberbugs';
// import { userService } from '~/services/UserService';

import { USER_SIGN_IN_API } from '../constants/CyberBugs/UserCyberBugsSaga';

/** LUU Y KHONG BAT NHUNG CASE API O FILE NAY */

export const signInCyberBugsAction = ({ email, passWord }) => {
  return {
    type: USER_SIGN_IN_API,
    userLogin: {
      email,
      passWord,
    },
  };
};
