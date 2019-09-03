import React, { useState } from 'react';


import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = React.memo(props => {

  const [userIndgredients, setUserIngredients] = useState([]);

  const addIndgrededientHandler = ingredient => {
    fetch('https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json', 
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData.name)
      setUserIngredients(prevIngredients => [...prevIngredients, 
        {
           id: responseData.name,
           ...ingredient 
        }]);
    })
  }

  const removeIndgrededientHandler = id => {
    setUserIngredients(prevIngredients => 
      prevIngredients.filter(ingredient => ingredient.id !== id))
  }

  return (
    <div className="App">
      <IngredientForm 
        onSubmit={addIndgrededientHandler}
      />

      <section>
        <Search />
        <IngredientList
          ingredients={userIndgredients}
          onRemoveItem={removeIndgrededientHandler}
        />
      </section>
    </div>
  );
}
)

export default Ingredients;
