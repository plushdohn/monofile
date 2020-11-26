import React, { useEffect, useMemo, useState } from "react";
import useFileUrl from "hooks/useFileUrl";
import RangeInput from "./RangeInput";
import useVideoDuration from "hooks/useVideoDuration";
import Button from "./Button";
import Spinner from "./Spinner";
import { compressVideo, setProgressHandler } from "api/ffmpeg";

type Props = {
  file: File;
};

export default function VideoCompressionForm(props: Props) {
  const url = useFileUrl(props.file);
  const duration = useVideoDuration(url);

  const [startTimeValue, setStartTimeValue] = useState(0);
  const [endTimeValue, setEndTimeValue] = useState(10);
  const [resolutionFactorValue, setResolutionFactorValue] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const minEndTime = useMemo(() => {
    return startTimeValue + 1;
  }, [startTimeValue]);

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
    )
      .then(() => {
        console.log("COCK");
      })
      .finally(() => {
        setIsProcessing(false);
        setProgress(0);
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
          disabled={isProcessing}
        />
        <RangeInput
          label="End time"
          min={minEndTime}
          max={duration}
          value={endTimeValue}
          onChange={setEndTimeValue}
          className="mt-4"
          disabled={isProcessing}
        />
      </div>
      <div className="w-full p-4 pt-3 border-t border-gray-700">
        <RangeInput
          label="Resolution scaling"
          min={1}
          max={4}
          value={resolutionFactorValue}
          onChange={setResolutionFactorValue}
          disabled={isProcessing}
          customValue={`1/${5 - resolutionFactorValue}`}
        />
        <Button
          callback={handleSubmit}
          className="w-full mt-6"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Spinner className="mr-2 w-5 h-5" />
              <span>Processing... {progress}%</span>
            </>
          ) : (
            <span>Compress video</span>
          )}
        </Button>
      </div>
    </div>
  );
}
