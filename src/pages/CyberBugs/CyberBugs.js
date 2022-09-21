/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux';
import Header from '~/components/CyberBugs/Main/Header';
import Info from '~/components/CyberBugs/Main/Info';
import Content from '~/components/CyberBugs/Main/Content';
import { useEffect } from 'react';
import { GET_PROJECT_DETAIL_SAGA } from '~/redux/constants/CyberBugs/UserCyberBugsSaga';
function CyberBugs(props) {
    const dispatch = useDispatch();
    const { projectDetail } = useSelector((state) => state.ProjectReducer);

    useEffect(() => {
        const { projectId } = props.match.params;
        console.log('projectId: ', projectId);
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId,
        });
    }, []);

    console.log('projectDetail: ', projectDetail);

    return (
        <>
            <div className="main container">
                <Header projectName={projectDetail.projectName} />
                <Info
                    title={projectDetail.projectName}
                    members={projectDetail.members}
                    description={projectDetail.description}
                />
                <Content projectDetail={projectDetail} />
            </div>
        </>
    );
}

export default CyberBugs;
