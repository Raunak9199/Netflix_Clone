import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { formatReleaseDate } from "../utils/formatDate.js";
import { IMAGE_BASE_URL_ORIGINAL, IMAGE_BASE_URL_SMALL } from "../constants";
import WatchPageShimmer from "../components/shimmers/WatchPageShimmers.jsx";
import NotFoundPage from "../components/NotFound404.jsx";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState({});

  const [similarContent, setSimilarContent] = useState([]);

  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        console.log("trailers:", res.data);
        setTrailers(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        console.log("similar:", res.data);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        console.log("details:", res.data);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currIndex < trailers.length - 1) setCurrentIndex(currIndex + 1);
  };
  const handlePrev = () => {
    if (currIndex > 0) setCurrentIndex(currIndex - 1);
  };

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

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageShimmer />
      </div>
    );

  if (!content) return <NotFoundPage />;
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
              disabled={currIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currIndex === trailers.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={currIndex === trailers.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Video Player */}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="m-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currIndex].key}`}
            />
          )}

          {trailers?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥😔
            </h2>
          )}
        </div>

        {/* Movie Details */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{content?.overview}</p>
          </div>

          <img
            src={IMAGE_BASE_URL_ORIGINAL + content?.poster_path}
            alt="Poster"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {/* Similar Slider */}
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Show</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content?.poster_path === null) return null;
                return (
                  <Link
                    key={content?.id}
                    to={`/watch/${content?.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={IMAGE_BASE_URL_SMALL + content?.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content?.title || content?.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
