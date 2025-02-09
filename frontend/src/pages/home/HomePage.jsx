import React from "react";
import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";
import NetflixLoader from "../../components/NetflixLoader";

function HomePage() {
  const { user, checkAuth } = useAuthStore();

  if (checkAuth) {
    return <NetflixLoader />;
  }

  return <div>{user ? <HomeScreen /> : <AuthScreen />}</div>;
}

export default HomePage;
