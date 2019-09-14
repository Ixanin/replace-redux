import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import { WithLoading } from "../UI/WithLoading";
import useHttp from '../../hooks/httpHook';

const ListWithLoading = WithLoading(IngredientList);

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

const Ingredients = React.memo(props => {

    const {isLoading, data, error, sendRequest, requestExtra} = useHttp();
    const [userIndgredients, dispatch] = useReducer(ingredientReducer, []);

    useEffect(() => {
        console.log(requestExtra)
        dispatch({ type: "DELETE", id: requestExtra });
    }, [data, requestExtra]);

    const onFilteredIngredients = useCallback(ingredients => {
        // dispatchHttp({ type: "SEND" });
        dispatch({ type: "SET", ingredients });
    }, []);

    const addIndgrededientHandler = useCallback(ingredient => {
        const url = 'https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json'
        sendRequest(url, 'POST', JSON.stringify(ingredient))
    }, []);

    const removeIndgrededientHandler = useCallback(id => {
        const url = `https://react-hooks-course-bfa7c.firebaseio.com/ingredients/${id}.json`
        
        sendRequest(url, "DELETE", null, id)
    }, [sendRequest]);

    const onModalClose = useCallback(() => {
        // dispatchHttp({ type: "CLEAR" });
    }, []);

    const listWithLoading = useMemo(() => {
        return (<ListWithLoading
            isLoading={isLoading}
            ingredients={userIndgredients}
            onRemoveItem={removeIndgrededientHandler}
         />)
    }, [userIndgredients, removeIndgrededientHandler])

    return (
        <div className="App">
            {error && (
                <ErrorModal onClose={onModalClose}>{error}</ErrorModal>
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
