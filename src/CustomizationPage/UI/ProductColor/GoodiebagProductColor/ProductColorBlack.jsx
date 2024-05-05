import styles from "../../Styles/ProductColor.module.css";

function ProductColorBlack({ onColorChange }) {
	return (
		<>
			<div
				style={{
					marginTop: "-1rem",
					left: "1%",
					position: "absolute",
				}}>
				<h3 className={styles.heading}>Choose Product Color</h3>
				<p className={styles.para}>
					With <strong>Black</strong> Strip.
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
}

export default ProductColorBlack;
