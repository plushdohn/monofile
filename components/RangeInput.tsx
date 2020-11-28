import { ChangeEvent } from "react";

type Props = {
  min: number;
  max: number;
  value: number;
  label: string;
  onChange: (n: number) => any;
  className?: string;
  disabled?: boolean;
  customValue?: string | number;
};

export default function RangeInput(props: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(parseInt(e.target.value));
  }

  return (
    <div className={props.className}>
      <span className="font-semibold text-gray-500">{props.label}</span>
      <div
        className={`flex items-center mt-1 rounded bg-gray-700 p-2 ${
          props.disabled && "cursor-not-allowed"
        }`}
      >
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          onChange={handleChange}
          className={`w-full ${
            props.disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={props.disabled}
        />
        <span
          className={`font-semibold ml-2 ${
            props.disabled ? "text-gray-500" : "text-white"
          }`}
        >
          {props.customValue || props.value}
        </span>
      </div>
    </div>
  );
}
