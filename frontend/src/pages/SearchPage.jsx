import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { IMAGE_BASE_URL_ORIGINAL } from "../constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.data);
      console.log("response:///", res.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
      setResults([]);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="relative flex justify-center bg-gray-800 rounded-lg p-1 w-60 mx-auto">
          {/* Animated Slider */}
          <div
            className={`absolute top-0 left-0 h-full w-1/2 bg-red-600 rounded-lg transition-all duration-300`}
            style={{
              transform: `translateX(${activeTab === "tv" ? "100%" : "0%"})`,
            }}
          ></div>

          {/* Buttons */}
          <button
            className="relative z-10 py-2 px-4 w-1/2 text-center text-white"
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>

          <button
            className="relative z-10 py-2 px-4 w-1/2 text-center text-white"
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 mt-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {
                  /* activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={IMAGE_BASE_URL_ORIGINAL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : */ <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContentType(activeTab);
                    }}
                  >
                    <img
                      src={IMAGE_BASE_URL_ORIGINAL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
