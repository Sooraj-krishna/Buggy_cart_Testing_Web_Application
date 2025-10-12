import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const banners = [
  {
    id: 1,
    title: "Big Billion Days Sale",
    subtitle: "Up to 80% Off on Electronics",
    image: "https://placehold.co/1920x600/2874f0/ffffff?text=Electronics+Sale",
    link: "/products?category=Electronics"
  },
  {
    id: 2,
    title: "Fashion Fest",
    subtitle: "Trending Styles at Best Prices",
    image: "https://placehold.co/1920x600/f0a82e/ffffff?text=Fashion+Sale",
    link: "/products?category=Fashion"
  },
  {
    id: 3,
    title: "Home Décor Special",
    subtitle: "Transform Your Space",
    image: "https://placehold.co/1920x600/10b981/ffffff?text=Home+Decor",
    link: "/products?category=Home"
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[21/9] sm:aspect-[16/9] overflow-hidden bg-muted">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full relative"
            data-testid={`carousel-slide-${banner.id}`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="text-white max-w-xl">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h2>
                  <p className="text-xl md:text-2xl mb-6">{banner.subtitle}</p>
                  <Button
                    data-testid={`button-shop-${banner.id}`}
                    size="lg"
                    className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm border border-white"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        data-testid="button-carousel-prev"
        size="icon"
        variant="ghost"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        data-testid="button-carousel-next"
        size="icon"
        variant="ghost"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* BUG: UI inconsistency - carousel dots misaligned and wrong color */}
      <div className="absolute bottom-20 left-0 flex gap-8">
        {banners.map((_, index) => (
          <button
            key={index}
            data-testid={`button-carousel-dot-${index}`}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-destructive" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
