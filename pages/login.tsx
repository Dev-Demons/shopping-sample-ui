import { NextPage } from "next";
import React from "react";

// Internal Imports
import LoginComponent from "../components/LoginComponent";
import Layout from "../components/layoutComponents/Layout";

const LoginPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-20">
          <LoginComponent />
        </div>
      </Layout>
    </>
  );
}

export default LoginPage;
