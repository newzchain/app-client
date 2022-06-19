import Link from "next/link";
import { useContext, useEffect } from "react";
import AppContext from "../../context";

export default function Home({
  setProfileInfo,
  connectWallet,
  createProfile,
  onChangeCoverImg,
  onChangeProfileImg,
}) {
  const {
    account,
    profileInfo,
    isCreator,
    fetchedProfile,
    profileLoading,
    fetchedPosts,
  } = useContext(AppContext);

  return (
    <div className="mt-20">
      <div className="App">
        {account ? (
          <div>Wallet Address: ${account}</div>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>

      {isCreator ? (
        profileLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="mt-20 pt-4">
            <div className="coverImage md:mx-8 mx-5">
              <img
                alt="coverImg"
                className="w-full h-72 object-cover"
                src={fetchedProfile.coverImgUrl}
              />
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="profileImg">
                <div className="flex md:ml-16 ml-0 md:justify-start justify-center -mt-24">
                  <img
                    alt="pfp"
                    className="rounded-full relative w-[200px] h-[200px] object-cover lg:w-[250px] lg:h-[250px] lg:mb-4 border-4 border-white border-solid lg:bottom-4"
                    src={fetchedProfile.profileImgUrl}
                  />
                </div>
              </div>
              <div className="userDetails md:mx-8 mx-5 text-center md:text-left mt-5">
                <h1 className="text-3xl font-bold">
                  <a href={`mailto:${fetchedProfile.email}`} target="_blank">
                    {fetchedProfile.email}
                  </a>
                </h1>
                <p className="text-xl font-semibold px-2">
                  {fetchedProfile.bio}
                </p>
                <p className="text-xl font-semibold px-2">
                  <a href={fetchedProfile.personalSite} target="_blank">
                    {fetchedProfile.personalSite}
                  </a>
                </p>
                <p className="text-xl font-semibold px-2">
                  <a href={fetchedProfile.socialMedia} target="_blank">
                    {fetchedProfile.socialMedia}
                  </a>
                </p>

                <br />
                <Link href="/create-post">
                  <button className=" text-white cursor-pointer bg-red-500 px-3 py-2 font-bold rounded-md">
                    New Post
                  </button>
                </Link>
                <br />
              </div>
            </div>
            <div className="activity_card"></div>
            <div className="yourPosts mt-16">
              <div className="news_cards mt-10 md:px-8 px-0">
                <div className="flex flex-row">
                  <h1 className="text-2xl font-semibold md:text-left ml-8 mr-5 xs:text-center hover:underline">
                    Your Posts
                  </h1>
                  <hr className="flex-grow mt-4 mr-8 bg-black h-1" />
                </div>
                <div className="flex  justify-center items-center flex-wrap   mt-4">
                  {fetchedPosts.map((article, index) => {
                    console.log(article);

                    return (
                      <Link href={`/posts/${article.postId}`} key={index}>
                        <div
                          className="flex flex-col justify-evenly max-w-md bg-white py-0 rounded-xl space-y-2 my-4 hover:-translate-y-1 transition-all duration-500 pb-2 m-8 md:m-12"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          <div>
                            <img
                              className="w-full rounded-t-xl"
                              src={article.coverPhoto}
                              alt="motivation"
                            />
                            <h2 className="font-semibold text-gray-900 text-xl text-left px-2 hover:underline">
                              {article.title}
                            </h2>
                            <p className="text-gray-900 text-base text-left px-2">
                              {article.publishedTime}
                            </p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      ) : profileLoading ? (
        <h1>Loading...</h1>
      ) : (
        <form action="">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => {
              setProfileInfo({ ...profileInfo, email: e.target.value });
            }}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Social Media Link"
            onChange={(e) => {
              setProfileInfo({ ...profileInfo, socialMedia: e.target.value });
            }}
            required
          />
          <br />
          <input
            type="text"
            placeholder="Personal Website"
            onChange={(e) => {
              setProfileInfo({ ...profileInfo, personalSite: e.target.value });
            }}
            required
          />
          <br />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => {
              setProfileInfo({ ...profileInfo, bio: e.target.value });
            }}
            required
          ></textarea>
          <br />
          <input
            type="file"
            onChange={(e) => {
              onChangeProfileImg(e);
            }}
            required
          />
          {profileInfo.profileImgUrl && (
            <img
              src={profileInfo.profileImgUrl}
              alt="profile Pic"
              className="w-[300px] h-[150px] object-cover"
            />
          )}
          <br />
          <input
            type="file"
            onChange={(e) => {
              onChangeCoverImg(e);
            }}
            required
          />
          {profileInfo.coverImgUrl && (
            <img
              src={profileInfo.coverImgUrl}
              alt="Cover Image"
              className="w-[300px] h-[150px] object-cover"
            />
          )}
          <br />
          <button
            type="submit"
            onClick={(e) => {
              createProfile(e);
            }}
            className="bg-black text-white px-2 py-1 rounded-lg mt-4"
          >
            Create profile
          </button>
        </form>
      )}
    </div>
  );
}
