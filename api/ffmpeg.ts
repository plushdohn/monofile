import { createFFmpeg, FFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

let progressHandler: ((n: number) => any) | null = null;
let instance: FFmpeg | null = null;

const SUPPORTED_IMAGES = ["image/jpeg", "image/x-png"];
const SUPPORTED_VIDEOS = [
  "video/mp4",
  "video/avi",
  "video/x-matroska",
  "video/webm",
];

export function setProgressHandler(handler: (n: number) => any) {
  progressHandler = handler;
}

export function removeProgressHandler() {
  progressHandler = null;
}

export function init() {
  if (instance === null) {
    instance = createFFmpeg({ log: process.env.NODE_ENV === "development" });

    if (!instance.isLoaded()) {
      return instance.load();
    }
  }

  return new Promise<void>((res) => {
    res();
  });
}

export function isImage(mimeType: string) {
  return SUPPORTED_IMAGES.includes(mimeType);
}

export function isVideo(mimeType: string) {
  return SUPPORTED_VIDEOS.includes(mimeType);
}

export async function compressImage(f: File, scaling: number) {
  if (!instance) {
    throw new Error(
      "Tried to compress a video without loading a FFmpeg instance first."
    );
  }

  const buffer = await fetchFile(f);

  instance.setProgress(({ ratio }) => {
    if (progressHandler) {
      progressHandler(ratio < 0 ? 0 : ratio);
    }
  });

  instance.FS("writeFile", f.name, buffer);

  const fileNameWithoutExtension = f.name.split(".").slice(0, -1).join(".");
  const outFileName = "out.jpg";

  return instance
    .run("-i", f.name, "-vf", `scale=iw/${scaling}:ih/${scaling}`, outFileName)
    .then(() => {
      instance?.setProgress(() => {});

      const el = document.createElement("a");

      const blob = new Blob([instance?.FS("readFile", outFileName)]);
      const url = window.URL.createObjectURL(blob);

      el.href = url;
      el.download = fileNameWithoutExtension + ".jpg";

      el.click();

      window.URL.revokeObjectURL(url);
    });
}

export async function compressVideo(
  f: File,
  startAt: number,
  endAt: number,
  scaling: number,
  videoDuration: number,
  compression: number
) {
  if (!instance) {
    throw new Error(
      "Tried to compress a video without loading a FFmpeg instance first."
    );
  }

  const buffer = await fetchFile(f);

  instance.setProgress(({ ratio }) => {
    if (progressHandler) {
      if (ratio < 0 || ratio > 1) {
        return progressHandler(0);
      }

      ratio = ratio * (videoDuration / (endAt - startAt));

      if (ratio > 1) ratio = 1;

      return progressHandler(ratio);
    }
  });

  instance.FS("writeFile", f.name, buffer);

  const fileNameWithoutExtension = f.name.split(".").slice(0, -1).join(".");
  const outFileName = "out.mp4";

  return instance
    .run(
      "-ss",
      startAt.toString(),
      "-to",
      endAt.toString(),
      "-i",
      f.name,
      "-preset",
      "superfast",
      "-c:a",
      "copy",
      "-vf",
      `scale=iw/${scaling}:ih/${scaling}`,
      "-crf",
      (25 + compression * 3).toString(),
      outFileName
    )
    .then(() => {
      instance?.setProgress(() => {});

      const el = document.createElement("a");

      const blob = new Blob([instance?.FS("readFile", outFileName)]);
      const url = window.URL.createObjectURL(blob);

      el.href = url;
      el.download = fileNameWithoutExtension + ".mp4";

      el.click();

      window.URL.revokeObjectURL(url);
    });
}
