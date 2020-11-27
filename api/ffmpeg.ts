import { createFFmpeg, FFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

let progressHandler: ((n: number) => any) | null = null;
let instance: FFmpeg | null = null;

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

  instance.FS("writeFile", "in.jpg", buffer);

  return instance
    .run("-i", "in.jpg", "-vf", `scale=iw/${scaling}:ih/${scaling}`, f.name)
    .then(() => {
      instance?.setProgress(() => {});

      const el = document.createElement("a");

      const blob = new Blob([instance?.FS("readFile", f.name)]);
      const url = window.URL.createObjectURL(blob);

      el.href = url;
      el.download = f.name;

      el.click();

      window.URL.revokeObjectURL(url);
    });
}

export async function compressVideo(
  f: File,
  startAt: number,
  endAt: number,
  scaling: number
) {
  if (!instance) {
    throw new Error(
      "Tried to compress a video without loading a FFmpeg instance first."
    );
  }

  const buffer = await fetchFile(f);

  instance.FS("writeFile", "in.mp4", buffer);

  return instance
    .run(
      "-i",
      "in.mp4",
      "-ss",
      startAt.toString(),
      "-to",
      endAt.toString(),
      "-c",
      "copy",
      "trim.mp4"
    )
    .then(() => {
      instance?.setProgress(({ ratio }) => {
        if (progressHandler) {
          progressHandler(ratio < 0 ? 0 : ratio);
        }
      });

      return instance?.run(
        "-i",
        "trim.mp4",
        "-vf",
        `scale=iw/${scaling}:ih/${scaling}`,
        "-preset",
        "superfast",
        f.name
      );
    })
    .then(() => {
      instance?.setProgress(() => {});

      const el = document.createElement("a");

      const blob = new Blob([instance?.FS("readFile", f.name)]);
      const url = window.URL.createObjectURL(blob);

      el.href = url;
      el.download = f.name;

      el.click();

      window.URL.revokeObjectURL(url);
    });
}
