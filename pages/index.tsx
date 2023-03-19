/* eslint-disable @next/next/no-img-element */
// import { createClient } from "@supabase/supabase-js";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HeroHome from "components/HeroHome/HeroHome";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Triviabot</title>
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden bg-slate-900 text-white">
        <Header />
        <main className="flex-grow">
          <HeroHome />
          {/* <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter /> */}
        </main>

        {/* {/* <Banner /> */}

        <Footer />
      </div>
    </>
  );
};

export default Home;
