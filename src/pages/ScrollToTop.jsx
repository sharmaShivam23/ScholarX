import React, { useEffect, useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-6 right-5 z-50 p-3 rounded-full text-white transition-all bg-[#161D30] border-2 border-white cursor-pointer hover:bg-yellow-600"
        title="Scroll to top"
      >
        <FaArrowUpFromBracket className="text-xl" />
      </div>
    )
  );
};

export default ScrollToTop;
