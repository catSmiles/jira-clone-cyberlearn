import { NavLink } from 'react-router-dom';
import images from '~/assets/images';
function Menu() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src={images.avatar4} alt="avatar" />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" style={{ minWidth: '30px' }}></i>
                    <NavLink to="/cyberbugs" className="text-dark" activeClassName="active font-weight-bold text-dark">
                        Cyber Board
                    </NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" style={{ minWidth: '30px' }}></i>
                    <NavLink
                        to="/create-project"
                        className="text-dark"
                        activeClassName="active font-weight-bold text-dark"
                    >
                        Create project
                    </NavLink>
                </div>
                <div>
                    <i className="fa fa-project-diagram" style={{ minWidth: '30px' }}></i>
                    <NavLink
                        to="/project-management"
                        className="text-dark"
                        activeClassName="active font-weight-bold text-dark"
                    >
                        Management
                    </NavLink>
                </div>
            </div>
            <hr />
            <div className="feature">
                <div>
                    <i className="fa fa-truck" style={{ minWidth: '25px' }}></i>
                    <span className="font-weight-bold">Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" style={{ minWidth: '25px' }}></i>
                    <span className="font-weight-bold">Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" style={{ minWidth: '25px' }}></i>
                    <span className="font-weight-bold">Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" style={{ minWidth: '25px' }}></i>
                    <span className="font-weight-bold">Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" style={{ minWidth: '25px' }}></i>
                    <span className="font-weight-bold">Components</span>
                </div>
            </div>
        </div>
    );
}

export default Menu;
