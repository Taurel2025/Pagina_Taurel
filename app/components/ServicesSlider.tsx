import { useState, useEffect } from 'react';
import { useLanguage } from '~/contexts/LanguageContext';
import asesoria from '../assets/home-carousel/aseoria-y-aduanas.png';
import transporteCarga from '../assets/home-carousel/transportedecarga.png';
import aduanas from '../assets/home-carousel/aseoria-y-aduanas.png';
import transporteTerrestre from '../assets/home-carousel/transporteterrestre.png';
import navieros from '../assets/home-carousel/trasnporte-carga.png';
import almacenamiento from '../assets/home-carousel/almacenamiento.png';
import compras from '../assets/home-carousel/compras-internacioles.png';

interface ServicesSliderProps {
  className?: string;
}

export default function ServicesSlider({ className = '' }: ServicesSliderProps) {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const services = [
    {
      title: t('services.slider.service1.title'),
      description: t('services.slider.service1.description'),
      image: asesoria,
      textAlign: 'left'
    },
    {
      title: t('services.slider.service3.title'),
      description: t('services.slider.service3.description'),
      image: transporteCarga,
      textAlign: 'right'
    },
    {
      title: t('services.slider.service2.title'),
      description: t('services.slider.service2.description'),
      image: aduanas,
      textAlign: 'left'
    },
    {
      title: t('services.slider.service6.title'),
      description: t('services.slider.service6.description'),
      image: almacenamiento,
      textAlign: 'right'
    },
    {
      title: t('services.slider.service4.title'),
      description: t('services.slider.service4.description'),
      image: transporteTerrestre,
      textAlign: 'left'
    },
    {
      title: t('services.slider.service7.title'),
      description: t('services.slider.service7.description'),
      image: compras,
      textAlign: 'right'
    },
    {
      title: t('services.slider.service5.title'),
      description: t('services.slider.service5.description'),
      image: navieros,
      textAlign: 'left'
    }
  ];

  const totalSlides = services.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className={`slider-container ${className}`}>
      {services.map((service, index) => (
        <div
          key={index}
          className={`slide slide-${index + 1} ${activeSlide === index ? 'active' : ''}`}
          style={{
            backgroundImage: `linear-gradient(${service.textAlign === 'left'
              ? '270deg, rgba(26, 144, 206, 0) 0%, rgba(26, 144, 206, 0.5) 43.32%, #1a90ce 99.19%'
              : '90deg, rgba(26, 144, 206, 0) 0%, rgba(26, 144, 206, 0.5) 43.32%, #1a90ce 99.19%'
              }), url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="slide-content">
            <div className={`slide-text slide-text-${service.textAlign}`}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Slider Navigation */}
      <div className="slider-arrows">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          className="slider-arrow slider-arrow-right"
          onClick={nextSlide}
          aria-label="Slide siguiente"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </button>
      </div>
    </div>
  );
}