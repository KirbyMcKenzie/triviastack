import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import type { NextPage } from "next";
import Head from "next/head";

const Support: NextPage = () => {
  return (
    <>
      <Head>
        <title>TriviaStack - Support</title>
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden bg-slate-900 text-white">
        <Header />
        <main className="flex-grow max-w-4xl mx-auto px-8 mt-24">
          <h1 className="text-3xl font-bold mb-8">Support</h1>
          <div>
            We&apos;re here to help you get the most out of your trivia
            experience. If you encounter any issues, have questions, or just
            need some assistance, don&apos;t hesitate to reach out!
          </div>
          <h2 className="text-xl font-bold my-5">How to Get Support</h2>
          <div>
            If you run into any problems or have questions, feel free to email
            us at{" "}
            <a
              className="text-blue-300 font-medium hover:underline"
              href="mailto:support@triviastack.com"
            >
              support@triviastack.com
            </a>
            , we&apos;ll do our best to get back to you within 24 hours.
          </div>
          <h2 className="text-xl font-bold my-5">Feedback</h2>
          <div>
            We value your feedback! Whether it&apos;s a suggestion for
            improvement, a feature request, or just to share your thoughts,
            we&apos;re all ears. Drop us a line at{" "}
            <a
              className="text-blue-300 font-medium hover:underline"
              href="mailto:feedback@triviastack.com"
            >
              feedback@triviastack.com
            </a>{" "}
            or use the <strong>💡 Give Product Feedback</strong> button in
            Slack.
          </div>
          <h2 className="text-xl font-bold my-5">Stay Connected</h2>
          <div>
            For the latest updates, news, and announcements, follow us on{" "}
            <a
              className="text-blue-300 font-medium hover:underline"
              href="https://twitter.com/triviastack"
              target="#"
            >
              Twitter.
            </a>{" "}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Support;
