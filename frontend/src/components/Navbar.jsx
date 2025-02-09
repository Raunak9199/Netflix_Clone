import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, LogOut, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import NetflixLoader from "../components/NetflixLoader";
import { useContentStore } from "../store/content";
function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const { contentType, setContentType } = useContentStore();
  console.log("Current contentType:", contentType);

  const { user, logout, isLisLoggingOut } = useAuthStore();

  if (isLisLoggingOut) {
    return <NetflixLoader></NetflixLoader>;
  }
  console.log("user data:", user);
  console.log("img:", user.image);
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-20">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {/* navbar will be hodden on mobile */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      {/*  */}
      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer"></Search>
        </Link>
        <img
          src={user.image}
          alt="Profile"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout}></LogOut>
        {/* Hamburger menu */}
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer"
            onClick={toggleMobileMenu}
          ></Menu>
        </div>
      </div>
      {/* Mobile navbar */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
