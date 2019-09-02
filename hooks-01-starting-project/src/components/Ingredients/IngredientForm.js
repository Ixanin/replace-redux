import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const inputState = useState({
    title: '',
    amout: '',
  });
  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title"
              value={inputState[0].title}
              onChange={e => {
                const { value } = e.target;
                const tes = value;

                inputState[1](prevInputState => ({
                  title: tes,
                  amout: prevInputState.amout
                }))}
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number"
              id="amount" 
              value={inputState[0].amout}
              onChange={e => {
                const { value } = e.target;
                const tes = value;

                inputState[1](prevInputState => ({
                  amout: e.target.value,
                  title: prevInputState.title,
                }))}
              }
             />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
