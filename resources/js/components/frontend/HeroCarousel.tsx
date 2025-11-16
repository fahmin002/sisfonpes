// HeroCarousel.jsx
// React component (default export) for an Inertia + React + Tailwind project.
// Usage: <HeroCarousel images={images} />
// images: [{ id: 1, src: '/images/hero-school.jpg', alt: 'Pondok Pesantren Darul Amin', caption: '...' }, ...]

import React, { useEffect, useRef, useState } from 'react'

export default function HeroCarousel({ images = [], autoplay = true, interval = 5000 }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)

  const next = () => setIndex(i => (i + 1) % images.length)
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)

  useEffect(() => {
    if (!autoplay || images.length <= 1) return
    timerRef.current = setInterval(() => next(), interval)
    return () => clearInterval(timerRef.current)
  }, [autoplay, images.length, interval])

  const pause = () => clearInterval(timerRef.current)
  const resume = () => {
    if (!autoplay) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => next(), interval)
  }

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchMove = (e) => {
    if (!touchStartX.current) return
    const diff = touchStartX.current - e.touches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) next()
      else prev()
      touchStartX.current = null
    }
  }

  if (!images || images.length === 0) return null

  return (
    <section
      className="relative w-full max-w-full mx-auto"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div className="relative h-72 sm:h-96 overflow-hidden rounded-lg shadow-lg">
        {images.map((img, i) => (
          <div
            key={img.id ?? i}
            className={`absolute inset-0 transition-transform duration-700 ease-out transform ${i === index ? 'translate-x-0 z-20' : i < index ? '-translate-x-full z-10' : 'translate-x-full z-10'}`}
            aria-hidden={i === index ? 'false' : 'true'}
          >
            <img
              src={`/storage/${img.image}`}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {img.description && (
              <div className="absolute left-4 bottom-4 bg-black/40 backdrop-blur-sm text-white px-3 py-2 rounded-md max-w-xl">
                <p className="text-sm sm:text-base">{img.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md focus:outline-none"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="flex gap-2 absolute bottom-3 left-1/2 -translate-x-1/2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full focus:outline-none ${i === index ? 'scale-110' : 'opacity-60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i+1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  )
}
