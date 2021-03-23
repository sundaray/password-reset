import React from "react";
import { motion } from "framer-motion";

const nameVariants = {
  initial: { y: "-1rem", opacity: 0 },
  animate: {
    y: "0rem",
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const Home = () => {
  return (
    <div className="homepage-wrapper">
      <motion.h1 variants={nameVariants} initial="initial" animate="animate">
        Hemanta Sundaray
      </motion.h1>
      <motion.h2 variants={nameVariants} initial="initial" animate="animate">
        Fullstack Developer
      </motion.h2>
      <footer>&copy; Crafted with &#128150; by Hemanta Sundaray</footer>
    </div>
  );
};

export default Home;
