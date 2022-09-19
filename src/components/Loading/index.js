import { useSelector } from 'react-redux';
import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  // console.log('loading is: ', isLoading);
  return isLoading ? (
    <div className={cx('wrapper')}>
      <img src={images.loading} alt="loading" />
    </div>
  ) : (
    <></>
  );
}

export default Loading;
