// ProductColor.js
import styles from "./Styles/ProductColor.module.css";

const ProductColor = ({ onColorChange }) => {
	return (
		<>
			<div
				style={{
					marginTop: "3rem",
				}}>
				<h3 className={styles.heading}>Choose Product Colors</h3>
				<p className={styles.para}>
					Select up to 5 backgrounds for your product
				</p>
			</div>
			<div className={styles.colorPallete}>
				<div>
					<button onClick={() => onColorChange("white")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("red")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("green")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("brown")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("purple")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("pink")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("grey")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("seagreen")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
};

export default ProductColor;
