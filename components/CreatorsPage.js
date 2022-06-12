import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const CreatorsPage = ({
  content,
  createNewPost,
  setContent,
  setCreatedPosts,
  createdPosts,
  onChangePostsCoverImg,
}) => {
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      setContent({ ...oldDelta, delta });
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [quill]);
  console.log(content);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });
    q.setText("Loading...");
    setQuill(q);
  }, []);

  const printOutContent = (e) => {
    e.preventDefault();

    createNewPost(e);
    setContent("");
    setCreatedPosts({
      title: "",
      coverPhoto: "",
      tag1: "",
      tag2: "",
      tag3: "",
    });
  };

  return (
    <div className="px-8 my-24 bg-white">
      <h1 className="text-2xl font-bold mb-8 text-center">Text Editor</h1>
      <form action="">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setCreatedPosts({
              ...createdPosts,
              title: e.target.value,
            })
          }
        />
        <br />
        <input type="file" onChange={(e) => onChangePostsCoverImg(e)} />
        {createdPosts.coverPhoto ? (
          <img src={createdPosts.coverPhoto} alt="" />
        ) : (
          ""
        )}
        <br />
        <div className="container" ref={wrapperRef}></div>

        <br />
        <br />
        <div className="text-right">
          <input
            type="text"
            placeholder="tag1"
            onChange={(e) =>
              setCreatedPosts({ ...createdPosts, tag1: e.target.value })
            }
          />
          <br />
          <input
            type="text"
            placeholder="tag2"
            onChange={(e) =>
              setCreatedPosts({ ...createdPosts, tag2: e.target.value })
            }
          />
          <br />
          <input
            type="text"
            placeholder="tag3"
            onChange={(e) =>
              setCreatedPosts({ ...createdPosts, tag3: e.target.value })
            }
          />
          <br />
          <button
            type="submit"
            className="mt-8 border-2 hover:bg-indigo-500 hover:text-white border-indigo-500 px-4 py-2 transition-all"
            onClick={(e) => {
              printOutContent(e);
            }}
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatorsPage;
