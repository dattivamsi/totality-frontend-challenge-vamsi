import React from 'react';
import styled from 'styled-components';

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const CartItem = ({ item, removeFromCart, increaseQuantity, decreaseQuantity }) => (
  <CartItemContainer>
    <div>
      <h4>{item.title}</h4>
      <p>${item.price} x {item.quantity}</p>
    </div>
    <div>
      <button onClick={() => decreaseQuantity(item.id)}>-</button>
      <button onClick={() => increaseQuantity(item.id)}>+</button>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  </CartItemContainer>
);

export default CartItem;
