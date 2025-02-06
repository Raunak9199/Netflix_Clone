import React from "react";
import { useAuthStore } from "../../store/authUser";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";

function HomeScreen() {
  const { logout } = useAuthStore();
  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar />

        <img
          src="/extraction.jpg"
          alt="Image"
          className="absolute top-0 left-0 w-full object-cover -z-50"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        ></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10"></div>

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              Extraction
            </h1>
            <p className="mt-2 text-lg">2014 | 18+</p>

            <p className="mt-4 text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id,
              amet? Amet atque ipsum maiores temporibus molestias eum magni
              eligendi, quia assumenda illum ex ut aliquam voluptates.
              Consequuntur nostrum aspernatur suscipit!
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={"/watch/123"}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 inline-block mr-2 fill-black" />
              Play
            </Link>

            <Link
              to={"/watch/123"}
              className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Info className="size-6 inline-block mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeScreen;
