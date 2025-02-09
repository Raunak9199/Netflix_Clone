import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_rgba(0,0,0,1)_80%)]"></div>

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-50 rounded-full animate-star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${3 + Math.random() * 5}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <header className="absolute top-0 left-0 p-4 w-full flex justify-start">
        <Link to="/">
          <img src="/netflix-logo.png" alt="Netflix" className="h-8" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="text-center z-10">
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-bounce">
          404
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Looks like you've drifted into the void. Let's get you back home.
        </p>
        <Link
          to="/"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Take Me Home
        </Link>
      </main>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes star-move {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          .animate-star {
            animation: star-move linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;
