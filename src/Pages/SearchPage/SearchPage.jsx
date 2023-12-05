import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SearchPage.css";
/* import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css"; */
/* import Carousel from "./Carousel"; */
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function SearchPage() {
  const [allMeals, setAllMeals] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  /* let currentCategory = categories;
  let currentCountry = countries;
 */
  async function fetchFilter() {
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");
      const mealData = response.data;
      setAllMeals(mealData);
      let uniqueCategories = [
        ...new Set(mealData.map((meal) => meal.category)),
      ];
      uniqueCategories = uniqueCategories.filter(Boolean);
      let uniqueCountries = [...new Set(mealData.map((meal) => meal.area))];
      uniqueCountries = uniqueCountries.filter(Boolean);
      setCategories(uniqueCategories);
      setCountries(uniqueCountries);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(categories);

  useEffect(() => {
    fetchFilter();
  }, []);

  if (!categories) {
    return <p>Loading...</p>;
  }

  /* const filteredMeals = selectedCategory
    ? allMeals.filter((meal) => meal.category === selectedCategory)
    : allMeals; */
  function getRandomDish(categoryOrArea) {
    const matchingDishes = allMeals.filter(
      (meal) => meal.category === categoryOrArea || meal.area === categoryOrArea
    );

    if (matchingDishes.length > 0) {
      const randomDish =
        matchingDishes[Math.floor(Math.random() * matchingDishes.length)];
      return randomDish.image;
    }

    return "https://zechef.com/wp-content/uploads/2020/09/saucisse-droite-ardeche-boutiquedessaucissons.jpg"; // Replace with the actual path to a placeholder image
  }

  const handleDragStart = (e) => e.preventDefault();

  const mappingCategories = categories.map((category) => {
    // console.log(category);
    return (
      <Link
        className="newLink"
        key={category}
        to={`/search/${category.toLowerCase()}`}
      >
        <div className="category">
          <div className="category-img">
            <img
              src={getRandomDish(category)}
              style={{ height: "10vw" }}
              alt={`${category} Image`}
            />
          </div>
          <div className="category-info">
            <h3>{category}</h3>
          </div>
        </div>
      </Link>
    );
  });

  const mappingCountries = countries.map((country) => {
    return (
      <Link
        className="newLink"
        key={country}
        to={`/search/area/${country.toLowerCase()}`}
      >
        <div className="country">
          <div className="country-img">
            <img
              src={getRandomDish(country)}
              style={{ height: "10vw" }}
              alt={`${country} Image`}
            />
          </div>
          <div className="category-info">
            <h3>{country}</h3>
          </div>
        </div>
      </Link>
    );
  });

  /* // Defining the carousel-related variables and states
  const slideWidth = 30;
  const length = mappingCategories.length;
  const bigLength = mappingCategories.length;

  const [items, setItems] = useState(Array.from(Array(bigLength).keys()));
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Defining functions for previous and next clicks
  const prevClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i + jump) % bigLength]);
      });
    }
  };

  const nextClick = (jump = 1) => {
    if (!isTicking) {
      setIsTicking(true);
      setItems((prev) => {
        return prev.map((_, i) => prev[(i - jump + bigLength) % bigLength]);
      });
    }
  };

  // Handling the dot click event
  const handleDotClick = (idx) => {
    if (idx < activeIdx) prevClick(activeIdx - idx);
    if (idx > activeIdx) nextClick(idx - activeIdx);
  };

  // Using the useEffect hook to control the timing of transitions and update the active index
  useEffect(() => {
    if (isTicking) sleep(300).then(() => setIsTicking(false));
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((bigLength - (items[0] % bigLength)) % bigLength);
  }, [items]);

  // Create the CarouselSlideItem component
  const CarouselSlideItem = ({ pos, idx }) => {
    const item = createItem(pos, idx);

    return (
      <div className="carousel__slide-item" style={item.styles}>
        {mappingCategories[idx]}{" "}
        //{/* Replace this with your mapped category component 
      </div>
    );
  }; */

  const responsiveSettings = [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <>
      <h1>What do you want to cook today ?</h1>
      <div className="all-categories">
        <h2>Categories : </h2>
        <div>
          <Slide
            slidesToScroll={2}
            slidesToShow={2}
            indicators={true}
            responsive={responsiveSettings}
          >
            {mappingCategories}
          </Slide>
        </div>
        {/* <div className="carousel__wrap">
          <div className="carousel__inner">
            <button
              className="carousel__btn carousel__btn--prev"
              onClick={() => prevClick()}
            >
              <i className="carousel__btn-arrow carousel__btn-arrow--left" />
            </button>
            <div className="carousel__container">
              <div className="carousel__slide-list">
                {items.map((pos, i) => (
                  <CarouselSlideItem key={i} idx={i} pos={pos} />
                ))}
              </div>
            </div>
            <button
              className="carousel__btn carousel__btn--next"
              onClick={() => nextClick()}
            >
              <i className="carousel__btn-arrow carousel__btn-arrow--right" />
            </button>
            <div className="carousel__dots">
              {items.slice(0, length).map((pos, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={i === activeIdx ? "dot active" : "dot"}
                />
              ))}
            </div>
          </div>
        </div> */}

        {/* <AliceCarousel
          mouseTracking
          touchTracking
          items={mappingCategories}
          infinite
          showSlideInfo={true}
          // preventEventOnTouchMove={preventEventOnTouchMove}
          // mouseTrackingEnabled={mouseTrackingEnabled}
          responsive={{
            0: { items: 2 },
            568: { items: 4 },
            1024: { items: 6 },
          }}
        /> */}
        {/* 
        {categories.map((category) => {
          // console.log(category);
          return (
            <Link key={category} to={`/search/${category.toLowerCase()}`}>
              <div className="category">
                <div className="category-img">
                  <img
                    src={getRandomDish(category)}
                    style={{ height: "10vw" }}
                    alt={`${category} Image`}
                  />
                </div>
                <div className="category-info">
                  <h3>{category}</h3>
                </div>
              </div>
            </Link>
          );
        })} */}
      </div>
      <div className="all-countries">
        <h2>Countries :</h2>
        <div>
          <Slide
            slidesToScroll={2}
            slidesToShow={2}
            indicators={true}
            responsive={responsiveSettings}
            infinite
          >
            {mappingCountries}
          </Slide>
        </div>
        {/*  <AliceCarousel
          mouseTracking
          items={mappingCountries}
          infinite
          showSlideInfo={true}
          //preventEventOnTouchMove={preventEventOnTouchMove}
          //mouseTrackingEnabled={mouseTrackingEnabled} 
          responsive={{
            0: { items: 2 },
            600: { items: 4 },
            960: { items: 6 },
          }}
        /> */}
        {/* {countries.map((country) => {
          return (
            <Link key={country} to={`/search/area/${country.toLowerCase()}`}>
              <div className="country">
                <div className="country-img">
                  <img
                    src={getRandomDish(country)}
                    style={{ height: "10vw" }}
                    alt={`${country} Image`}
                  />
                </div>
                <div className="category-info">
                  <h3>{country}</h3>
                </div>
              </div>
            </Link>
          );
        })} */}
      </div>
    </>
  );
}

export default SearchPage;
