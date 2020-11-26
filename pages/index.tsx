import { useState, useEffect } from "react";
import FileInput from "components/FileInput";
import FileUploadIcon from "components/FileUploadIcon";
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      {instanceError ? (
        <span className="text-gray-700 font-semibold text-center">
          Couldn't load core script.
          <br /> This usually means we don't support your browser yet :(
        </span>
      ) : file === null ? (
        <FileInput callback={onFileChange} paddingClass="py-4 px-6">
          <span>Load a file</span>
          <FileUploadIcon className="w-6 h-6 ml-2" />
        </FileInput>
      ) : (
        <VideoCompressionForm file={file} isInstanceReady={isInstanceReady} />
      )}
    </div>
  );
}
