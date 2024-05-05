import styles from "../../Styles/ProductColor.module.css";

function ProductColorBlackBookmark({ onColorChange }) {
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
					With <strong>Black</strong> Tassels.
				</p>
			</div>
			<div className={styles.colorPallete}>
				<div>
					<button onClick={() => onColorChange("white", "black")}></button>
				</div>

				<div>
					<button onClick={() => onColorChange("red", "black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("green", "black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("brown", "black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("purple", "black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("pink", "black")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("blue", "black")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorBlackBookmark;
