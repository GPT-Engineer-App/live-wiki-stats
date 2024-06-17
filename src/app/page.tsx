"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&meta=siteinfo&siprop=statistics&origin=*")
      .then((response) => response.json())
      .then((data) => setStats(data.query.statistics))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Wikipedia Statistics</h1>
      {error && <p className="text-red-500">Error fetching data: {error.message}</p>}
      {stats ? (
        <div className="bg-white shadow-md rounded p-6">
          <p className="text-lg"><strong>Articles:</strong> {stats.articles}</p>
          <p className="text-lg"><strong>Pages:</strong> {stats.pages}</p>
          <p className="text-lg"><strong>Edits:</strong> {stats.edits}</p>
          <p className="text-lg"><strong>Images:</strong> {stats.images}</p>
          <p className="text-lg"><strong>Users:</strong> {stats.users}</p>
          <p className="text-lg"><strong>Active Users:</strong> {stats.activeusers}</p>
          <p className="text-lg"><strong>Admins:</strong> {stats.admins}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}