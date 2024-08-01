import React from 'react';
import CheckoutForm from './CheckoutForm';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  padding: 20px;
`;

const Checkout = () => {
  const { getTotal } = useCart();

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      <p>Total Cost: ${getTotal()}</p>
      <CheckoutForm />
    </CheckoutContainer>
  );
};

export default Checkout;
