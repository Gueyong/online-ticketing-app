/* import { useState } from 'react';

export default function WelcomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/images/landing-1.jpeg',
    '/images/landing-2.jpeg',
    '/images/landing-3.jpeg',
  ];

  const texts = [
    'Join us for the Olympic Games!',
    'Experience the thrill of world-class athletes!',
    'Celebrate the spirit of sportsmanship!',
  ];

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  return (
    <div id="home" className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex justify-start space-x-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded">Login</button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded">Continue the Visit</button>
      </div>

      <div className="flex justify-end items-center h-16 pr-8">
        <h1 className="text-2xl font-bold">Welcome to the Olympic Games</h1>
      </div>

      <div className="relative w-4/5 h-64 mt-8">
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-blue-500 rounded-sm px-2 py-1"
          onClick={handlePrevImage}
        >
          Previous
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-blue-500 rounded-sm px-2 py-1"
          onClick={handleNextImage}
        >
          Next
        </button>
        <img src={images[currentImage]} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="text-center mt-4">
        <p>{texts[currentImage]}</p>
      </div>
    </div>
  );
} */