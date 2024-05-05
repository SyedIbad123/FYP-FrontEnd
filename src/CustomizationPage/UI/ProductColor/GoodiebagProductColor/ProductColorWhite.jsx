import styles from "../../Styles/ProductColor.module.css";

function ProductColorWhitie({ onColorChange }) {
	return (
		<>
			<div
				style={{
					marginTop: "12rem",
					left: "1%",
					position: "absolute",
				}}>
				<h3 className={styles.heading}>Choose Product Color</h3>
				<p className={styles.para}>
					With <strong>White</strong> strip.
				</p>
			</div>
			<div
				className={styles.colorPallete}
				style={{
					margin: "18rem 0 0 1.2rem",
					top: "67%",
				}}>
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
}

export default ProductColorWhitie;
