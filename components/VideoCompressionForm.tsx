import React, { useEffect, useMemo, useState } from "react";
import useFileUrl from "hooks/useFileUrl";
import RangeInput from "./RangeInput";
import useVideoDuration from "hooks/useVideoDuration";
import Button from "./Button";
import Spinner from "./Spinner";
import {
  compressVideo,
  removeProgressHandler,
  setProgressHandler,
} from "api/ffmpeg";

type Props = {
  file: File;
  isInstanceReady: boolean;
};

export default function VideoCompressionForm(props: Props) {
  const url = useFileUrl(props.file);
  const duration = useVideoDuration(url);

  const [startTimeValue, setStartTimeValue] = useState(0);
  const [endTimeValue, setEndTimeValue] = useState(10);
  const [resolutionFactorValue, setResolutionFactorValue] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const isFormDisabled = useMemo(() => {
    return isProcessing || !props.isInstanceReady;
  }, [isProcessing, props.isInstanceReady]);

  const minEndTime = useMemo(() => {
    return startTimeValue + 1;
  }, [startTimeValue]);

  const resolutionAlias = useMemo(() => {
    if (resolutionFactorValue === 4) {
      return "Full";
    } else if (resolutionFactorValue === 3) {
      return "Half";
    } else if (resolutionFactorValue === 2) {
      return "Third";
    } else return "Quarter";
  }, [resolutionFactorValue]);

  useEffect(() => {
    if (endTimeValue <= startTimeValue) setEndTimeValue(startTimeValue + 2);
  }, [startTimeValue, endTimeValue, setEndTimeValue]);

  function handleSubmit() {
    setIsProcessing(true);
    setProgressHandler((ratio) => {
      setProgress(Math.floor(ratio * 100));
    });

    compressVideo(
      props.file,
      startTimeValue,
      endTimeValue,
      5 - resolutionFactorValue
    ).finally(() => {
      setIsProcessing(false);
      removeProgressHandler();
    });
  }

  return (
    <div className="rounded bg-gray-800">
      <video
        src={url}
        controls
        className="p-4 w-96 h-64 object-cover rounded"
      />
      <div className="w-full p-4 pt-3 border-t border-gray-700">
        <RangeInput
          label="Start time"
          min={0}
          max={duration - 2}
          value={startTimeValue}
          onChange={setStartTimeValue}
          disabled={isFormDisabled}
        />
        <RangeInput
          label="End time"
          min={minEndTime}
          max={duration}
          value={endTimeValue}
          onChange={setEndTimeValue}
          className="mt-4"
          disabled={isFormDisabled}
        />
      </div>
      <div className="w-full p-4 pt-3 border-t border-gray-700">
        <RangeInput
          label="Resolution"
          min={1}
          max={4}
          value={resolutionFactorValue}
          onChange={setResolutionFactorValue}
          disabled={isFormDisabled}
          customValue={resolutionAlias}
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
              <span>Compress video</span>
            )
          ) : (
            <>
              <Spinner className="mr-2 w-5 h-5" />
              <span>Loading core script...</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
