import React, { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCBJycsmduvYEL83R_U4JriQ"; // MKBHD

const VideoPage = () => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      if (!apiKey) {
        setError("YouTube API key is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;
        
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();

        // Find the first item that is actually a video.
        const latestVideo = data.items?.find(item => item.id.kind === "youtube#video");
        
        if (latestVideo) {
          setVideoId(latestVideo.id.videoId);
        } else {
          throw new Error("No latest video found.");
        }
      } catch (err) {
        console.error("Failed to fetch video:", err);
        setError(err.message);
        setVideoId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 tracking-tight">
          Latest Video
        </h1>
        <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl shadow-red-500/20">
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-xl text-gray-400">Loading Latest Video...</p>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center w-full h-full p-8 text-center">
              <p className="text-xl text-red-500">
                Could not load video. <br />
                <span className="text-sm text-gray-400">{error}</span>
              </p>
            </div>
          )}
          {!loading && !error && videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Latest MKBHD Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
