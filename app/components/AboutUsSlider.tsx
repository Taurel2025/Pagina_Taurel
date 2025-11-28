import React, { useState, useEffect } from "react";
import { useLanguage } from "~/contexts/LanguageContext";

interface AboutUsSliderProps {
  className?: string;
}

export default function AboutUsSlider({ className = "" }: AboutUsSliderProps) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (slideIndex: number) => {
    setActiveSlide(slideIndex);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 1 ? 0 : 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`about-slider-container ${className}`}>
      <div
        className={`about-slide about-slide-1 ${activeSlide === 0 ? "active" : ""}`}
      >
        <div className="about-slide-content">
          <div className="about-slide-text about-slide-text-left">
            <h2>{t('aboutUs.mission.title')}</h2>
            <p>
              {t('aboutUs.mission.paragraph1')}
            </p>
            <p>
              {t('aboutUs.mission.paragraph2')}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`about-slide about-slide-2 ${activeSlide === 1 ? "active" : ""}`}
      >
        <div className="about-slide-content">
          <div className="about-slide-text about-slide-text-right">
            <h2>{t('aboutUs.vision.title')}</h2>
            <p>
              {t('aboutUs.vision.paragraph1')}
            </p>
            <p>
              {t('aboutUs.vision.paragraph2')}
            </p>
          </div>
        </div>
      </div>

      <div className="about-slider-arrows">
        <button
          className="about-slider-arrow about-slider-arrow-left"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="about-slider-arrow about-slider-arrow-right"
          onClick={nextSlide}
          aria-label="Slide siguiente"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
