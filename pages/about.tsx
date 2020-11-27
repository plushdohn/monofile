export default function AboutPage() {
  return (
    <div className="w-full min-h-full flex flex-col items-center py-24 text-gray-600">
      <span className="font-bold text-3xl">About reduce.media</span>
      <span className="w-144 text-justify font-semibold mt-4">
        reduce.media is a web app that allows for simple operations on media
        files without uploading them anywhere, using the user's CPU to do the
        work instead. <br />
        <br />
        It provides a friendly interface to the amazing work done by the people
        over at{" "}
        <a
          href="https://github.com/ffmpegwasm/ffmpeg.wasm"
          className="hover:underline focus:underline font-bold"
        >
          ffmpeg.wasm
        </a>
        .
      </span>
      <span className="font-bold text-3xl mt-20">Contact</span>
      <span className="w-144 text-justify font-semibold mt-4">
        You can contact me for bug reports, feedback or just to say hi at{" "}
        <b>lambsaucevirgin@gmail.com</b> <br />
      </span>
    </div>
  );
}
