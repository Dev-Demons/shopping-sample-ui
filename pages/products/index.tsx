import React from "react";
import { NextPage } from "next/types";

// Intenral Imports
import ViewUploadedProducts from "../../components/ViewProductsComponent";
import Layout from "../../components/layoutComponents/Layout";


const ProductsPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-20">
          <ViewUploadedProducts />
        </div>
      </Layout>
    </>
  );
}

export default ProductsPage;
