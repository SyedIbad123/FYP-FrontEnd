import SelectProduct from "../Product/SelectProduct";
import style from "./Styles/DesignYourProduct.module.css";

const DesignYourProduct = ({ onImageSelect, onAddText, setSelectedImage }) => {
	const handleImageOpen = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.click();
		input.addEventListener("change", handleImageUpload);
	};

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			const imageDataUrl = reader.result;
			setSelectedImage(imageDataUrl);

			if (onImageSelect) {
				onImageSelect(imageDataUrl);
			}
		};
		reader.readAsDataURL(file);
	};

	const handleAddTextClick = () => {
		if (onAddText) {
			onAddText();
		}
	};

	return (
		<section style={{ marginTop: "6rem" }}>
			<div>
				<h3>Design your product</h3>
				<p>Max file size of 50MB</p>
			</div>
			<div>
				<button onClick={handleImageOpen} className={style.addImg}>
					Add Image
				</button>
				<button onClick={handleAddTextClick} className={style.addTxt}>
					Add Text
				</button>
			</div>
		</section>
	);
};

export default DesignYourProduct;
