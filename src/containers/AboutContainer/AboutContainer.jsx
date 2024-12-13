import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaRegPauseCircle,
  FaRegStopCircle,
  FaMicrophone,
} from "react-icons/fa";

const AboutContainer = () => {
  // Ref for the scrolling section
  const sectionRef = useRef(null);

  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // State for follow-up text visibility
  const [isFollowUpVisible, setIsFollowUpVisible] = useState(false);
  const [isFinalFollowUpVisible, setisFinalFollowUpVisible] = useState(false);

  // Update follow-up visibility based on scroll progress
  const handleScrollProgress = useCallback(() => {
    setIsFollowUpVisible(scrollYProgress.get() > 0.15);
    setisFinalFollowUpVisible(scrollYProgress.get() > 0.86);
  }, [scrollYProgress]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", handleScrollProgress);
    return () => unsubscribe();
  }, [scrollYProgress, handleScrollProgress]);

  // Dynamic style transformations
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : 1080;

  const styles = {
    width: useTransform(scrollYProgress, [0.3, 0.55], [screenWidth, 250]), // 15
    height: useTransform(scrollYProgress, [0.5, 0.55], [screenHeight, 500]), // 5
    borderRadius: useTransform(scrollYProgress, [0.5, 0.5001], [0, 30]), // 0.001
    translateX: useTransform(scrollYProgress, [0.4, 0.55], ["25%", "50%"]), //5
    translateY: useTransform(scrollYProgress, [0.3, 0.5], ["0rem", "2rem"]), //10
    backgroundColor: useTransform(
      scrollYProgress,
      [0, 0.05],
      ["#F7FCFF", "#F1F1F1"]
    ),
    paddingTop: useTransform(scrollYProgress, [0.4, 0.55], ["7rem", "3rem"]), // 5
    bezelOpacity: useTransform(scrollYProgress, [0.5, 0.55], [0, 1]), // 10
    borderColor: useTransform(
      scrollYProgress,
      [0.47, 0.55], // 5
      ["#F7FCFF", "#000"]
    ),
    buttonContainerOpacity: useTransform(scrollYProgress, [0.5, 0.55], [0, 1]), //5
    textScrollY: useTransform(scrollYProgress, [0.65, 0.85], [0, -100]), //10
    titleTextSize: useTransform(
      scrollYProgress,
      [0.3, 0.55],
      ["1.25rem", "0.875rem"]
    ), //10
    titleTextlineHeight: useTransform(
      scrollYProgress,
      [0.3, 0.55],
      ["1.75rem", "1.25rem"]
    ), //10
    contentTextSize: useTransform(
      scrollYProgress,
      [0.3, 0.55],
      ["1.875rem", "1.125rem"]
    ), //10
    contentTextLineHeight: useTransform(
      scrollYProgress,
      [0.3, 0.55],
      ["2.25rem", " 1.75rem"]
    ), //10
  };

  // Animation variants
  const followUpTextVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className="w-full">
      {/* Scrolling Section */}
      <section ref={sectionRef} className="relative h-[250vh]">
        {/* Sticky Content */}
        <div className="top-0 sticky w-full h-screen bg-gradient-to-b from-[#16ABFF] to-[#0D6799] flex items-center">
          <div className="w-1/2 h-full pl-20 font-space text-white flex flex-col justify-center">
            <h1 className="text-7xl font-bold  max-w-md">About RoundTable</h1>
            <p className="text-2xl pt-8 font-light">
              At RoundTable, we know that studying can sometimes feel
              overwhelming and disconnected. That’s why we’ve created a platform
              that puts you at the center of your learning experience.{" "}
            </p>
            <p className=" text-2xl pt-8 font-light">
              Upload your{" "}
              <strong className="font-bold">
                notes, textbooks, or articles
              </strong>
              , and let our cutting-edge AI convert them into{" "}
              <strong className="font-bold">dynamic audio discussions</strong>.
              But it doesn’t stop there—these podcasts are interactive. You can
              ask questions, clarify tricky concepts, and guide the
              conversation, making every study session uniquely yours.
            </p>
          </div>
          <motion.div
            id="phoneScreen"
            style={{
              backgroundColor: styles.backgroundColor,
              width: styles.width,
              height: styles.height,
              borderRadius: styles.borderRadius,
              translateX: styles.translateX,
              // translateY: styles.translateY,
              borderColor: styles.borderColor,
              paddingTop: styles.paddingTop,
            }}
            className="right-1/4 translate-x-1/2 absolute text-white overflow-hidden flex flex-col justify-center items-center p-4 font-space border-4 border-gray-800"
          >
            <motion.div
              id="textContainer"
              className="text-container max-w-xs"
              style={{ translateY: styles.textScrollY }}
            >
              <motion.p
                className="text-hostTextTitle font-bold text-xl"
                style={{
                  fontSize: styles.titleTextSize,
                  // lineHeight: styles.titleTextlineHeight,
                }}
              >
                Host
              </motion.p>
              <motion.p
                className="text-hostTextContent text-3xl font-bold leading-tight t-50% leading-tight"
                style={{
                  fontSize: styles.contentTextSize,
                  // // lineHeight: styles.contentTextLineHeight,
                }}
              >
                We believe learning should be as dynamic as you are.
              </motion.p>
              <motion.div
                initial="hidden"
                animate={isFollowUpVisible ? "visible" : "hidden"}
                variants={followUpTextVariants}
              >
                <motion.p
                  className="text-guestTextTitle font-bold text-right text-2xl mt-4"
                  style={{
                    fontSize: styles.titleTextSize,
                    // // lineHeight: styles.titleTextlineHeight,
                  }}
                >
                  Guest
                </motion.p>
                <motion.p
                  className="text-guestTextContent text-4xl text-right font-bold leading-tight"
                  style={{
                    fontSize: styles.contentTextSize,
                    // // lineHeight: styles.contentTextLineHeight,
                  }}
                >
                  RoundTable adapts to your goals—offering quick summaries, deep
                  dives, and fresh ways to learn. It's your study partner,
                  tutor, and discussion all in one.
                </motion.p>
              </motion.div>
              <motion.div
                initial="hidden"
                animate={isFinalFollowUpVisible ? "visible" : "hidden"}
                variants={followUpTextVariants}
              >
                <p className="text-hostTextTitle font-bold text-sm mt-6">
                  Host
                </p>
                <p className="text-hostTextContent text-lg font-bold leading-tight">
                  Let’s make studying smarter, one conversation at a time.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              id="notchContainer"
              style={{ opacity: styles.bezelOpacity }}
              className="test absolute inset-0 pointer-events-none z-2"
            >
              <div
                className="before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-[100px] before:h-[20px] 
                    before:bg-black before:rounded-b-lg before:-translate-x-1/2
                    after:content-[''] after:absolute after:bottom-2 after:left-1/2 after:w-[80px] 
                    after:h-[5px] after:bg-gray-400 after:rounded-lg after:-translate-x-1/2"
              ></div>
            </motion.div>
            <motion.div
              id="buttonContainer"
              style={{ opacity: styles.buttonContainerOpacity }}
              className="absolute bottom-0 mb-14 w-full h-4 flex justify-evenly items-center"
            >
              <FaRegPauseCircle
                color="#333333"
                size={"1.75rem"}
                className="hover:opacity-50 transition-opacity cursor-pointer"
              />
              <div className="interrupt-button bg-[#333333] w-20 h-20 rounded-full flex flex-col justify-center items-center hover:opacity-50 transition-opacity cursor-pointer">
                <FaMicrophone color="#16ABFF" size={"1.5rem"} />
                <p className="font-bold text-[0.6rem] pt-1">Interrupt</p>
                <p className="text-[0.35rem] text-center">hold to record</p>
              </div>
              <FaRegStopCircle
                color="#333333"
                size={"1.75rem"}
                className="hover:opacity-50 transition-opacity cursor-pointer"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutContainer;
