import { useEffect, useState } from "react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 250);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <div className="scroll-top-btn" onClick={goTop}>
      <i className="fa fa-arrow-up"></i>
    </div>
  );
};

export default ScrollToTop;
