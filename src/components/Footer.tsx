import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2025 My App. All rights reserved.</p>
    </footer>
  );
};

// Optional inline styling
const footerStyle: React.CSSProperties = {
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  padding: "0.1rem",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
};

export default Footer;
