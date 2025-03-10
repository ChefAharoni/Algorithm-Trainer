import React from "react";
import { Link } from "wouter";

// Helper component to ensure links work with hash routing on GitHub Pages
const HashLink = ({ href, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.hash = href;
  };

  return <Link href={href} {...props} onClick={handleClick} />;
};

export default HashLink;
