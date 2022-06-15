import React from "react";
import { NextPage } from "next/types";

// Internal Imports
import ViewVideosComponent from "../components/VideosComponent/ViewVideosComponent";
import Layout from "../components/layoutComponents/Layout";



const VideosPage: NextPage = () => {
  return (
    <>
      <div className="mt-20">
        <Layout>
          <ViewVideosComponent />
        </Layout>
      </div>
    </>
  );
}

export default VideosPage;
