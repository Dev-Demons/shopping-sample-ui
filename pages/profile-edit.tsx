import { NextPage } from "next/types";
import React from "react";

// Internal Imports
import Layout from "../components/layoutComponents/Layout";
import ProfileEditComponent from "../components/ProfileEditComponent";

const ProfileEditPage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-8 mb-8">
          <ProfileEditComponent />
        </div>
      </Layout>
    </>
  );
}
export default ProfileEditPage;