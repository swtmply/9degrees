import { convertToRaw } from "draft-js";
import dynamic from "next/dynamic";
import React from "react";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  {
    ssr: false,
  }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditorContainer({
  editorState,
  setEditorState,
  data,
  setData,
}) {
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);

    // converting raw to json for upload sa DB
    setData({
      ...data,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });

    // for editing raw data
    // convertFromRaw(JSON.parse(this.props.rawState))
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName="flex sticky top-0 z-40 !rounded-t-md"
      editorClassName="px-4 bg-[#fff] shadow-lg min-h-[300px] max-h-[300px] rounded-b-md"
      wrapperClassName="bg-transparent rounded-md m-0"
      toolbar={{
        options: ["inline", "link", "embedded", "image", "remove", "history"],
      }}
    />
  );
}
