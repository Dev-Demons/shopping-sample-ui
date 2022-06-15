import { NextPage } from "next/types";
import React from "react";

// Internal Imports
import Layout from "../components/layoutComponents/Layout";
import RegistrationTabs from "../components/registrationComponents/RegistrationTabs";



const RegistrationPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-8">
          <RegistrationTabs />
        </div>
      </Layout>
    </>
  );
}

export default RegistrationPage;
