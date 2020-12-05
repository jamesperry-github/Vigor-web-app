import React from 'react';

function loadSpinner() {
  return (
    <div
      style={{
        textAlign: "center"
      }}>
      <div
        className="spinner-border"
        style={{
          width: "3rem",
          height: "3rem"
        }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export {
  loadSpinner,
}