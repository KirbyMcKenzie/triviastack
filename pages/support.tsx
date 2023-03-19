import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import type { NextPage } from "next";
import Head from "next/head";

const Support: NextPage = () => {
  return (
    <>
      <Head>
        <title>Triviabot - Support</title>
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden bg-slate-900 text-white">
        <Header />
        <main className="flex-grow max-w-5 mx-auto text-left"></main>
        <Footer />
      </div>
    </>
  );
};

export default Support;
