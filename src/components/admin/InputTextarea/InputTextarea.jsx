import React from 'react';
import './InputTextarea.scss';

export default function InputTextarea(props) {
  const { getter, setter, title, propName } = props;
  return (
    <div>
      <label htmlFor="">{title}</label>
      <textarea
        className="textarea"
        name=""
        id=""
        onChange={(e) => setter(propName, e.target.value)}
        value={getter[propName]}
      ></textarea>
    </div>
  );
}
