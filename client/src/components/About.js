import React from "react";
import { motion } from "framer-motion";

const hiVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const About = () => {
  return (
    <div className="about-page-wrapper">
      <article className="col-10 col-sm-8 col-md-6 mx-auto mt-5">
        <p className="about-page-paragraph">
          <motion.span
            variants={hiVariants}
            initial="initial"
            animate="animate"
          >
            &#128075;
          </motion.span>{" "}
          I'm Hemanta Sundaray, a self-taught fullstack developer based out of
          New Delhi, India. I am passionate about web technologies and work with
          the following tech stack:
        </p>
        <ul className="about-page-list">
          <li>HTML</li>
          <li>CSS</li>
          <li>Bootstrap</li>
          <li>Framer Motion</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Redux Toolkit</li>
          <li>Node</li>
          <li>Express</li>
          <li>MongoDB</li>
        </ul>
        <p className="about-page-paragraph">
          Currently, I am working on a fully-featured e-commerce app using the
          MERN stack. This is the most complex application that I have ever
          attempted to build. Once complete, I will feature it it in the
          projects page.
        </p>
        <p className="about-page-paragraph">
          My goal in 2021 is to level up my backend engineering skills. Besides,
          I will also learn about data structures and algorithms.
        </p>
        <p className="about-page-paragraph">
          I am an avid notetaker.{" "}
          <a href="https://flanker.net/" target="_blank">
            www.flanker.net
          </a>{" "}
          is my blog where I write about web technologies. If you are a web
          developer, you must check out the site as it contains some excellent
          reference material.
        </p>
        <p className="about-page-paragraph">
          Don't shy away from saying hi. You can reach me at rawgrittt@gmail.com
        </p>
      </article>
    </div>
  );
};

export default About;
