import { useState, useEffect, MouseEvent } from "react";
import FileInput from "components/FileInput";
import FileUploadIcon from "components/FileUploadIcon";
import PictureCompressionForm from "components/PictureCompressionForm";
import VideoCompressionForm from "components/VideoCompressionForm";
import { init } from "api/ffmpeg";

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isInstanceReady, setIsInstanceReady] = useState(false);
  const [instanceError, setInstanceError] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInstanceReady(true);
      })
      .catch(() => {
        setInstanceError(true);
      });
  }, []);

  function onFileChange(f: File) {
    setFile(f);
  }

  function useAnotherFileHandler(
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    setFile(null);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {instanceError ? (
        <div className="flex flex-col items-center">
          <span className="text-gray-600 font-bold text-6xl mb-6">:(</span>
          <span className="text-gray-600 font-semibold text-center">
            Couldn't load core script.
            <br /> This usually means your browser's not supported yet.
          </span>
        </div>
      ) : file === null ? (
        <FileInput callback={onFileChange} paddingClass="py-4 px-6">
          <span>Choose a file</span>
          <FileUploadIcon className="w-6 h-6 ml-2" />
        </FileInput>
      ) : file.type === "video/mp4" ? (
        <>
          <VideoCompressionForm file={file} isInstanceReady={isInstanceReady} />
          <span className="text-gray-600 mt-2 text-sm">
            or{" "}
            <a
              className="font-semibold hover:underline focus:underline"
              href="#"
              onClick={useAnotherFileHandler}
            >
              Use another file
            </a>
          </span>
        </>
      ) : file.type === "image/jpeg" || file.type === "image/png" ? (
        <>
          <PictureCompressionForm
            file={file}
            isInstanceReady={isInstanceReady}
          />
          <span className="text-gray-600 mt-2 text-sm">
            or{" "}
            <a
              className="font-semibold hover:underline focus:underline"
              href="#"
              onClick={useAnotherFileHandler}
            >
              Use another file
            </a>
          </span>
        </>
      ) : (
        <span className="text-center text-gray-600 font-semibold">
          Unsupported file type.
          <br />
          Click{" "}
          <a
            href="#"
            className="font-bold hover:underline focus:underline"
            onClick={useAnotherFileHandler}
          >
            here
          </a>{" "}
          to choose another file.
        </span>
      )}
    </div>
  );
}
