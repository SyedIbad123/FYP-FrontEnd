// import bookmarkImage from "../images/bookmark1.jpeg";

import { useState, useEffect } from "react";

const StylePage = () => {
	const [images, setImages] = useState([]);

	// useEffect(() => {
	// 	const fetchImages = async () => {
	// 		const response = await fetch("bd.json");
	// 		const imageData = await response.json();
	// 		console.log("image data",imageData);
	// 		setImages(imageData);
	// 	};

	// 	fetchImages();
	// }, []);

	return (
		<div>
			<h2>Your Cart</h2>
			{images.map((image) => (
				<img key={image.link} src={image.link} alt={image.filename} />
			))}
		</div>
	);
};

export default StylePage;
