import styles from "../../Styles/ProductColor.module.css";

function ProductColorGoldenBookmark({ onColorChange }) {
	return (
		<>
			<div
				style={{
					marginTop: "25rem",
					left: "1%",
					position: "absolute",
				}}>
				<h3 className={styles.heading}>Choose Product Color</h3>
				<p className={styles.para}>
					With <strong>Golden</strong> Tassels.
				</p>
			</div>
			<div
				className={styles.colorPallete}
				style={{
					margin: "18rem 0 10rem 1.2rem",
					top: "100%",
				}}>
				<div>
					<button onClick={() => onColorChange("goldenwhite")}></button>
				</div>

				<div>
					<button onClick={() => onColorChange("goldenred")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("goldengreen")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("goldenbrown")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("goldenpurple")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "yellow",
							border: "lightyellow",
						}}
						onClick={() => onColorChange("goldenyellow")}></button>
				</div>
				{/* <div>
					<button onClick={() => onColorChange("goldenseagreen")}></button>
				</div> */}

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorGoldenBookmark;
