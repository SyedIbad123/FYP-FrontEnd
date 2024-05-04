import React from "react";
import DesignYourProduct from "./DesignYourProduct";
import ProductColor from "./ProductColor";
import Product from "../Product/Product";
import { useState, useContext } from "react";
// import { ProductContext } from "../Product/ProductContext/ProductContext";
// import { useNavigate } from "react-router-dom";

const Designing = ({ props }) => {
	const [selectedColor, setSelectedColor] = useState("white");
	const [selectedImage, setSelectedImage] = useState(null);
	const [textAdded, setTextAdded] = useState(false);
	const [imageUpdateTrigger, setImageUpdateTrigger] = useState(0);
	const [textUpdateTrigger, setTextUpdateTrigger] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleProductSelect = (newProduct) => {
		setSelectedProduct(newProduct);
	};

	const handleImageSelect = (imageDataUrl) => {
		console.log("handleImageSelect called with:");
		setSelectedImage(imageDataUrl);
		setImageUpdateTrigger(imageUpdateTrigger + 1);
	};

	const handleAddText = (text) => {
		// Allow passing text
		console.log("handleAddText called with:");
		setTextAdded(false);
		setTextUpdateTrigger(textUpdateTrigger + 1);
	};

	// const { addToCart } = useContext(ProductContext);

	// const navigate = useNavigate();

	// const handleContinue = () => {
	// 	const customProductData = {
	// 		// type: selectedProduct,
	// 		image: "../Product/images/redbag.png", // Make sure this is the image data (URL or base64)
	// 		// text: currentText,
	// 		// color: selectedColor,
	// 		// ...other customizations
	// 	};

	// 	addToCart(customProductData);
	// 	navigate("/styles");
	// };
	// console.log("selected Image: ", selectedImage);

	return (
		<section
			style={{ 
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}>
			<section
				style={{
					height: "120vh",
				}}>
				{/* <SelectProduct
					onProductChange={handleProductSelect}
					selectedColor={selectedColor}
					selectedImage={selectedImage}
					textAdded={textAdded} 
					onAddText={handleAddText}
					textUpdateTrigger={textUpdateTrigger}
					imageUpdateTrigger={imageUpdateTrigger}
					selectedProduct={selectedProduct}
				/> */}
				{/* <SelectProduct onProductSelect={handleProductSelect} /> */}

				<DesignYourProduct
					onImageSelect={handleImageSelect}
					onAddText={handleAddText}
					setSelectedImage={setSelectedImage}
					textAdded={textAdded}
					selectedImage={selectedImage}
				/>
				<hr
					style={{
						margin: "50px 0",
						width: "110%",
					}}
				/>
				<hr
					style={{
						position: "absolute",
						width: "0.5px",
						height: "115vh",
						left: "45.9%",
						top: "17%",
						backgroundColor: "black",
					}}
				/>
				<ProductColor
					selectedColor={selectedColor}
					onColorChange={setSelectedColor}
				/>

				<hr
					style={{
						margin: "50px 0",
						width: "110%",
					}}
				/>

				<button
					// onClick={handleContinue}
					style={{
						position: "absolute",
						left: "5%",
						top: "117%",
						padding: "15px 25px",
						width: "30%",
						backgroundColor: "blue",
						color: "white",
						border: "none",
						borderRadius: "20px",
						cursor: "pointer",
					}}>
					Continue
				</button>
			</section>
			<section>
				<Product
					selectedColor={selectedColor}
					selectedImage={selectedImage}
					textAdded={textAdded}
					onAddText={handleAddText}
					textUpdateTrigger={textUpdateTrigger}
					imageUpdateTrigger={imageUpdateTrigger}
					selectedProduct={selectedProduct}
				/>
			</section>
		</section>
	);
};

export default Designing;
