"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import { FaShareAlt, FaShare } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { FiMaximize2 } from "react-icons/fi";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const popupRef = useRef(null);

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareToLLM = (model) => {
    const promptText = encodeURIComponent(post.prompt);
    let url = "";

    switch (model) {
      case "chatgpt":
        url = `https://chat.openai.com/?prompt=${promptText}`;
        break;
      case "claude":
        url = `https://claude.ai/chats/new?prompt=${promptText}`;
        break;
      case "grok":
        url = `https://grok.com/chat/${promptText}`;
        break;
      case "deepseek":
        url = `https://chat.deepseek.com/chat?q=${promptText}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank");
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isExpanded]);

  return (
    <>
      {isExpanded && (
        <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-40"></div>
      )}
      <div
        className={`prompt_card ${
          isExpanded
            ? "fixed inset-0 z-50 bg-white p-6 shadow-lg rounded-lg mx-auto my-auto w-[1200px] h-[600px]"
            : "relative max-h-[600px] overflow-hidden"
        }`}
        ref={isExpanded ? popupRef : null}
        style={isExpanded ? { top: "50%", transform: "translateY(-50%)" } : {}}
      >
        {/* Top Section */}
        <div className="flex justify-between items-start gap-5">
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleProfileClick}
          >
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="copy_btn" onClick={handleCopy}>
              <Image
                src={
                  copied === post.prompt
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                width={12}
                height={12}
              />
            </div>
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-gray-600 hover:text-blue-600"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <FiMaximize2 size={20} />
            </button>
          </div>
        </div>

        {/* Prompt Text Section */}
        <div
          className={`my-4 font-satoshi text-sm text-gray-700 ${
            isExpanded
              ? "whitespace-pre-line h-[200px] overflow-y-scroll p-2 rounded-md bg-gray-50"
              : "line-clamp-6"
          }`}
        >
          {post.prompt}
        </div>

        {/* Share Section */}
        <div className="mt-2">
          <button
            onClick={() => setShowShareOptions((prev) => !prev)}
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 gap-2"
          >
            <FaShare />
            Share with LLMs
          </button>

          {showShareOptions && (
            <div className="flex gap-3 mt-2 flex-wrap">
              <button
                onClick={() => shareToLLM("chatgpt")}
                title="ChatGPT"
                className="text-green-600 hover:scale-105 transition"
              >
                <TbBrandOpenai size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Tag Section */}
        <p
          className="font-inter text-sm blue_gradient cursor-pointer mt-3"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>

        {/* Edit/Delete for Creator */}
        {session?.user.id === post.creator._id && pathName === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PromptCard;
