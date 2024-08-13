"use client"

import Image from "next/image";
import { useState } from "react";
import axios from "axios";

interface CardProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    features: string[];
    description: string;
  };
}

export default function Card({ item }: CardProps) {

  const [showFeatures, setShowFeatures] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/payment", {
        name: item.name,
        price: item.price,
        image: item.image,
      });
      const ResponseData = await response.data;
      console.log(ResponseData);
      window.location.href = ResponseData.url;

    } catch (error) {
      console.error("error :", error);
      
    } finally {
      setLoading(false);
    }
  }

  const showFeaturesHandler = () => {
    setShowFeatures(!showFeatures);
  }

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden relative">
      <Image src={item.image} alt={item.name} width={200} height={100} layout="responsive" className="bg-gray-900 p-4 object-cover" />
      <div className="p-3 text-gray-600">
        <h3 className="font-bold text-xl">{item.name}</h3>
        <p className="text-gray-500">Price: {item.price}€</p>
        <button onClick={showFeaturesHandler} className="bg-blue-500 text-white px-3 py-1 rounded-md mt-2">Show Features</button>
        {showFeatures && (
          <div className="mt-2">
            <h4 className="font-bold">Features</h4>
            <ul>
              {item.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-2">{item.description}</p>

        <button 
        onClick={checkout}
        disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mt-2">
          {loading ? "Chargement..." : "Acheter"}
        </button>




      </div>
    </div>
  )
}