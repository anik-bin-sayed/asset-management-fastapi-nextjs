"use client";

import { RxCross2 } from "react-icons/rx";

export default function VideoModal({ videoUrl, title, onClose }) {
  if (!videoUrl) return null;

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);

      let videoId = "";

      if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v");
      } else if (urlObj.hostname.includes("youtu.be")) {
        videoId = urlObj.pathname.slice(1);
      }

      if (!videoId) return null;

      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch {
      return null;
    }
  };

  const embedUrl = getYoutubeEmbedUrl(videoUrl);

  if (!embedUrl) return null;

  return (
    <div
      className="fixed border inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-3 top-3 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black border border-white hover:border-gray-300 transition-colors duration-200 cursor-pointer"
      >
        <RxCross2 />
      </button>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video */}
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title={title || "YouTube video"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
