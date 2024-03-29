import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "../../context";
import ReactHtmlParser from "react-html-parser";

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
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          <div>
            <img
              src={fetchedProfile.coverImgUrl}
              alt=""
              className="w-[300px] h-[150px] relative z-20"
            />
            <br />
            <img
              src={fetchedProfile.profileImgUrl}
              alt=""
              className="w-[100px] h-[100px] rounded-full relative z-40 bottom-24 left-4 border-4 border-white border-solid"
            />
            <br />
            <div className="relative bottom-28">
              <a href={`mailto:${fetchedProfile.email}`} target="_blank">
                {fetchedProfile.email}
              </a>
              <p>{fetchedProfile.bio}</p>
              <a href={fetchedProfile.personalSite} target="_blank">
                {fetchedProfile.personalSite}
              </a>
              <br />
              <a href={fetchedProfile.socialMedia} target="_blank">
                {fetchedProfile.socialMedia}
              </a>
            </div>
            <br />
            <Link href="/create-post">
              <p className=" text-red-500 cursor-pointer">Create a new post</p>
            </Link>
            <br />
            <h3>YOUR POSTS</h3>
            {fetchedPosts.map((item, index) => {
              return (
                <Link href={`posts/${item.postId}`} key={index}>
                  <div className="w-[300px]  p-2 border-2 border-black border-solid m-4 flex flex-wrap">
                    <img
                      src={item.coverPhoto}
                      alt=""
                      className="w-[300px] h-[150px] object-cover"
                    />
                    <br />
                    <h3>{item.title}</h3>
                    <br />
                    <p>{item.publishedTime}</p>
                    <br />
                    {item.content ? (
                      <div>
                        {ReactHtmlParser(item.content.substring(0, 7) + "....")}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              );
            })}
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
