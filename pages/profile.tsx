import React from "react";
import { NextPage } from "next/types";

// Internal Imports
import ProfileComponent from "../components/ProfileComponent";
import Layout from "../components/layoutComponents/Layout";



const ProfilePage: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="mt-8 mb-8">
          <ProfileComponent />
        </div>
      </Layout>
    </>
  );
}

export default ProfilePage;