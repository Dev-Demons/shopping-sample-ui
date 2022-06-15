import { NextPage } from "next/types";
import React from "react";

// Internal Imports
import Layout from "../components/layoutComponents/Layout";
import ViewShoppingComponent from "../components/shopping/ViewShoppingComponent";



const ShoppingPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="max-w-5xl  mt-4 mx-auto ">
          <ViewShoppingComponent />
        </div>
      </Layout>
    </>
  );
};

export default ShoppingPage;
