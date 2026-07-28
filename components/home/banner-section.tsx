"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80",
    title: "Find A Place You’ll Love To Call Home",
    description:
      "Discover thousands of rental properties and find the perfect home that matches your lifestyle.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    title: "Modern Homes For Modern Living",
    description:
      "Explore premium apartments, houses and rooms in your favorite locations.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    title: "Easy Rental Experience",
    description:
      "Search, compare and rent your dream property easily with RentNest.",
  },
];

export default function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative min-h-[650px] w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="RentNest Banner"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main Content */}
      <div className="relative container mx-auto flex min-h-[650px] items-center px-5">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center gap-2 font-semibold text-emerald-400"
          >
            <Home size={22} />
            Find Your Perfect Home
          </motion.div>

          {/* Title */}
          <motion.h1
            key={slides[currentSlide].title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            {slides[currentSlide].title}
          </motion.h1>

          {/* Description */}
          <motion.p
            key={slides[currentSlide].description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-xl text-lg text-gray-200"
          >
            {slides[currentSlide].description}
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 rounded-xl bg-white p-4 shadow-2xl"
          >
            <div className="grid gap-3 md:grid-cols-3">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search location..."
                  className="pl-10 text-black"
                />
              </div>

              {/* Property Type */}
              <Input placeholder="Property Type..." className="text-black" />

              {/* Button */}
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                size="lg"
              >
                <Search className="mr-2" />
                Search
              </Button>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              asChild
            >
              <Link href="/properties">Explore Properties</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/add-property">List Your Property</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Previous Button */}
      <Button
        onClick={prevSlide}
        size="icon"
        variant="outline"
        className="absolute left-5 top-1/2 -translate-y-1/2 border-white/30 bg-white/20 text-white hover:bg-white hover:text-black"
      >
        <ChevronLeft />
      </Button>

      {/* Next Button */}
      <Button
        onClick={nextSlide}
        size="icon"
        variant="outline"
        className="absolute right-5 top-1/2 -translate-y-1/2 border-white/30 bg-white/20 text-white hover:bg-white hover:text-black"
      >
        <ChevronRight />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-emerald-500" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}