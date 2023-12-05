import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RecipePage.css";

import { Link } from "react-router-dom";

function ReceipePage() {
  const [oneReceipe, setOneReceipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(null);
  // const [favMember, setFavMember] = useState(null);

  const params = useParams();

  let user = JSON.parse(localStorage.getItem("user"));

  async function updateUser() {
    try {
      const response = await axios.put(
        "https://foodapp.adaptable.app/members/" + user.id,
        user
      );
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(params.id);

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

        // console.log(response.data);

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

  const addToFavorites = (id) => {
    user.favorite.push({ id: String(id) });
    updateUser(user);
    setIsFavorite(true);
  };

  const removeFromFavorites = (id) => {
    user.favorite = user.favorite.filter(
      (favorite) => favorite.id !== String(id)
    );
    updateUser(user);
    setIsFavorite(false);
  };

  // const handleAddToFavorite = async (id) => {
  //   if (isFavorite) {
  //     user.favorite = user.favorite.filter(
  //       (favorite) => favorite.id !== String(id)
  //     );
  //   } else {
  //     user.favorite.push({ id: String(id) });
  //   }

  //   // console.log("Updated User:", user);

  //   await updateUser(user);
  //   setIsFavorite(!isFavorite);
  // };

  return (
    <div>
      <div className="photoIngredient">
        <div className="photoTitle">
          <img className="photo" src={oneReceipe.image} />
          <h2>{oneReceipe.name}</h2>
          <p className="category">Category : {oneReceipe.category}</p>
          <p className="area">Area : {oneReceipe.area}</p>
          <div className="favButton">
            <button
              className="addFav"
              onClick={() => addToFavorites(oneReceipe.id)}
            >
              Add to Favorites
            </button>
            <button
              className="removeFav"
              onClick={() => removeFromFavorites(oneReceipe.id)}
            >
              Remove from Favorites
            </button>
          </div>
        </div>
        <div>
          {/* {console.log(ingredients)} */}
          <div className="title">Ingredients</div>

          <div>
            {ingredients.map((ingredient) => {
              return (
                <>
                  <table className="ingredients">
                    <tbody>
                      <tr>
                        <td>{ingredient.ingredient}: </td>
                        <td className="quantity">{ingredient.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* <li className="quantity">

                </li> */}
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="instructionsBlock">
        <h3>Instructions : </h3>
        <p className="instructionsRecipe">{oneReceipe.instructions}</p>
      </div>
      <div>
        <Link to={oneReceipe.video} target="_blank">
          <button className="video"> Video tutorial </button>
        </Link>
      </div>
    </div>
  );
}
export default ReceipePage;
