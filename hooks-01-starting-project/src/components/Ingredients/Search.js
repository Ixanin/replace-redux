import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ setIngredients }) => {
  const [ inputValue, setInputValue ] = useState('')

  useEffect(() => {
    const query =
    inputValue.trim().length === 0
      ? ''
      : `?orderBy="title"&equalTo="${inputValue}*"`;

    fetch(`https://react-hooks-course-bfa7c.firebaseio.com/ingredients.json` + query)
    .then(response => response.json()) 
    .then(responseData => {
      const keys = Object.keys(responseData)
      const loadedIngredients = keys.reduce((acc, key) => {
        acc.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
        return acc;
      }, []);

      setIngredients(loadedIngredients)
    })
  }, [inputValue, setIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
           />
        </div>
      </Card>
    </section>
  );
});

export default Search;
