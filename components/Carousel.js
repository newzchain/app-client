import React from "react";

const Carousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  ];
  const carouselText = [
    "American Bitcoin Miner Aims to Sell USD 30M Equipment in Russia to Avoid Sanctions",
    "Bitcoin and Ethereum Keep Trending Lower, APE and GMT Outperform",
    "Nigerian Government Minister Calls for Regulation of Crypto",
  ];
  const [Text, setText] = React.useState(0);
  const [currentImage, setCurrentImage] = React.useState(0);
  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i) => {
    setCurrentImage(i);

    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = images.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
      setText(0);
    } else {
      scrollToImage(currentImage + 1);
      setText((prevText) => prevText + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
      setText(2);
    } else {
      scrollToImage(currentImage - 1);
      setText((prevText) => prevText - 1);
    }
  };

  const arrowStyle =
    "absolute text-white text-2xl bg-black h-10 w-10 rounded-full opacity-75 flex items-center justify-center";

  const sliderControl = (isLeft) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "bottom-0 left-2" : "right-2"}`}
      style={{ top: "40%", zIndex: 5 }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        )}
      </span>
    </button>
  );

  return (
    <div className="px-1 flex justify-center items-center">
      <div className="relative w-full">
        <div className="carousel">
          {sliderControl(true)}
          {images.map((img, i) => (
            <div
              className="w-full flex-shrink-0 overflow-y-hidden img_container"
              key={img}
              ref={refs[i]}
            >
              <img src={img} className="w-full object-contain" alt="img" />
            </div>
          ))}
          <div className="absolute w-full h-full">
            <div className="absolute w-full h-full bg-black opacity-25"></div>
            <div className="content_div">
              <p className="font-bold text-white opacity-95 text-xl">
                {carouselText[Text]}
              </p>
              <p className="font-bold text-white opacity-95 text-md">
                27 May, 2022
              </p>
            </div>
          </div>
          {sliderControl()}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
