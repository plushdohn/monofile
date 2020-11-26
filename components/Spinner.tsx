type Props = {
  className?: string;
};

export default function Spinner(props: Props) {
  return (
    <svg
      style={{
        fill: "none",
      }}
      className={`text-white animate-spin ${props.className}`}
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25 stroke-current"
        cx="12"
        cy="12"
        r="10"
        stroke-width="4"
      />
      <path
        className="opacity-75 fill-current"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
