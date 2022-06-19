import Link from "next/link";
import { useContext } from "react";
import AppContext from "../context";
import NewsCard from "../components/NewsCard";
import ArticleCard from "../components/ArticleCard.js";
import SubscribeComp from "../components/SubscribeComp.js";
import Carousel from "../components/Carousel";

export default function Home({ connectWallet }) {
  const { account } = useContext(AppContext);

  const news = [
    {
      title:
        "American Bitcoin Miner Aims to Sell USD 30M Equipment in Russia to Avoid Sanctions",
      description:
        "In a thread on Reddit which has garnered nearly 10,000 replies, people who go to the gym every day (or practice some kind of other daily skill) have been sharing the things that help them stay motivated and proactive in keeping up with their good habits.",
      img: "https://i0.wp.com/thenewschain.co/wp-content/uploads/2022/04/BTCUSDT_2022-04-24_18-05-56-7xtcEj.png?resize=350%2C250&ssl=1",
    },
    {
      title: "Bitcoin and Ethereum Keep Trending Lower, APE and GMT Outperform",
      description:
        "In a thread on Reddit which has garnered nearly 10,000 replies, people who go to the gym every day (or practice some kind of other daily skill) have been sharing the things that help them stay motivated and proactive in keeping up with their good habits.",
      img: "https://i0.wp.com/thenewschain.co/wp-content/uploads/2022/04/1-IeZmbm.jpeg?resize=350%2C250&ssl=1",
    },
    {
      title: "Bitcoin [BTC]: This may be a sign of what’s coming next",
      description:
        "In a thread on Reddit which has garnered nearly 10,000 replies, people who go to the gym every day (or practice some kind of other daily skill) have been sharing the things that help them stay motivated and proactive in keeping up with their good habits.",
      img: "https://i0.wp.com/thenewschain.co/wp-content/uploads/2022/04/BTCUSDT_2022-04-24_18-05-56-7xtcEj.png?resize=350%2C250&ssl=1",
    },
    {
      title: "Nigerian Government Minister Calls for Regulation of Crypto",
      description:
        "In a thread on Reddit which has garnered nearly 10,000 replies, people who go to the gym every day (or practice some kind of other daily skill) have been sharing the things that help them stay motivated and proactive in keeping up with their good habits.",
      img: "https://i0.wp.com/thenewschain.co/wp-content/uploads/2021/12/shutterstock_2048594132-768x432-H1HCZi-XoEdgD.png?resize=350%2C250&ssl=1",
    },
  ];

  return (
    <>
      <div className="flex flex-col pt-20 mt-2">
        <div className="banner px-3">
          <Carousel />
        </div>
        <div className="news_cards mt-10 md:px-8 px-0">
          <div className="flex flex-row">
            <h1 className="text-2xl font-semibold md:text-left ml-8 mr-5 xs:text-center">
              Trending News
            </h1>
            <hr className="flex-grow mt-4 mr-8 bg-black h-1" />
          </div>
          <div className="flex  justify-center items-center flex-wrap  m-4">
            {news.map((article, index) => {
              return (
                <div key={index}>
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    img={article.img}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="news_articles mt-10 md:px-8 px-0">
          <div className="flex md:flex-row mx-8 md:space-x-12 xs:space-x-0 flex-col">
            <div className="md:w-1/2 xs:w-full">
              <h1 className="text-2xl md:text-left font-semibold mb-2 text-center">
                Markets
              </h1>
              <hr className="bg-black h-1" />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
            <div className="md:w-1/2 xs:w-full md:mt-0 mt-8">
              <h1 className="text-2xl md:text-left text-center font-semibold mb-2">
                Top Articles
              </h1>
              <hr className="bg-black h-1" />
              <ArticleCard />
              <ArticleCard />
              <ArticleCard />
            </div>
          </div>
        </div>
        <div className="news_cards mt-10 md:px-8 px-0">
          <div className="flex flex-row">
            <h1 className="text-2xl font-semibold md:text-left ml-8 mr-5 xs:text-center">
              Newschain Money
            </h1>
            <hr className="flex-grow mt-4 mr-8 bg-black h-1" />
          </div>
          <div className="flex  justify-center items-center flex-wrap  m-4">
            {news.map((article, index) => {
              return (
                <div key={index}>
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    img={article.img}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="subscribe_us my-10 md:px-8 px-0">
          <SubscribeComp />
        </div>

        <div className="floating_button fixed bottom-4 right-4 tooltip ">
          {account ? (
            <Link href={`profile/${account}`}>
              <button className="text-white bg-orange-500 p-4 font-bold rounded-full hover:shadow-lg transition-all border-0 hover:border-2 hover:bg-white hover:text-orange-500 hover:border-orange-500">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          ) : (
            <button
              className="text-white bg-orange-500 p-4 font-bold rounded-full hover:shadow-lg transition-all border-0 hover:border-2 hover:bg-white hover:text-orange-500 hover:border-orange-500"
              onClick={connectWallet}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          )}

          <span className="tooltiptext">
            {account ? (
              <Link href={`profile/${account}`}>Your Profile</Link>
            ) : (
              <p onClick={connectWallet}>Connect Wallet</p>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
