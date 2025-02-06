import { Loader } from "lucide-react";

export default function NetflixButton({
  loading,
  children,
  className,
  ...props
}) {
  return (
    <button
      className={`w-full py-2 font-semibold rounded-md transition-colors ${
        loading
          ? "border-2 border-red-600 text-red-600 bg-transparent"
          : "bg-red-600 text-white hover:bg-red-700"
      } ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-red-600 size-5" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
