'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import green from '@/assets/green-sofa.jpg'
import classic from '@/assets/classic.jpg'
import gatewood from '@/assets/gatewood.jpg'
import gray from '@/assets/gray-sofa.jpg'
import orange from '@/assets/orange-sofa.jpg'

const sofas = [
    {image: green, alt: 'Comfy Green Sofa'},
    {image: orange, alt: 'Comfy Green Sofa'},
    {image: gray, alt: 'Comfy Green Sofa'},
    {image: gatewood, alt: 'Comfy Green Sofa'},
    {image: classic, alt: 'Comfy Green Sofa'}
]

export default function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) =>
        prevIndex < sofas.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full md:flex-row rounded-lg overflow-hidden" style={{ boxShadow: '0 0 0.5rem rgba(0, 0, 0, 0.9)'}}>
      {sofas.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={`w-full h-full absolute top-0 left-0 transition-all ease-in-out duration-500 ${
            index === currentImage
              ? 'z-10 opacity-100 transform scale-100 translate-x-0 rotate-0'
              : 'opacity-0 transform scale-[1.1] translate-x-[-1rem] rotate-[-10deg]'
          }`}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
