"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomerData {
  name: string;
  email: string;
}

export default function Success() {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axios.get(`/api/success`, { params: { token } })
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error: Error) => console.error(error));
    }
  }, [token]);

  if (!token) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-3 text-center">
      <h1 className="text-2xl">
        <span role="img" aria-label="checkmark">✅ </span>
        Paiement réussi !!</h1>
      {customerData ? (
        <div className="text-xl">
          <p>Merci pour votre abonnement, {customerData.name}</p>
          <p>Votre paiement a été effectué avec succès.</p>
          <p>Votre email: {customerData.email}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}