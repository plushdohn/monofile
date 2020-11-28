import { useState, useEffect, MouseEvent, DragEvent } from "react";
import FileInput from "components/FileInput";
import FileUploadIcon from "components/FileUploadIcon";
import PictureCompressionForm from "components/PictureCompressionForm";
import VideoCompressionForm from "components/VideoCompressionForm";
import { init } from "api/ffmpeg";
import Link from "next/link";
import InfoIcon from "components/InfoIcon";
import DryFileInput from "components/DryFileInput";

export default function IndexPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isInstanceReady, setIsInstanceReady] = useState(false);
  const [instanceError, setInstanceError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setIsInstanceReady(true);
      })
      .catch(() => {
        setInstanceError(true);
      });
  }, []);

  function handleFileChange(f: File) {
    setFile(f);
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    setIsDragging(true);

    console.log(e);

    e.preventDefault();
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFile(file);
  }

  return (
    <div
      className="w-full h-full flex flex-col justify-between items-center"
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div />
      {instanceError ? (
        <div className="flex flex-col items-center">
          <span className="text-gray-600 font-bold text-6xl mb-6">:(</span>
          <span className="text-gray-600 font-semibold text-center">
            Couldn't load core script.
            <br /> This usually means your browser's not supported yet.
          </span>
        </div>
      ) : isDragging ? (
        <span className="pointer-events-none text-3xl text-gray-700 border-4 font-semibold border-gray-700 rounded border-dashed p-8">
          Drop your file anywhere in the window
        </span>
      ) : file === null ? (
        <FileInput callback={handleFileChange} paddingClass="py-4 px-6 m-4">
          <span className="text-center">Choose an image or a video</span>
          <FileUploadIcon className="w-6 h-6 ml-2" />
        </FileInput>
      ) : file.type === "video/mp4" ? (
        <div className="flex flex-col items-center p-4">
          <VideoCompressionForm file={file} isInstanceReady={isInstanceReady} />
          <span className="text-gray-600 mt-2 text-sm">
            or{" "}
            <DryFileInput callback={handleFileChange}>
              <a className="font-semibold hover:underline focus:underline cursor-pointer">
                Use another file
              </a>
            </DryFileInput>
          </span>
        </div>
      ) : file.type === "image/jpeg" || file.type === "image/png" ? (
        <div className="flex flex-col items-center p-4">
          <PictureCompressionForm
            file={file}
            isInstanceReady={isInstanceReady}
          />
          <span className="text-gray-600 mt-2 text-sm">
            or{" "}
            <DryFileInput callback={handleFileChange}>
              <a className="font-semibold hover:underline focus:underline cursor-pointer">
                Use another file
              </a>
            </DryFileInput>
          </span>
        </div>
      ) : (
        <span className="text-center text-gray-600 font-semibold">
          Unsupported file type.
          <br />
          Click{" "}
          <DryFileInput callback={handleFileChange}>
            <a className="font-bold hover:underline focus:underline cursor-pointer">
              here
            </a>
          </DryFileInput>{" "}
          to choose another file.
        </span>
      )}
      <div className="p-4 self-end">
        <Link href="/about" passHref>
          <a className="text-gray-700 hover:text-gray-500 focus:text-gray-500">
            <InfoIcon className="w-6 h-6" />
          </a>
        </Link>
      </div>
    </div>
  );
}
