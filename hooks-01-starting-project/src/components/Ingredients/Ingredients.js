import React, { useReducer, useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import { WithLoading } from "../UI/WithLoading";

const ListWithLoading = WithLoading(IngredientList);

const Ingredients = React.memo(props => {
  const ingredientReducer = (currentIngridients, action) => {
    switch (action.type) {
      case "SET":
        return action.ingredients;
      case "ADD":
        return [...currentIngridients, action.ingredient];
      case "DELETE":
        return currentIngridients.filter(
          ingredient => ingredient.id !== action.id
        );
      default:
        throw new console.error("Should not get there");
    }
  };

  const [userIndgredients, dispatch] = useReducer(ingredientReducer, []);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    console.log("RENDERING userIndgredients", userIndgredients);
  }, [userIndgredients]);

  const onFilteredIngredients = useCallback(ingredients => {
    setLoading(false);
    dispatch({ type: "SET", ingredients });
  }, []);

  const addIndgrededientHandler = ingredient => {
    setLoading(true);
    fetch("https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(responseData => {
        setLoading(false);

        dispatch({
          type: "ADD",
          ingredient: {
            id: responseData.name,
            ...ingredient
          }
        });
      });
  };

  const removeIndgrededientHandler = id => {
    setLoading(true);
    fetch(
      `https://react-hooks-course-bfa7c.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE"
      }
    )
      .then(responseData => {
        setLoading(false);
        dispatch({type: 'DELETE', id})
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const onModalClose = () => {
    setError(undefined);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={onModalClose}>{error}</ErrorModal>}
      <IngredientForm onSubmit={addIndgrededientHandler} />

      <section>
        <Search setIngredients={onFilteredIngredients} />
        <ListWithLoading
          isLoading={isLoading}
          ingredients={userIndgredients}
          onRemoveItem={removeIndgrededientHandler}
        />
      </section>
    </div>
  );
});

export default Ingredients;
