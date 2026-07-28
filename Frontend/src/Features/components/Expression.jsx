import React from "react";

const Expression = ({ videoRef, emotion }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} autoPlay playsInline width={500} />

      <h2>{emotion}</h2>
    </div>
  );
};

export default Expression;
