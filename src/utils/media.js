const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov"];

export function isVideoSrc(src) {
  if (typeof src !== "string") return false;
  const clean = src.split("?")[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => clean.endsWith(ext));
}
