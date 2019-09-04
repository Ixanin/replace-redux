import React, { useState, useEffect, useCallback } from 'react';


import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import { WithLoading } from '../UI/WithLoading';

const ListWithLoading = WithLoading(IngredientList);

const Ingredients = React.memo(props => {

  const [userIndgredients, setUserIngredients] = useState([]);
  const [ isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log('RENDERING userIndgredients', userIndgredients)
  }, [userIndgredients])

  const onFilteredIngredients = useCallback(ingredients => {
    setUserIngredients(ingredients)
  }, [])

  const addIndgrededientHandler = ingredient => {
    setLoading(true);
    fetch('https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json', 
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(responseData => {
      setLoading(false);
      setUserIngredients(prevIngredients => [...prevIngredients, 
        {
           id: responseData.name,
           ...ingredient 
        }]);
    })
  }

  const removeIndgrededientHandler = id => {
    setLoading(true);
    fetch(`https://react-hooks-course-bfa7c.firebaseio.com/ingredients/${id}.json`, 
    {
      method: 'DELETE',
    })
    .then(responseData => {
      setLoading(false);
      setUserIngredients(prevIngredients => 
        prevIngredients.filter(ingredient => ingredient.id !== id))
    })
  }

  return (
    <div className="App">
      <IngredientForm 
        onSubmit={addIndgrededientHandler}
      />

      <section>
        <Search setIngredients={onFilteredIngredients}/>
        <ListWithLoading
          isLoading={true}
          ingredients={userIndgredients}
          onRemoveItem={removeIndgrededientHandler}
        />
      </section>
    </div>
  );
}
)

export default Ingredients;
