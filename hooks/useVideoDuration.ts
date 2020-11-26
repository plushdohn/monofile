import { useEffect, useMemo, useState } from "react";

export default function useVideoDuration(url: string) {
  const [duration, setDuration] = useState(10);

  useEffect(() => {
    const video = document.createElement("video");

    video.onloadeddata = () => {
      setDuration(Math.floor(video.duration));
    };

    video.src = url;
  }, [url, setDuration]);

  return duration;
}
