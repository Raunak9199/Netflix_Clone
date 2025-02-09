import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL_SMALL } from "../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

function formatCategory(category, type) {
  let formatted = category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return `${formatted} ${type === "movie" ? "Movies" : "TV Shows"}`;
}

console.log(formatCategory("now_playing", "movie"));
console.log(formatCategory("top_rated", "tv"));

export const MovieSlider = ({ category }) => {
  const { contentType } = useContentStore();

  const [content, setContent] = useState();
  const [showArrows, setShowArrows] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        console.log("API Response:", res.data);
        setContent(res.data.similar || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setContent([]);
      }
    };

    getData();
  }, [contentType, category]);

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="bg-black text-white relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formatCategory(category, contentType)}
      </h2>

      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content?.length > 0 ? (
          content.map((element) => (
            <Link
              to={`/watch/${element.id}`}
              className="min-w-[250px] relative group"
              key={element.id}
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={IMAGE_BASE_URL_SMALL + element.backdrop_path}
                  alt="Image content"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>

              <p className="mt-2 text-center">
                {element.title || element.name}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-400">No content available.</p>
        )}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
"
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
"
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
