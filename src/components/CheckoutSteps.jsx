import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Вход</Col>
      <Col className={props.step2 ? 'active' : ''}>Адрес</Col>
      <Col className={props.step3 ? 'active' : ''}>Оформление</Col>
    </Row>
  );
}
