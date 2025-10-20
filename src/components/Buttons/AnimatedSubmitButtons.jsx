// components/Buttons/AnimatedSubmitButtons.jsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedSubmitButton = ({ loading, text, onClick }) => ( // ✅ Added onClick prop
  <motion.button
    type="button" // ✅ Changed from "submit" to "button"
    onClick={onClick} // ✅ Added onClick handler
    className="w-full py-3 bg-gradient-to-r from-[#7148CC] to-[#A213C5] text-white rounded-full font-medium relative overflow-hidden group"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={loading}
    animate={{
      boxShadow: [
        "0 4px 15px rgba(113, 72, 204, 0.3)",
        "0 8px 30px rgba(113, 72, 204, 0.4)",
        "0 4px 15px rgba(113, 72, 204, 0.3)",
      ],
    }}
    transition={{
      boxShadow: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
      animate={{
        translateX: ["100%", "-100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute inset-0 bg-white rounded-full"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: 1,
        opacity: 0.1,
        transition: { duration: 0.4 },
      }}
    />

    <span className="relative z-10 flex items-center justify-center">
      {loading ? "Processing..." : text}
    </span>
  </motion.button>
);

export default AnimatedSubmitButton;