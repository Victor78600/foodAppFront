import React from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
/* import url from "https://foodapp.adaptable.app/meals"; */
import axios from "axios";
import "./HomePage.css";

function HomePage() {
  const [searchParams] = useSearchParams();
  const [meals, setMeals] = useState(null);
  /* const [search, setSearch] = useState(""); */
  const query = searchParams.get("query");

  // let currentMeals = meals;

  async function fetchMeals() {
    // console.log("Fetching", query);
    try {
      const response = await axios.get("https://foodapp.adaptable.app/meals");

      setMeals(response.data.filter((x) => Boolean(x.ingredients)));
    } catch (error) {
      console.log(error);
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  if (!meals) {
    return <p>Loading...</p>;
  }

  let filteredMeals;
  if (query) {
    filteredMeals = meals.filter((meal) => {
      console.log(meal);
      // Check if some ingredients have a specific value
      const isThereTheIngredient = meal.ingredients.some((ingredient) => {
        const myRegex = new RegExp(query, "gi");
        return myRegex.test(ingredient.ingredient);
      });

      const queryRegex = new RegExp(query, "gi");
      const isThereTheName = queryRegex.test(meal.name);
      const isThereTheCountry = queryRegex.test(meal.area);
      const isThereTheCategory = queryRegex.test(meal.category);

      return (
        isThereTheIngredient ||
        isThereTheName ||
        isThereTheCountry ||
        isThereTheCategory
      );
    });
  } else {
    filteredMeals = meals;
  }

  /* console.log("meal", meals); */

  /* shuffleArray(filteredMeals); */

  return (
    <>
      <div className="container">
        {filteredMeals.map((meal) => {
          return (
            <Link
              key={meal.id}
              to={`/meals/${meal.id}`}
              data-hidden={meal.data_hidden ? meal.data_hidden : "false"}
            >
              <div className="meal">
                <div className="meal-img">
                  <img src={meal.image} alt={`${meal.name} Image`} />
                </div>
                <div className="meal-info">
                  <h3>{meal.name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default HomePage;
