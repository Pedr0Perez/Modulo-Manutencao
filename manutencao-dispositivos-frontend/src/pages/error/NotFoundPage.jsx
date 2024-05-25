import React, { useEffect } from "react";

export default function NotFoundPage() {
  useEffect(() => {
    console.error(`GET ${location.href} 404 (Not Found)`);
    console.error(
      "Failed to load resource: the server responded with a status of 404 ()"
    );
  }, []);

  return (
    <div className="page">
      <p>
        404. Isto é um erro. <br /> A URL solicitada "{location.pathname}" não
        localizada neste servidor. Isso é tudo que sabemos.
      </p>
    </div>
  );
}
