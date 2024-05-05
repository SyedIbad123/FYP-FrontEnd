import React from "react";
import DesignYourProduct from "./DesignYourProduct";
import ProductColor from "./ProductColor";
// import Product from "../Product/Product";
import { useState } from "react";
import SelectProduct from "../Product/SelectProduct.jsx";
import Keychain from "../Product/Keychain.jsx";
import GoodieBag from "../Product/GoodieBag.jsx";
import Bookmarks from "../Product/Bookmark.jsx";
import ProductColorSilver from "../UI/ProductColor/KeychainProductColor/ProductColorSilver.jsx";
import ProductColorGolden from "../UI/ProductColor/KeychainProductColor/ProductColorGolden.jsx";
import ProductColorBlack from "./ProductColor/GoodiebagProductColor/ProductColorBlack.jsx";
import ProductColorWhitie from "./ProductColor/GoodiebagProductColor/ProductColorWhite.jsx";
import ProductColorWhiteBookmark from "./ProductColor/BookmarkProductColor/ProductColorWhiteBookmark.jsx";
import ProductColorBlackBookmark from "./ProductColor/BookmarkProductColor/ProductColorBlackBookmark.jsx";
import ProductColorGoldenBookmark from "./ProductColor/BookmarkProductColor/ProductColorGoldenBookmark.jsx";

const Designing = ({ props }) => {
	const [selectedColor, setSelectedColor] = useState("white");
	const [selectedImage, setSelectedImage] = useState(null);
	const [textAdded, setTextAdded] = useState(false);
	const [imageUpdateTrigger, setImageUpdateTrigger] = useState(0);
	const [textUpdateTrigger, setTextUpdateTrigger] = useState(0);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleProductSelect = (product) => {
		setSelectedProduct(product);
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
				// height: "120vh",
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
						height: "155vh",
						left: "45.9%",
						top: "13%",
						backgroundColor: "black",
					}}
				/>
				{/* <ProductColor
					selectedColor={selectedColor}
					onColorChange={setSelectedColor}
				/> */}
				{/* <ProductColor
					selectedColor={selectedColor}
					onColorChange={setSelectedColor}
				/> */}

				{/* <hr
					style={{
						margin: "50px 0",
						width: "110%",
					}}
				/> */}
			</section>
			<section>
				<div>
					<SelectProduct onProductSelect={handleProductSelect} />
				</div>
				<div>
					{selectedProduct === "keychain" && (
						<>
							<Keychain
								selectedColor={selectedColor}
								selectedImage={selectedImage}
								textAdded={textAdded}
								// handleAddText={onAddText}
								textUpdateTrigger={textUpdateTrigger}
								imageUpdateTrigger={imageUpdateTrigger}
								selectedProduct={selectedProduct}
							/>
							<ProductColorSilver
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
							<ProductColorGolden
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
						</>
					)}
					{selectedProduct === "goodie bag" && (
						<>
							<GoodieBag
								selectedColor={selectedColor}
								selectedImage={selectedImage}
								textAdded={textAdded}
								// handleAddText={onAddText}
								textUpdateTrigger={textUpdateTrigger}
								imageUpdateTrigger={imageUpdateTrigger}
								selectedProduct={selectedProduct}
							/>
							<ProductColorBlack
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
							<ProductColorWhitie
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
						</>
					)}
					{selectedProduct === "bookmarks" && (
						<>
							<Bookmarks
								selectedColor={selectedColor}
								selectedImage={selectedImage}
								textAdded={textAdded}
								// handleAddText={onAddText}
								textUpdateTrigger={textUpdateTrigger}
								imageUpdateTrigger={imageUpdateTrigger}
								selectedProduct={selectedProduct}
							/>
							<ProductColorBlackBookmark
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
							<ProductColorWhiteBookmark
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
							<ProductColorGoldenBookmark
								selectedColor={selectedColor}
								onColorChange={setSelectedColor}
							/>
						</>
					)}
				</div>
			</section>

			<section></section>
		</section>
	);
};

export default Designing;
