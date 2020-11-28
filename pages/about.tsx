export default function AboutPage() {
  return (
    <div className="w-full min-h-full flex flex-col items-center py-24 text-gray-600 p-8">
      <span className="font-bold text-3xl select-text text-center">
        About reduce.media
      </span>
      <span className="w-full md:w-144 text-justify font-semibold mt-4 select-text break-words">
        reduce.media is a web app to compress media files without uploading them
        anywhere, using the user's CPU to do the work instead. <br />
        <br />
        It's a friendly interface to the amazing work done by the people over at{" "}
        <a
          href="https://github.com/ffmpegwasm/ffmpeg.wasm"
          className="hover:underline focus:underline font-bold select-text"
        >
          ffmpeg.wasm
        </a>
        .
      </span>
      <span className="font-bold text-3xl mt-20 select-text text-center">
        Contact
      </span>
      <span className="w-full md:w-144 text-justify font-semibold mt-4 select-text break-words">
        You can contact me for bug reports, feedback or just to say hi on Reddit
        under{" "}
        <a
          href="https://reddit.com/u/lambsaucevirgin"
          className="hover:underline focus:underline font-bold select-text"
        >
          u/lambsaucevirgin
        </a>{" "}
        or by e-mail at <b className="select-text">lambsaucevirgin@gmail.com</b>
      </span>
    </div>
  );
}
