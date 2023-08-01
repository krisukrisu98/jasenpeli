import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../App.css';

const WordCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const words = Array.from(carousel.children);

    const tl = gsap.timeline({ repeat: -1 });

    words.forEach((word, index) => {
      gsap.set(word, { y: '100%', opacity: 0, transformPerspective: 800 });

      tl.fromTo(
        word,
        { y: 0, opacity: 0, rotateX: 0 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1 }
      )
        .to(word, { y: -20, opacity: 0, rotateX: 90, duration: 1 }, '+=1');
    });

    return () => {
      tl.kill(); // Pysäyttää animaation komponentin purkaessa
    };
  }, []);

  return (
    <div className='liikkuvaTeksti' ref={carouselRef}>
      <p>Yhteisö ja verkosto</p>
      <p>Vaikuttamistyö <br></br>ja Edunvalvonta</p>
      <p>Tapahtumat</p>
      <p>Urapalvelut</p>
      <p>Lakipalvelut</p>
      <p>Jäsenedut</p>
    </div>
  );
};

export default WordCarousel;
