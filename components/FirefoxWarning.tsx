import ClearIcon from "./ClearIcon";

type Props = {
  callback: () => any;
};

export default function FirefoxWarning(props: Props) {
  function handler(e: any) {
    props.callback();
  }

  return (
    <div className="absolute left-0 top-0 w-full flex justify-center items-center p-4">
      <span className="px-4 py-2 rounded bg-red-700 text-white font-semibold">
        Firefox currently has very strict memory limits which make the app
        unusable for files larger than a few KBs.
      </span>
      <button className="ml-2 text-white" onClick={handler}>
        <ClearIcon />
      </button>
    </div>
  );
}
