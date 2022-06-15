import { NextPage } from "next/types";
import React from "react";

// Internal Imports
import Layout from "../../components/layoutComponents/Layout";
import { REQUEST_STATUS } from "../../constants/enums";

import {
  selectUploadData,
  selectUploadError,
  selectUploadStatus
} from "../../features/fileSlice";

import { 
  useAppDispatch, 
  useAppSelector 
} from "../../features/hooks";




const OwnedProductsPage: NextPage = () => {

  const dispatch = useAppDispatch();

  const uploadStatus: REQUEST_STATUS = useAppSelector(selectUploadStatus);
  const uploadError = useAppSelector(selectUploadError);
  const uploadData = useAppSelector(selectUploadData);

  return (
    <>
      <Layout>
        <div className="mt-20">
          <OwnedProductsList />
        </div>
      </Layout>
    </>
  );
}

export default OwnedProductsPage;


// Components
const OwnedProductsList = () => {
  return (
    <>
      <div className="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
        Owned Products List
      </div>
    </>
  )
}