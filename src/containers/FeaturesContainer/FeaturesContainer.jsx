import React from "react";
import { motion } from "framer-motion";
import Feature from "../../components/Feature";

const FeaturesContainer = () => {
  return (
    <div className="w-screen">
      <section className="relative h-[230vh]">
        <div className="sticky top-0 h-screen bg-heroBackground/70">
          <h1 className="px-20 py-24 relative z-30 font-space text-primary text-7xl font-bold">
            Features
          </h1>

          {/* Floating Background Images */}

          {/* First Image */}
          <motion.img
            className="absolute top-36 -left-28 w-64 pointer-events-none"
            src="/round-table.png"
            alt="RoundTable logo"
            style={{ rotate: "12deg" }} // Set initial rotation
            animate={{
              x: [0, 10, 0, -10, 0], // Move left and right
              y: [0, -20, 0, 20, 0], // Move up and down
              rotate: ["10deg", "14deg", "10deg", "14deg", "10deg"], // Animate rotation
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0,
            }}
          />

          {/* Second Image */}
          <motion.img
            className="absolute top-44 -right-36 w-96 pointer-events-none"
            src="/round-table.png"
            alt="RoundTable logo"
            style={{ rotate: "-12deg" }} // Set initial rotation
            animate={{
              x: [0, -10, 0, 10, 0],
              y: [0, -15, 0, 15, 0],
              rotate: ["-14deg", "-10deg", "-14deg", "-10deg", "-14deg"],
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />

          {/* Third Image */}
          <div className="w-screen absolute top-12 z-9 flex items-start justify-center opacity-30">
            <motion.img
              className="w-52 pointer-events-none"
              src="/round-table.png"
              alt="RoundTable logo"
              style={{ rotate: "12deg" }}
              animate={{
                x: [0, 15, 0, -15, 0],
                y: [0, -25, 0, 25, 0],
                rotate: ["10deg", "14deg", "10deg", "14deg", "10deg"],
              }}
              transition={{
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5,
              }}
            />
          </div>

          {/* Fourth Image */}
          <div className="w-screen absolute bottom-0 ml-24 z-5 flex items-start justify-center opacity-30">
            <motion.img
              className="w-44 pointer-events-none"
              src="/round-table.png"
              alt="RoundTable logo"
              style={{ rotate: "-12deg" }}
              animate={{
                x: [0, -15, 0, 15, 0],
                y: [0, -20, 0, 20, 0],
                rotate: ["-14deg", "-10deg", "-14deg", "-10deg", "-14deg"],
              }}
              transition={{
                duration: 11,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </div>
        </div>
        <div className="absolute top-40 w-full flex flex-col items-center justify-start">
          <Feature
            title="Dynamic AI-Driven Discussions"
            copy="Transform your readings into lively, multi-agent conversations. Our AI hosts analyze, debate, and explain your content in real-time."
            standOut="Why It Stands Out: It's like having a personal panel of experts, available anytime."
            src={"svg-1.svg"}
            textFirst={false}
          />
          <Feature
            title="Speak, Ask, Engage"
            copy="Interrupt, ask questions, or steer the conversation by speaking directly into the app."
            standOut="Why You’ll Love It: You’re not just a listener—you’re part of the discussion."
            src={"svg-2.svg"}
            width={"max-w-xs ml-16"}
          />
          <Feature
            title="Smart Summaries & Notes"
            copy="Wrap up each session with concise and most relevant highlights, so you can quickly absorb key insights and stay prepared for whatever’s next."
            standOut="Why It Matters: Stay prepared and retain information effortlessly."
            src={"svg-3.svg"}
            textFirst={false}
          />
          <Feature
            title="Personalized Podcast Creation"
            copy="Upload files or pick topics, and RoundTable creates tailored podcasts just for you."
            standOut="Why It’s Incredible: Every session is crafted to your unique interests and learning needs."
            src={"svg-4.svg"}
            width={"max-w-xs ml-16"}
          />
        </div>
      </section>
    </div>
  );
};

export default FeaturesContainer;
