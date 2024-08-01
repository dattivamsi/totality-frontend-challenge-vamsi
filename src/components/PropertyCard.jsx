import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #2a9d8f;
`;

const PropertyCard = ({ property }) => {
  const { addToCart } = useCart();

  return (
    <Card>
      <img
        src={property?.coverPhoto?.url}
        alt={property.title}
        style={{ width: "100%" }}
      />
      <Title>{property.title}</Title>
      <p>{property.description}</p>
      <Price>${`${property.price}/${property?.rentFrequency}`}</Price>
      <button onClick={() => addToCart(property)}>Book Now</button>
    </Card>
  );
};

export default PropertyCard;
