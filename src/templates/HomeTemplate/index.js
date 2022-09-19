import { Route } from 'react-router-dom';
import Header from '~/components/Home/Header';
function HomeTemplate({ Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}

export default HomeTemplate;
