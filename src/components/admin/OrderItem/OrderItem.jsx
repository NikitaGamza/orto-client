import React, { useState } from 'react';

export default function OrderItem(item) {
  const [orderItem, setOrderItem] = useState(item);
  return (
    <div>
      <span>{orderItem.clientFIO}</span>
    </div>
  );
}
