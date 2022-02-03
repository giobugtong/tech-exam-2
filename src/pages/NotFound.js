import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <>
      <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center text-center">
      <div className="p-2">
        <h1 className="text-danger fw-bold">
            Error: 404
        </h1>
        <div className="fs-4">
            Sorry! Page not found.
        </div>
        <Link className="d-block mt-4" to="/">Back to Dashboard</Link>
      </div>
      </div>
  </>;
}
