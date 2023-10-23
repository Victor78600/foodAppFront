import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReceipePage() {
  const [oneReceipe, setOneReceipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  console.log(params.id);
  useEffect(() => {
    const fetchOneReceipe = async () => {
      try {
        const response = await axios.get(
          `https://foodapp.adaptable.app/meals?id=${params.id}`
        );
        // const filtered = response.data[0].filter((id) => params.id === id);
        // console.log(filtered);
        // const receipeData = response.data[(id =params.id)];
        setOneReceipe(response.data[0]);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchOneReceipe();
  }, [params.id]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!oneReceipe) {
    return <p>Error: Receipe not found</p>;
  }
  const ingredients = oneReceipe.ingredients;

  return (
    <>
      <h2>Receipe</h2>
      <div>
        <img className="photo" src={oneReceipe.image} />
        <h2>{oneReceipe.name}</h2>
        {console.log(ingredients)}
        <div>
          {ingredients.map((ingredient) => {
            return (
              <>
                <li>
                  Ingredient : {ingredient.ingredient} Quantity :
                  {ingredient.quantity}
                </li>
              </>
            );
          })}
        </div>
        <p>Instructions : {oneReceipe.instructions}</p>
        <p>Area : {oneReceipe.area}</p>
      </div>
    </>
  );
}
export default ReceipePage;
