import Form from 'react-bootstrap/Form';
export default function Input(props) {
  const { title, setProduct, propName, product } = props;
  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        onChange={(e) => setProduct([propName], e.target.value)}
        value={product[propName]}
        required
      />
    </Form.Group>
  );
}
