import Loading from '../ui/Loading';
import MessageBox from '../ui/MessageBox';

export default function ProductListWrapper(props) {
  const { children, error, loading } = props;

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <MessageBox variant="danger">{error}</MessageBox>;
  } else {
    return <>{children}</>;
  }
}
