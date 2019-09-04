import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
 
  const [titleValue, setTitleValue] = useState('')
  const [amountValue, setamountValue] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.onSubmit({ title: titleValue, amount: amountValue });
    setTitleValue('');
    setamountValue('');
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
              value={titleValue}
              onChange={e => {
                const { value } = e.target;
                setTitleValue(value)
              }} 
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number"
              id="amount" 
              value={amountValue}
              onChange={e => {
                const { value } = e.target;
                setamountValue(value)
              }} 
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
