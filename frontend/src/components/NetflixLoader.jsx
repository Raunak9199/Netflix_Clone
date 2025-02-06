import { motion } from "framer-motion";

export default function NetflixLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      {/* Rotating Border Circle */}
      <motion.div
        className="relative w-32 h-32 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 border-4 border-red-600 rounded-full"
          animate={{
            rotate: [0, 360], // Full rotation
            scale: [1, 1.2, 1], // Slight pulse effect
            opacity: [1, 0.8, 1], // Subtle fade effect
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Blinking 'N' Logo */}
        <motion.span
          className="absolute text-red-600 text-5xl font-extrabold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          N
        </motion.span>
      </motion.div>
    </div>
  );
}
