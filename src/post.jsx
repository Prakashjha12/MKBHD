import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import MagicBento from "./MagicBento";

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-800 p-6 rounded-xl flex flex-col space-y-4 min-h-[180px]">
    <div className="w-16 h-16 rounded-full bg-gray-700 mx-auto" />
    <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto" />
    <div className="h-3 bg-gray-700 rounded w-full" />
    <div className="h-3 bg-gray-700 rounded w-5/6" />
  </div>
);

// Dummy fetch function for posts
const fetchCommunityPosts = async () => [
  {
    id: 1,
    user: "TechieAnsh",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    content: "Built my dream setup inspired by #MKBHD! 🔥 Loving the matte black theme.",
    media: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?fit=crop&w=400&q=80",
    date: "2025-07-20",
  },
  {
    id: 2,
    user: "Priya Builds",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Just got the MKBHD hoodie. Quality is on another level! Thanks for the fast delivery.",
    media: null,
    date: "2025-07-18",
  },
  {
    id: 3,
    user: "Arjun Codes",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Community AMA was 🔥 MKBHD answered my question about video gear! Thanks for the insights.",
    media: null,
    date: "2025-07-15",
  },
  {
    id: 4,
    user: "Samaira Sharma",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "Inspired to start my own channel after binging the MKBHD podcast. Let’s go! 🚀",
    media: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=400&q=80",
    date: "2025-07-12",
  },
];

const CommunityConnect = () => {
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchCommunityPosts().then((posts) => {
      setTimeout(() => {
        if (mounted) {
          setCommunityPosts(posts);
          setLoading(false);
          gsap.fromTo(
            ".community-card",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out" }
          );
        }
      }, 1800);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* MagicBento background */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 py-16 px-6">
        <h1 className="text-4xl font-extrabold text-[#E5202B] text-center mb-6 tracking-tight drop-shadow-xl">
          MKBHD Community Connect
        </h1>
        <p className="text-gray-300 text-center max-w-lg mx-auto mb-14">
          Real stories, setups & reviews from the #MKBHD family. Be featured: post and tag <span className="text-[#E5202B]">@MKBHD</span> or <span className="text-[#E5202B]">#MKBHD</span> in your content!
        </p>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array(4).fill(null).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="community-card bg-gray-900 rounded-xl p-6 flex flex-col shadow-xl transition-transform transform hover:scale-[1.025] hover:shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full border-2 border-[#E5202B]" />
                  <div>
                    <div className="font-semibold text-white">{post.user}</div>
                    <div className="text-gray-400 text-xs">{new Date(post.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <p className="text-lg text-gray-200 mb-4">{post.content}</p>
                {post.media && (
                  <img
                    src={post.media}
                    alt="community post media"
                    className="rounded-lg mt-2 max-h-48 object-cover border border-gray-800"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityConnect;
