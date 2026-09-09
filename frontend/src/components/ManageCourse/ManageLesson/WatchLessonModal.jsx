"use client";

import React, { useState } from "react";
import { FiX, FiPlayCircle, FiList, FiClock } from "react-icons/fi";

const WatchLessonModal = ({ isOpen, onClose, videos = [] }) => {
  const [currentVideo, setCurrentVideo] = useState(videos[0] || null);

  if (!isOpen) return null;

  const isYoutube = (url) => {
    return url?.includes("youtube.com") || url?.includes("youtu.be");
  };

  const getYoutubeEmbedUrl = (url) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }

      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
    } catch {
      return url;
    }
  };

  const formatDuration = (seconds = 0) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative flex h-[85vh] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition hover:bg-red-50 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        {/* Left Side */}
        <div className="flex flex-1 flex-col bg-gray-950">
          {/* Video Player */}
          <div className="flex flex-1 items-center justify-center p-4">
            {currentVideo ? (
              <div className="aspect-video w-full">
                {isYoutube(currentVideo.video_url) ? (
                  <iframe
                    src={getYoutubeEmbedUrl(currentVideo.video_url)}
                    title={currentVideo.title}
                    className="h-full w-full rounded-xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={currentVideo.video_url}
                    controls
                    autoPlay
                    className="h-full w-full rounded-xl"
                  />
                )}
              </div>
            ) : (
              <p className="text-white">No video available</p>
            )}
          </div>

          {/* Video Information */}
          {currentVideo && (
            <div className="bg-white px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">
                {currentVideo.title}
              </h2>

              {currentVideo.description && (
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {currentVideo.description}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Video List */}
        <div className="flex w-[350px] flex-col border-l border-gray-200 bg-white">
          {/* Sidebar Header */}
          <div className="border-b border-gray-200 p-5">
            <div className="flex items-center gap-2">
              <FiList size={20} className="text-blue-600" />

              <h3 className="font-bold text-gray-900">Lesson Videos</h3>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {videos.length} videos available
            </p>
          </div>

          {/* Video List */}
          <div className="flex-1 overflow-y-auto p-3">
            {videos.map((video, index) => {
              const isActive = currentVideo?.id === video.id;

              return (
                <button
                  key={video.id}
                  onClick={() => setCurrentVideo(video)}
                  className={`mb-2 flex w-full gap-3 rounded-xl p-3 text-left transition-all ${
                    isActive
                      ? "bg-blue-50 ring-1 ring-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Video Number */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isActive ? (
                      <FiPlayCircle size={18} />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`line-clamp-2 text-sm font-semibold ${
                        isActive ? "text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {video.title}
                    </h4>

                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                      <FiClock size={13} />

                      {formatDuration(video.duration)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchLessonModal;
