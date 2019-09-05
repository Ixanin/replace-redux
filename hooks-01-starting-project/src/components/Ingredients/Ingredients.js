import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import { WithLoading } from "../UI/WithLoading";

const ListWithLoading = WithLoading(IngredientList);

const Ingredients = React.memo(props => {

    console.log('RENDER !!!')
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

    const httpReducer = (currHttpState, action) => {
        switch (action.type) {
            case "SEND":
                return { isLoading: true, error: undefined };
            case "RESPONSE":
                return { ...currHttpState, isLoading: false };
            case "CLEAR":
                return { ...currHttpState, error: undefined };
            case "ERROR":
                return { isLoading: false, error: action.message };
            default:
                throw new console.error("Should not get there");
        }
    };

    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        isLoading: false,
        error: undefined
    });
    const [userIndgredients, dispatch] = useReducer(ingredientReducer, []);

    useEffect(() => {
        console.log("RENDERING userIndgredients", userIndgredients);
    }, [userIndgredients]);

    const onFilteredIngredients = useCallback(ingredients => {
        // dispatchHttp({ type: "SEND" });
        dispatch({ type: "SET", ingredients });
    }, []);

    const addIndgrededientHandler = useCallback(ingredient => {
        dispatchHttp({ type: "SEND" });
        fetch("https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json", {
            method: "POST",
            body: JSON.stringify(ingredient),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(responseData => {
                dispatchHttp({ type: "RESPONSE" });

                dispatch({
                    type: "ADD",
                    ingredient: {
                        id: responseData.name,
                        ...ingredient
                    }
                });
            })
            .catch(error => {
                dispatchHttp({ type: "ERROR", message: error.message });
            });
    }, []);

    const removeIndgrededientHandler = useCallback(id => {
        dispatchHttp({ type: "SEND" });
        fetch(
            `https://react-hooks-course-bfa7c.firebaseio.com/ingredients/${id}.json`,
            {
                method: "DELETE"
            }
        )
            .then(responseData => {
                dispatchHttp({ type: "RESPONSE" });
                dispatch({ type: "DELETE", id });
            })
            .catch(error => {
                dispatchHttp({ type: "ERROR", message: error.message });
            });
    }, []);

    const onModalClose = useCallback(() => {
        dispatchHttp({ type: "CLEAR" });
    }, []);

    const listWithLoading = useMemo(() => {
        return (<ListWithLoading
            isLoading={httpState.isLoading}
            ingredients={userIndgredients}
            onRemoveItem={removeIndgrededientHandler}
         />)
    }, [userIndgredients, removeIndgrededientHandler])

    return (
        <div className="App">
            {httpState.error && (
                <ErrorModal onClose={onModalClose}>{httpState.error}</ErrorModal>
            )}
            <IngredientForm onSubmit={addIndgrededientHandler} />

            <section>
                <Search setIngredients={onFilteredIngredients} />
                { listWithLoading }
            </section>
        </div>
    );
});

export default Ingredients;
