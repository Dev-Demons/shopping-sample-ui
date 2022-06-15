import React from "react";

// Internal Imports
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div
        className="max-w-5xl mt-4 mb-100 mx-auto container"
        style={
          {
            overflowY: 'scroll',
            marginBottom: '50px'
          }
        }
      >
        {children}
      </div>
      <Footer />

    </>
  );
}

export default Layout;
