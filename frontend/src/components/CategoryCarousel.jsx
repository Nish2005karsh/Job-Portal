import React, { useState } from 'react';
import { Briefcase, Code, Database, Palette, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code, color: "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200" },
    { name: "Backend Developer", icon: Database, color: "bg-green-50 hover:bg-green-100 text-green-700 border-green-200" },
    { name: "Data Science", icon: Briefcase, color: "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200" },
    { name: "Graphic Designer", icon: Palette, color: "bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200" },
    { name: "FullStack Developer", icon: Layers, color: "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200" }
];

const CategoryCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    };

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        setTimeout(() => setSelectedCategory(null), 2000);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Explore by Category</h2>
                    <p className="text-lg text-gray-600">Find your perfect role across popular job categories</p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-5xl mx-auto">

                    {/* Desktop View */}
                    <div className="hidden lg:block">
                        <div className="flex gap-6 items-center justify-center">
                            {[0, 1, 2].map((offset) => {
                                const index = (currentIndex + offset) % categories.length;
                                const cat = categories[index];
                                const Icon = cat.icon;

                                return (
                                    <div
                                        key={`${cat.name}-desktop-${offset}`}
                                        className={`transition-all duration-300 ${
                                            offset === 1 ? 'scale-110 z-10' : 'scale-95 opacity-70'
                                        }`}
                                    >
                                        <button
                                            onClick={() => handleCategoryClick(cat.name)}
                                            className={`w-64 h-48 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cat.color} flex flex-col items-center justify-center gap-4 p-6`}
                                        >
                                            <div className="p-4 rounded-full bg-white/70 shadow-sm">
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <span className="font-semibold text-base text-center leading-tight">
                                                {cat.name}
                                            </span>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tablet View */}
                    <div className="hidden md:block lg:hidden">
                        <div className="flex gap-6 items-center justify-center">
                            {[0, 1].map((offset) => {
                                const index = (currentIndex + offset) % categories.length;
                                const cat = categories[index];
                                const Icon = cat.icon;

                                return (
                                    <button
                                        key={`${cat.name}-tablet-${offset}`}
                                        onClick={() => handleCategoryClick(cat.name)}
                                        className={`w-64 h-48 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cat.color} flex flex-col items-center justify-center gap-4 p-6`}
                                    >
                                        <div className="p-4 rounded-full bg-white/70 shadow-sm">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <span className="font-semibold text-base text-center leading-tight">
                                            {cat.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden flex justify-center">
                        {(() => {
                            const cat = categories[currentIndex];
                            const Icon = cat.icon;

                            return (
                                <button
                                    key={`${cat.name}-mobile`}
                                    onClick={() => handleCategoryClick(cat.name)}
                                    className={`w-full max-w-sm h-48 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${cat.color} flex flex-col items-center justify-center gap-4 p-6`}
                                >
                                    <div className="p-4 rounded-full bg-white/70 shadow-sm">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <span className="font-semibold text-base text-center leading-tight">
                                        {cat.name}
                                    </span>
                                </button>
                            );
                        })()}
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-gray-900"
                        aria-label="Previous category"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-gray-700 hover:text-gray-900"
                        aria-label="Next category"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {categories.map((cat, index) => (
                        <button
                            key={`dot-${cat.name}-${index}`}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'w-8 bg-gray-700' : 'w-2 bg-gray-300 hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Selected Category Feedback */}
                {selectedCategory && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
                        Searching for {selectedCategory} jobs...
                    </div>
                )}

                {/* Mobile Swipe Hint */}
                <div className="flex justify-center mt-6 md:hidden">
                    <span className="text-sm text-gray-500 flex items-center gap-2">
                        Swipe to explore more →
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
