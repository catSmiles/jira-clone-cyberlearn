import { Route } from 'react-router-dom';
function UserLoginTemplate({ Component, restRoute }) {
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <div
              className="d-flex flex-column align-items-center justify-content-center border"
              style={{ height: '100vh' }}
            >
              <Component />
            </div>
          </>
        );
      }}
    />
  );
}

export default UserLoginTemplate;

// function UserLoginTemplate({ Component, restRoute }) {
//   return (
//     <Route
//       {...restRoute}
//       render={(propsRoute) => {
//         return (
//           <>
//             <Layout>
//               <Sider
//                 width={window.innerWidth / 2}
//                 style={{
//                   height: window.innerHeight,
//                   backgroundImage: 'url(https://picsum.photos/500)',
//                 }}
//               />
//               <Content>
//                 <Component />
//               </Content>
//             </Layout>
//           </>
//         );
//       }}
//     />
//   );
// }
