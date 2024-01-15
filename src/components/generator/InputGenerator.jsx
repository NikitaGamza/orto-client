import React from 'react';
import { InputType } from './InputTypes.enum';
import Input from '../admin/Input/Input';
import InputTextarea from '../admin/InputTextarea/InputTextarea';

export default function InputGenerator(props) {
  const { title, propName, type, getter, setter, product } = props;

  const setterOverwrited = (propName, value) => {
    setter((prevValue) => ({ ...prevValue, [propName]: value }));
  };

  switch (type) {
    case InputType.text:
      return (
        <Input
          title={title}
          product={product}
          setProduct={setterOverwrited}
          propName={propName}
          type={propName === 'price' ? 'number' : 'text'}
        />
      );
    case InputType.textarea:
      return (
        <InputTextarea
          title={title}
          getter={getter}
          setter={setterOverwrited}
          propName={propName}
        />
      );
  }

  return <div></div>;
}
