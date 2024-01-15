import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
  return (
    <div className="flex_wrap_spacearound mt_20">
      <Spinner animation="border" role="status">
        <span></span>
      </Spinner>
    </div>
  );
}
