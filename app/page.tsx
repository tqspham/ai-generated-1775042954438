"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://loremflickr.com/320/240/nature,dog");
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        setImageUrl(response.url);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Nature and Dog"
          width={320}
          height={240}
          className="rounded shadow-lg"
        />
      )}
    </div>
  );
}