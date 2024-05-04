// ProductContext.js (Create a separate file for context)
import React, { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	const [cartProducts, setCartProducts] = useState([]);
	const [customProductData, setCustomProductData] = useState(null);

	const addToCart = (product) => {
		setCartProducts([...cartProducts, product]);
		setCustomProductData(product);

		// Persistence with localStorage (Example)
		localStorage.setItem(
			"cartProducts",
			JSON.stringify([...cartProducts, product])
		);
	};

	useEffect(() => {
		// Load existing data from localStorage if it exists
		const savedCart = localStorage.getItem("cartProducts");
		if (savedCart) {
			setCartProducts(JSON.parse(savedCart));
		}
	}, []);

	console.log("custome product in ontext : ", customProductData);
	console.log("cart product in ontext : ", cartProducts);

	return (
		<ProductContext.Provider value={{ cartProducts, addToCart }}>
			{children}
		</ProductContext.Provider>
	);
};

export { ProductContext, ProductProvider };
