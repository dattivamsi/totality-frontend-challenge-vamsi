import React from 'react';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 20px;
`;

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, getTotal } = useCart();

  return (
    <CartContainer>
      {cart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      ))}
      <h3>Total: ${getTotal()}</h3>
    </CartContainer>
  );
};

export default Cart;
