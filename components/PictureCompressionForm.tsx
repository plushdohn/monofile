import React, { useMemo, useState } from "react";
import useFileUrl from "hooks/useFileUrl";
import RangeInput from "./RangeInput";
import Button from "./Button";
import Spinner from "./Spinner";
import {
  compressImage,
  removeProgressHandler,
  setProgressHandler,
} from "api/ffmpeg";

type Props = {
  file: File;
  isInstanceReady: boolean;
};

export default function PictureCompressionForm(props: Props) {
  const url = useFileUrl(props.file);

  const [resolutionFactorValue, setResolutionFactorValue] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingError, setProcessingError] = useState(false);

  const isFormDisabled = useMemo(() => {
    return isProcessing || !props.isInstanceReady;
  }, [isProcessing, props.isInstanceReady]);

  const resolutionAlias = useMemo(() => {
    if (resolutionFactorValue === 4) {
      return "Full";
    } else if (resolutionFactorValue === 3) {
      return "Half";
    } else if (resolutionFactorValue === 2) {
      return "Third";
    } else return "Quarter";
  }, [resolutionFactorValue]);

  function handleSubmit() {
    setIsProcessing(true);

    setProcessingError(false);

    setProgress(0);
    setProgressHandler((ratio) => {
      setProgress(Math.floor(ratio * 100));
    });

    compressImage(props.file, 5 - resolutionFactorValue)
      .catch((err) => setProcessingError(true))
      .finally(() => {
        setIsProcessing(false);
        removeProgressHandler();
      });
  }

  return (
    <div className="w-full md:w-96 rounded bg-gray-800">
      <img src={url} className="p-4 w-full max-h-96 object-cover rounded" />
      <div className="w-full flex flex-col items-center p-4 pt-3 border-t border-gray-700">
        <RangeInput
          label="Resolution"
          min={1}
          max={4}
          value={resolutionFactorValue}
          onChange={setResolutionFactorValue}
          disabled={isFormDisabled}
          customValue={resolutionAlias}
          className="w-full"
        />
        <Button
          callback={handleSubmit}
          className="w-full mt-6"
          disabled={isFormDisabled}
        >
          {props.isInstanceReady ? (
            isProcessing ? (
              <>
                <Spinner className="mr-2 w-5 h-5" />
                <span>Processing... {progress}%</span>
              </>
            ) : (
              <span>Process image</span>
            )
          ) : (
            <>
              <Spinner className="mr-2 w-5 h-5" />
              <span>Loading core script...</span>
            </>
          )}
        </Button>
        {processingError && (
          <span className="text-red-600 text-sm mt-2 -mb-2">
            A conversion error has occurred.
          </span>
        )}
      </div>
    </div>
  );
}
