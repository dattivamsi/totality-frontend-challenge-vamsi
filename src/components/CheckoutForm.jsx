import React from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 20px;
`;

const CheckoutForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      paymentDetails: '',
    },
    onSubmit: values => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </div>
        <div>
          <label>Payment Details</label>
          <input
            type="text"
            name="paymentDetails"
            onChange={formik.handleChange}
            value={formik.values.paymentDetails}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
};

export default CheckoutForm;
