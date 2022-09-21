import { Route } from 'react-router-dom';
// import Content from '~/components/CyberBugs/Main/Content';
// import Header from '~/components/CyberBugs/Main/Header';
// import Info from '~/components/CyberBugs/Main/Info';
import Menu from '~/components/CyberBugs/Menu';
import ModalCyberBugs from '~/components/CyberBugs/Modal';
import SideBar from '~/components/CyberBugs/SideBar';

function CyberBugsTemplate({ Component, ...restProps }) {
    return (
        <Route
            {...restProps}
            render={(propsRoute) => {
                return (
                    <div className="jira">
                        <SideBar />
                        <Menu />
                        <Component {...propsRoute} />
                        {/* <ModalCyberBugs {...propsRoute} /> */}
                        <ModalCyberBugs />
                    </div>
                );
            }}
        />
    );
}

export default CyberBugsTemplate;
