// import bookmarkImage from "../images/bookmark1.jpeg";

import axios from "axios";
import { useState, useEffect } from "react";

const StylePage = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		// const fetchImages = async () => {
		// 	const response = await fetch("bd.json");
		// 	const imageData = await response.json();
		// 	console.log("image data",imageData);
		// 	setImages(imageData);
		// };

		// fetchImages();
		console.log("USE EFFECT =====")
		const url = 'http://localhost:8000/api/v2/image/get-all-images';
		// Making the GET request using Axios
		axios.get(url)
		.then(response => {
			console.log('Response: IMAGES', response.data);
			setImages(response?.data?.images)
			// Handle response data
		})
		.catch(error => {
			console.error('Error:', error);
			// Handle error
		});
	}, []);
	

	console.log(images);

	return (
		<div>
			<h2>Your Cart</h2>
			{images.map((image) => (
				<img key={image?.imageUrl} src={image.imageUrl} alt={image?.filename} />
			))}
		</div>
	);
};

export default StylePage;
