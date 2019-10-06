import React, { useState } from 'react';

const initialProducts = [
    {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false
    },
    {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false
    },
    {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false
    },
    {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false
    }
];

export const ProductsContext = React.createContext({
    products: [],
    toggleFavourites: (id) => {},
});

export default props => {
    const [productsList, setProductsList] = useState(initialProducts);

    const toggleFavourites = productId => {
        setProductsList(currentProductsList => {
            const prodIndex = currentProductsList.findIndex(
                p => p.id === productId
            );
            const newFavStatus = !currentProductsList[prodIndex].isFavorite;
            const updatedProducts = [...currentProductsList];
            updatedProducts[prodIndex] = {
                ...currentProductsList[prodIndex],
                isFavorite: newFavStatus
            };
            return updatedProducts;
        })
    };

    return (
        <ProductsContext.Provider
            value={{
                products: productsList,
                toggleFavourites: toggleFavourites,
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    )
}