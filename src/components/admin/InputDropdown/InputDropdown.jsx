import React from 'react';
import Form from 'react-bootstrap/Form';
export default function InputDropdown(props) {
  const { title, product } = props;
  return (
    <Form.Group className="mb-3" controlId="name">
      <Form.Label>{title}</Form.Label>
      {product.categories.map((item) => (
        <div>{item}</div>
      ))}
    </Form.Group>
  );
}
