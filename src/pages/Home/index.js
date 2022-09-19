import { useSelector } from 'react-redux';
function Home() {
  const { userLogin } = useSelector((state) => state.UserReducer);
  console.log('userLogin at Home page: ', userLogin);

  return (
    <>
      <span>{userLogin?.name}</span>
      <img src={userLogin?.avatar} alt={userLogin?.name} />
    </>
  );
}

export default Home;
