import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../../context";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicCreatorsPage = dynamic(
  () => import("../../components/PostComponent"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);
export default function Post({ setData, getContent }) {
  const { account, isCreator, profileLoading, fetchedPosts, data } =
    useContext(AppContext);

  const router = useRouter();
  const currentPostId = router.query.postId;

  return (
    <div>
      hello {currentPostId}
      <p>Account: {account}</p>
      {isCreator ? (
        profileLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-[300px]  p-2  m-4 flex flex-wrap">
            <img
              src={fetchedPosts[currentPostId].coverPhoto}
              alt=""
              className="w-[300px] h-[150px] object-cover"
            />
            <br />
            <h3>{fetchedPosts[currentPostId].title}</h3>
            <br />
            <p>{fetchedPosts[currentPostId].publishedTime}</p>
            <br />
            <p>
              #{fetchedPosts[currentPostId].tags[0]} #
              {fetchedPosts[currentPostId].tags[1]} #
              {fetchedPosts[currentPostId].tags[2]}
            </p>

            {fetchedPosts[currentPostId].content ? (
              <DynamicCreatorsPage
                value={fetchedPosts[currentPostId]}
                profileLoading={profileLoading}
                data={data}
                setData={setData}
                getContent={getContent}
              />
            ) : (
              ""
            )}
          </div>
        )
      ) : profileLoading ? (
        <p>Loading...</p>
      ) : (
        <Link href="/">Create an account</Link>
      )}
    </div>
  );
}
