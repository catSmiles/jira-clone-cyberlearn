import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import UserLoginTemplate from './templates/UserTemplate';
import HomeTemplate from './templates/HomeTemplate';
import Login from './pages/CyberBugs/Login';
import Hero from './components/Hero';
import Loading from './components/Loading';
import Home from './pages/Home';
import CyberBugsTemplate from './templates/CyberBugsTemplate';
import CyberBugs from './pages/CyberBugs/CyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement';
import DrawerCyberBugs from './HOC/DrawerCyberBugs';
import UserManagerment from './pages/CyberBugs/UserManagerment';
import Register from './pages/CyberBugs/Register';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <DrawerCyberBugs />
      <Switch>
        {/* <Route exact path="/" component={Hero} /> */}
        <UserLoginTemplate exact path="/login" Component={Login} />
        <UserLoginTemplate exact path="/register" Component={Register} />

        <HomeTemplate exact path="/home" Component={Home} />

        {/* <CyberBugsTemplate exact path="/cyberbugs" Component={CyberBugs} /> */}
        <CyberBugsTemplate exact path="/create-project" Component={CreateProject} />
        {/* <CyberBugsTemplate exact path="/Project-management" Component={ProjectManagement} /> */}

        {/* new */}
        <CyberBugsTemplate exact path="/project-detail/:projectId" Component={CyberBugs} />
        {/* <CyberBugsTemplate exact path="/" Component={ProjectManagement} /> */}
        <CyberBugsTemplate exact path="/Project-management" Component={ProjectManagement} />
        <CyberBugsTemplate exact path="/" Component={ProjectManagement} />

        <CyberBugsTemplate exact path="/user-managerment" Component={UserManagerment} />
      </Switch>
    </Router>
  );
}

export default App;
