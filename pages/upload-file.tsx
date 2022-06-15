import { NextPage } from "next/types";
import React from "react";
import FileUploadComponent from "../components/FileUploadComponent";
import Layout from "../components/layoutComponents/Layout";



const UploadFilePage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-8">
          <FileUploadComponent />
        </div>
      </Layout>
    </>
  );
}

export default UploadFilePage;
