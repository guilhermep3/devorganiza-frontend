"use client"
import { ChevronUp } from "lucide-react"
import { Button } from "./button"
import { useEffect, useState } from "react";

export const BackBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;

      setIsVisible(scrollPosition > 300);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={`fixed bottom-5 right-5 md:bottom-10 md:right-10 transition duration-300
      ${isVisible ? 'pointer-events-auto opacity-100' : ' pointer-events-none opacity-0'}
      `}
      onClick={scrollToTop}
    >
      <Button className="py-3! px-3!">
        <ChevronUp className="z-20" />
      </Button>
    </div>
  )
}