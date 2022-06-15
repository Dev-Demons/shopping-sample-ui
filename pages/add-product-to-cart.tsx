import { NextPage } from "next/types";
import React from "react";
import Layout from "../components/layoutComponents/Layout";

// Internal Imports
import AddShoppingComponent from "../components/shopping/AddShoppingComponent";



const AddToCartPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="max-w-5xl  mt-4 mx-auto ">
          <AddShoppingComponent />
        </div>
      </Layout>
    </>
  );
};

export default AddToCartPage;
