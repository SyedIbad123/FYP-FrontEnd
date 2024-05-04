import { useState } from "react";
import SelectProduct from "./SelectProduct";
import Keychain from "./Keychain.jsx";
import GoodieBag from "./GoodieBag.jsx";
import Bookmarks from "./Bookmark.jsx";

const Product = ({
	selectedColor = "white",
	selectedImage,
	textAdded,
	onAddText,
	imageUpdateTrigger,
	textUpdateTrigger,
}) => {
	

	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleProductSelect = (product) => {
		setSelectedProduct(product);
	};

	console.log("selectedProduct: ", selectedProduct);

	return ( 
		// <>
		// 	<section className={styles.section}>
		// 		<section>
		// 			<div ref={frameRef}>
		// 				{/* <canvas ref={canvasRef2}> */}
		// 				<img className={styles.image} src={imgSrc} alt="bag" />
		// 				<div className={`${styles.frame} ${!editMode && styles.noBorder}`}>
		// 					<canvas
		// 						id="canvas"
		// 						ref={canvasRef}
		// 						className={styles.canvas1}></canvas>
		// 				</div>
		// 				{/* </canvas> */}
		// 			</div>
		// 		</section>

		// 		{isTextSelected && editMode && (
		// 			<section className={styles.btnSect}>
		// 				<button onClick={handleFontFamilyClick}>Font</button>
		// 				{showFontDropdown && (
		// 					<div className={styles.fontDropdown}>
		// 						<select
		// 							value={selectedFont}
		// 							onChange={(e) => handleFontChange(e.target.value)}>
		// 							{fontFamilies.map((font) => (
		// 								<option key={font} value={font}>
		// 									{font}
		// 								</option>
		// 							))}
		// 						</select>
		// 						<button onClick={applyFont}>Apply</button>
		// 					</div>
		// 				)}
		// 				<button onClick={handleColorClick}>color</button>
		// 				{displayColorPicker ? (
		// 					<div style={{ position: "absolute" }}>
		// 						<SketchPicker color={color} onChange={handleColorChange} />
		// 						<button onClick={closeColorPicker}>Apply</button>
		// 					</div>
		// 				) : null}
		// 				<button onClick={handleBoldClick}>Bold</button>
		// 				<button onClick={handleItalicClick}>Italic</button>
		// 				<button onClick={handleUnderlineClick}>Underline</button>
		// 			</section>
		// 		)}

		// 		<section>
		// 			<button className={styles.previewBtn} onClick={handlePreviewClick}>
		// 				Preview
		// 			</button>
		// 			<button className={styles.designBtn} onClick={handleDesignClick}>
		// 				Design
		// 			</button>
		// 			<button className={styles.saveBtn}>Save Image</button>
		// 		</section>
		// 	</section>
		// </>
		<>
			<div>
				<SelectProduct onProductSelect={handleProductSelect} />
			</div>
			<div>
				{selectedProduct === "keychain" && (
					<Keychain
						selectedColor={selectedColor}
						selectedImage={selectedImage}
						textAdded={textAdded}
						handleAddText={onAddText}
						textUpdateTrigger={textUpdateTrigger}
						imageUpdateTrigger={imageUpdateTrigger}
						selectedProduct={selectedProduct}
					/>
				)}
				{selectedProduct === "goodie bag" && (
					<GoodieBag
						selectedColor={selectedColor}
						selectedImage={selectedImage}
						textAdded={textAdded}
						handleAddText={onAddText}
						textUpdateTrigger={textUpdateTrigger}
						imageUpdateTrigger={imageUpdateTrigger}
						selectedProduct={selectedProduct}
					/>
				)}
				{selectedProduct === "bookmarks" && (
					<Bookmarks
						selectedColor={selectedColor}
						selectedImage={selectedImage}
						textAdded={textAdded}
						handleAddText={onAddText}
						textUpdateTrigger={textUpdateTrigger}
						imageUpdateTrigger={imageUpdateTrigger}
						selectedProduct={selectedProduct}
					/>
				)}
			</div>
		</>
	);
};

export default Product;
