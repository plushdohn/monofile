type Props = {
  callback: () => any;
  children: string | JSX.Element | JSX.Element[];
  className?: string;
  disabled?: boolean;
};

export default function Button(props: Props) {
  function handler() {
    if (!props.disabled) props.callback();
  }

  return (
    <button
      className={`flex justify-center items-center px-4 py-2 text-white font-semibold active:outline-none focus:outline-none ${
        props.disabled
          ? "cursor-not-allowed bg-gray-600"
          : "cursor-pointer bg-red-800 hover:bg-red-700 focus:bg-red-700"
      } ${props.className}`}
      onClick={handler}
    >
      {props.children}
    </button>
  );
}
