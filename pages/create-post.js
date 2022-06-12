import Link from "next/link";
import { useContext } from "react";
import AppContext from "../context";
import React from "react";
import dynamic from "next/dynamic";

const DynamicCreatorsPage = dynamic(
  () => import("../components/CreatorsPage"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function CreatePost({
  connectWallet,
  createNewPost,
  setContent,
  setCreatedPosts,
  onChangePostsCoverImg,
}) {
  const { account, content, isCreator, profileLoading, createdPosts } =
    useContext(AppContext);

  return (
    <div>
      {account ? (
        <div>Wallet Address: ${account}</div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {isCreator ? (
        profileLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <DynamicCreatorsPage
              content={content}
              createNewPost={createNewPost}
              setContent={setContent}
              setCreatedPosts={setCreatedPosts}
              createdPosts={createdPosts}
              onChangePostsCoverImg={onChangePostsCoverImg}
            />
            <br />
          </div>
        )
      ) : profileLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Link href="/">Create An account</Link>
      )}
    </div>
  );
}
