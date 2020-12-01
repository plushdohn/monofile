import { ACCEPTED_FILES } from "api/ffmpeg";
import { ChangeEvent } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
  callback: (f: File) => any;
  className?: string;
  backgroundClass?: string;
  paddingClass?: string;
};

export default function FileInput(props: Props) {
  function handler(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files !== null) {
      props.callback(files[0]);
    }
  }

  return (
    <label
      className={`flex justify-center items-center ${
        props.paddingClass || "px-4 py-2"
      } cursor-pointer rounded text-white font-semibold ${
        props.backgroundClass || "bg-red-800 hover:bg-red-700 focus:bg-red-700"
      } ${props.className || ""}`}
    >
      {props.children}
      <input
        type="file"
        className="hidden"
        onChange={handler}
        accept={ACCEPTED_FILES}
      />
    </label>
  );
}
