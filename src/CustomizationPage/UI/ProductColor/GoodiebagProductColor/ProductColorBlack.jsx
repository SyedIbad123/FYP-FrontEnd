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
					<button
						style={{
							backgroundColor: "lightblue",
							border: "lightblue",
						}}
						onClick={() => onColorChange("lightblue")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "black",
							border: "black",
						}}
						onClick={() => onColorChange("black")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "lightgreen",
							border: "lightgreen",
							borderRadius: "50%",
							display: "inline-block",
							width: " 30px",
							height: " 30px",
							margin: "5px",
							cursor: "pointer",
						}}
						onClick={() => onColorChange("lightgreen")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "blue",
							border: "blue",
							borderRadius: "50%",
							display: "inline-block",
							width: " 30px",
							height: " 30px",
							margin: "5px",
							cursor: "pointer",
						}}
						onClick={() => onColorChange("blue")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "yellow",
							border: "yellow",
							borderRadius: "50%",
							display: "inline-block",
							width: " 30px",
							height: " 30px",
							margin: "5px",
							cursor: "pointer",
						}}
						onClick={() => onColorChange("yellow")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorBlack;
