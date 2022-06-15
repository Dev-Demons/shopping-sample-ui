import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

// Internal Imports
import { useAppDispatch } from "../features/hooks";
import { paymentProcess } from "../features/userSlice";

export const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }; // Handle form submission.
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card
    });
    await dispatch(paymentProcess({ payment_method_id: paymentMethod.id }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div role="alert">{error}</div>
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
};
