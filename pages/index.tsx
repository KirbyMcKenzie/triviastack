import FeatureSection from "components/FeatureSection";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import HeroHome from "components/HeroHome/HeroHome";
import type { NextPage } from "next";
import NextHead from "next/head";
import Image from "next/image";

const Head = () => (
  <NextHead>
    <title>TriviaStack</title>
    <meta
      name="description"
      content="Keep your team engaged with Trivia for Slack."
    />
    <meta property="og:title" content="TriviaStack" />
    <meta
      property="og:description"
      content="Keep your team engaged with Trivia for Slack."
    />
    <meta property="og:image" content="/og-thumbnail.png" />
  </NextHead>
);

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mx-auto text-center z-10">
          <HeroHome />

          <div className="max-w-[1200px] mx-auto px-6">
            <div>
              <div className="my-24 md:mt-48 md:mb-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="New Categories Every Week"
                  subtitle="Keep up with events and current affairs, with an ever changing set of categories and questions."
                  contentNode={
                    <div className=" bg-blue-600  rounded-3xl p-5 relative shadow-3xl">
                      <Image
                        alt="Create trivia modal"
                        src="/select-categories.png"
                        height={526}
                        width={474}
                      />
                    </div>
                  }
                />
              </div>

              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Keep up with News"
                  subtitle="Stay in the know with new current affair questions everyday. Keeping your trivia sessions fresh and your team in sync with the latest headlines and trends."
                  contentSide="left"
                  contentNode={
                    <div className="p-12 bg-white rounded-3xl shadow-3xl">
                      <div className="text-8xl hover:scale-110 transition-all ease-in-out">
                        {"🗞️"}
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Scheduled Trivia"
                  subtitle="Coming soon - Set up your trivia games to run on any day of the week at your preferred time."
                  contentNode={
                    <div className="p-12 bg-white rounded-3xl shadow-3xl">
                      <div className="text-8xl hover:scale-110 transition-all ease-in-out">
                        {"⏰"}
                      </div>
                    </div>
                  }
                />
              </div>

              <div className="my-24 md:my-64" data-aos="zoom-y-out">
                <FeatureSection
                  title="Install in Seconds"
                  subtitle="Quick, simple and free. No credit card required."
                  contentSide="left"
                  contentNode={
                    <div className=" bg-blue-600  rounded-3xl p-5 relative shadow-3xl">
                      <Image
                        alt="Create trivia modal"
                        src="/onboarding-dm.png"
                        height={142}
                        width={696}
                      />
                    </div>
                  }
                />
              </div>

              <h2
                className="text-4xl md:text-6xl font-extrabold mt-32"
                data-aos="zoom-y-out"
              >
                {"Explore Game Modes"}
              </h2>
              <p className="mt-4 mb-12 text-blue-600 text-xl font-normal tracking-wide md:tracking-wider">
                {
                  "Whether you're remote, hybrid or in-office, there's a mode that suits everyone"
                }
              </p>

              <div
                className="flex flex-col md:flex-row md:space-x-4 row md:mb-40"
                data-aos="zoom-y-out"
              >
                <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                  <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                    {"🎉"}
                  </div>
                  <h3 className="text-4xl font-extrabold my-8">
                    {"Team Trivia"}
                  </h3>
                  <p className="text-xl font-normal">
                    Answer questions together as a team, anyone in the channel
                    can participate.
                  </p>
                </div>
                <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                  <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                    {"🏆"}
                  </div>
                  <h3 className="text-4xl font-extrabold my-8">
                    {"Head to Head"}
                  </h3>
                  <p className="text-xl font-normal">
                    Score points based on the difficulty of the questions. Those
                    with the highest points win.
                  </p>
                </div>
                <div className="flex flex-col justify-center w-full bg-gray-100 px-8 rounded-[46px] my-3 md:my-12 min-h-[380px]">
                  <div className="text-8xl hover:scale-125 transition-all ease-in-out">
                    {"💃"}
                  </div>
                  <h3 className="text-4xl font-extrabold my-8">{"Solo"}</h3>
                  <p className="text-xl font-normal">
                    Play in your direct messages at your own pace. Perfect for
                    practice or small breaks.
                  </p>
                </div>
              </div>

              {/* <div className="mt-18 mb-64 md:my-18" data-aos="zoom-y-out">
              <div
                className="flex flex-col md:flex-row justify-between items-center w-full p-8  md:p-16 min-h-[500px] rounded-[46px] my-12"
                style={{ backgroundColor: "#F7F7F7" }}
              >
                <div className="max-w-[466px] md:text-left">
                  <h2 className="text-4xl md:text-5xl font-extrabold">
                    {"Happy Teams are Productive Teams"}
                  </h2>
                  <p className="text-xl font-normal  mt-6">
                    According to HBR, companies with higher employee engagement
                    scores saw higher productivity, profitability, and customer
                    ratings.
                  </p>
                  <a
                    href="https://hbr.org/2013/07/employee-engagement-does-more"
                    target="_blank"
                    rel="noreferrer"
                    className="block my-6 text-blue-600 text-xl hover:underline"
                  >
                    Learn more
                  </a>
                </div>
                <div>
                  <Image
                    alt="Create trivia modal"
                    src="/trivia-reaction.png"
                    height={362}
                    width={582}
                  />
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <div
        className="absolute -top-[22rem] md:top-0 left-0 right-0 bottom-0 opacity-70"
        data-aos="zoom-y-out"
        data-aos-delay="800"
      >
        <svg
          width="100%"
          height="1774"
          viewBox="0 0 1511 1774"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_487_2)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1343.32 339.196C1590.7 412.639 1717.88 597.092 1675.13 741.112C1629.93 893.345 1431.16 1001.77 1169.66 924.141C882.872 839 698.31 632.794 747.876 465.835C795.229 306.329 1069.33 257.856 1343.32 339.196Z"
              fill="url(#paint0_linear_487_2)"
              fill-opacity="0.5"
            />
          </g>
          <g filter="url(#filter1_f_487_2)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M307.898 915.241C534.227 982.433 650.58 1151.19 611.463 1282.95C570.116 1422.22 388.26 1521.42 149.024 1450.4C-113.354 1372.5 -282.206 1183.85 -236.859 1031.1C-193.537 885.172 57.2319 840.825 307.898 915.241Z"
              fill="url(#paint1_linear_487_2)"
              fill-opacity="0.5"
            />
          </g>
          <g filter="url(#filter2_f_487_2)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M867.975 588.903C1140.36 669.768 1280.45 872.676 1233.43 1031.05C1183.73 1198.46 964.931 1317.63 677.01 1232.16C361.237 1138.41 157.966 911.557 212.472 727.955C264.546 552.55 566.298 499.343 867.975 588.903Z"
              fill="url(#paint2_linear_487_2)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_487_2"
              x="439.842"
              y="0.372742"
              width="1543.45"
              height="1249.54"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_487_2"
              />
            </filter>
            <filter
              id="filter1_f_487_2"
              x="-544.209"
              y="579.723"
              width="1463.15"
              height="1194.25"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_487_2"
              />
            </filter>
            <filter
              id="filter2_f_487_2"
              x="-96.3516"
              y="246.109"
              width="1638.76"
              height="1314.45"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_487_2"
              />
            </filter>
            <linearGradient
              id="paint0_linear_487_2"
              x1="1294.28"
              y1="324.638"
              x2="1120.62"
              y2="909.583"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E85526" />
              <stop offset="1" stop-color="#F6CE3E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_487_2"
              x1="263.035"
              y1="901.923"
              x2="104.161"
              y2="1437.08"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#E85526" />
              <stop offset="1" stop-color="#5D7BD1" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_487_2"
              x1="813.982"
              y1="572.874"
              x2="623.017"
              y2="1216.13"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#2658E8" />
              <stop offset="1" stop-color="#5D7BD1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default Home;
