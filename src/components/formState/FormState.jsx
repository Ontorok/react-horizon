import React, { useState, useActionState } from "react";
import { useFormState } from "react-dom";

const addToCard = (_state, formData) => {
  const payload = {};
  formData.forEach((value, key) => {
    payload[key] = value;
  });
  return payload.itemID === "1" ? "Added to Cart" : "Out of Stock";
};

const Cart = ({ itemTitle, itemID }) => {
  const [message, formAction] = useActionState(addToCard, null);

  return (
    <form
      action={formAction}
      className="bg-white border border-gray-300 rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-bold mb-4">{itemTitle}</h2>
      <input type="hidden" name="itemID" value={itemID} />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add to Cart
      </button>
      {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}
    </form>
  );
};

export default function FormState() {
  return (
    <>
      <Cart itemID="1" itemTitle={"iPhone 16"} />
      <Cart itemID="2" itemTitle={"Nokia 4.2"} />
    </>
  );
}
