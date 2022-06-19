import Link from "next/link";
import { useContext, useEffect } from "react";
import AppContext from "../context";
import React from "react";
import dynamic from "next/dynamic";
import Router from "next/router";
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

  useEffect(() => {
    if (!isCreator) {
      Router.push(`/profile/${account}`);
    }
  }, [isCreator]);

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
