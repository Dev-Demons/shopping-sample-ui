import type { NextPage } from "next";
import Layout from "../components/layoutComponents/Layout";


const Home: NextPage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 bg-white h-80 ">
        <>Payment Methods</>
      </div>
    </Layout>
  );
};

export default Home;
