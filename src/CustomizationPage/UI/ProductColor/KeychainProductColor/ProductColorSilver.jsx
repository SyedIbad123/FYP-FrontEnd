import styles from "../../Styles/ProductColor.module.css";

function ProductColorSilver({ onColorChange }) {
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
					With <strong>Silver</strong> Keychain.
				</p>
			</div>
			<div className={styles.colorPallete}>
				<div>
					<button onClick={() => onColorChange("white")}></button>
				</div>
				{/* <div>
					<button onClick={() => onColorChange("black")}></button>
				</div> */}
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
				{/* <div>
					<button
						style={{
							backgroundColor: "maroon",
							border: "maroon",
						}}
						onClick={() => onColorChange("maroon")}></button>
				</div> */}
				<div>
					<button
						style={{
							backgroundColor: "blue",
							border: "blue",
						}}
						onClick={() => onColorChange("blue")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorSilver;
