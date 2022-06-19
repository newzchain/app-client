import React from "react";

const ArticleCard = () => {
  return (
    <>
      <div className="flex md:flex-row justify-between mt-4">
        <div className="w-3/4 mr-4">
          <h2 className="text-left text-xl font-bold hover:underline">
            The Holcim Dilemmadas. An Explainer on why Holcim may be exiting
            India.
          </h2>
          <p className="text-left text-md">
            An Explainer on why Holcim may be exiting India.
          </p>
          <p className="text-left mt-4">Apr 28, 2022</p>
        </div>
        <div className="w-1/4">
          <img
            alt="article-img"
            style={{ width: "180px", height: "100px" }}
            src="https://cdn.finshots.app/images/2022/04/Holcimcement_1a-1.png"
          />
        </div>
      </div>
      <hr className="mt-2" />
    </>
  );
};

export default ArticleCard;
