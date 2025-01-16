import React from "react";

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <h1>Welcome to My App</h1>
    </header>
  );
};

// Optional inline styling
const headerStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",
  color: "white",
  textAlign: "center",
  padding: "1rem",
};

export default Header;