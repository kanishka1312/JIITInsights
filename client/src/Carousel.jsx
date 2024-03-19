import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideContainerRef = useRef(null);

    const slidesData = [
        {
            name: 'ffortisimo',
            description: 'The Music Society of JIIT 128.',
            imageUrl: 'images/1.jpg',
        },
        {
            name: 'vamunique',
            description: 'The Western Dance Society of JIIT 128.',
            imageUrl: 'images/2.jpg',
        },
        {
            name: 'bhangde te sartaaj',
            description: 'The Bhangra Society of JIIT 128.',
            imageUrl: 'images/3.jpg',
        },
        {
            name: 'abhivyakti',
            description: 'The Dramatics Society of JIIT 128.',
            imageUrl: 'images/4.jpg',
        },
        {
            name: 'jiityouthclub',
            description: 'The Public Relations Society of JIIT 128.',
            imageUrl: 'images/5.jpg',
        },
        {
            name: 'aakriti',
            description: 'The Fine Arts society of JIIT 128',
            imageUrl: 'images/6.jpg',
        },
    ];

    const nextSlide = () => {
        const slideContainer = slideContainerRef.current;
        if (slideContainer) {
            const firstSlide = slideContainer.querySelector('.item');
            slideContainer.appendChild(firstSlide);
            setCurrentIndex((currentIndex + 1) % slidesData.length);
        }
    };

    const prevSlide = () => {
        const slideContainer = slideContainerRef.current;
        if (slideContainer) {
            const slides = slideContainer.querySelectorAll('.item');
            const lastSlide = slides[slides.length - 1];
            slideContainer.prepend(lastSlide);
            setCurrentIndex((currentIndex - 1 + slidesData.length) % slidesData.length);
        }
    };

    return (
        <div className="container">
            <div id="slide" ref={slideContainerRef}>
                {slidesData.map((slide, index) => (
                    <div
                        key={index}
                        className={`item ${currentIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                        <div className="content">
                            <div className="name">{slide.name}</div>
                            <div className="des">{slide.description}</div>
                            <Link to={`/society/${encodeURIComponent(slide.name)}`}>
                                <button style={{
                                    backgroundColor: '#2c3e50', // Dark background color
                                    color: '#ecf0f1',           // Light text color
                                    padding: '10px 20px',       // Adjust padding as needed
                                    border: 'none',             // Remove border
                                    borderRadius: '5px',        // Add border-radius for rounded corners
                                    cursor: 'pointer',          // Add pointer cursor on hover
                                }}>
                                    Know more
                                </button>

                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="buttons">
                <button id="prev" onClick={prevSlide}>
                    <i className="fa-solid fa-angle-left fa-fade">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </i>
                </button>
                <button id="next" onClick={nextSlide}>
                    <i className="fa-solid fa-angle-right fa-fade">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </i>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
