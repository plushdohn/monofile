import { ACCEPTED_FILES } from "api/ffmpeg";
import { ChangeEvent } from "react";

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  callback: (f: File) => any;
};

export default function DryFileInput(props: Props) {
  function handler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    props.callback(file);
  }

  return (
    <label>
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
