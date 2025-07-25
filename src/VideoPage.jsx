import React, { useEffect, useState } from "react";
const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY; ;

const CHANNEL_ID = "UCBJycsmduvYEL83R_U4JriQ"; // MKBHD

const VideoPage = () => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
  
     const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;
        const res = await fetch(apiUrl);
        const data = await res.json();
        const latest = data.items.find(item => item.id.kind === "youtube#video");
        setVideoId(latest?.id.videoId || null);
      } catch (err) {
        setVideoId(null);
      }
    };
    fetchLatestVideo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-black py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Watch Latest Video</h1>
      <div className="p-4  w-full max-w-3xl aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl">
        {videoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Latest MKBHD Video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="text-gray-400 flex items-center justify-center w-full h-full">Loading video...</div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
