import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import NetflixLoader from "./components/NetflixLoader";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./components/SearchHistoryPage";
import NotFoundPage from "./components/NotFound404";

function App() {
  const { user, checkAuth, authCheck } = useAuthStore();
  console.log("Auth user: ", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (checkAuth) {
    return <NetflixLoader />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/*"
          element={user ? <NotFoundPage /> : <Navigate to={"/login"} />}
        />
      </Routes>

      {/* Footer */}
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
