import { useMemo } from "react";

export default function useFileUrl(f: File) {
  return useMemo(() => window.URL.createObjectURL(f), [f]);
}
