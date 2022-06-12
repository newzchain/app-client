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

const PostComponent = ({ value, data, getContent }) => {
  useEffect(() => {
    getContent(value);
  }, []);
  const previewRef = useCallback(
    (preview) => {
      if (preview == null) return;

      preview.innerHTML = "";
      const editor = document.createElement("div");
      preview.append(editor);
      const q = new Quill(editor, {
        theme: "bubble",
        readOnly: true,
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      q.setContents(data);
    },
    [data]
  );
  console.log(data);

  return (
    <div>
      <div className="preview" ref={previewRef}></div>
    </div>
  );
};

export default PostComponent;
