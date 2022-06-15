import type { NextPage } from "next";

// Internal Imports
import Layout from "../components/layoutComponents/Layout";
import CategorySection from "../components/categoryComponents/CategorySection";
import RecomendedSection from "../components/RecomendedSection";
import LoadMoreButton from "../components/LoadMoreButton";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <CategorySection />
        <RecomendedSection />
        <LoadMoreButton title="Load More" />
      </Layout>
    </>
  );
};

export default Home;
