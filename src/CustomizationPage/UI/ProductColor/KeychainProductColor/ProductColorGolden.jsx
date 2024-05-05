import styles from "../../Styles/ProductColor.module.css";

function ProductColorGolden({ onColorChange }) {
	return (
		<>
			<div
				style={{
					marginTop: "13rem",
					left: "1%",
					position: "absolute",
				}}>
				<h3 className={styles.heading}>Choose Product Color</h3>
				<p className={styles.para}>
					With <strong>Golden</strong> Keychain.
				</p>
			</div>
			<div
				className={styles.colorPallete}
				style={{
					margin: "21rem 0 0 1.2rem",
					top: "67%",
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
					<button onClick={() => onColorChange("goldenpink")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "yellow",
							border: "yellow",
						}}
						onClick={() => onColorChange("goldenyellow")}></button>
				</div>
				{/* <div>
					<button
						style={{
							backgroundColor: "maroon",
							border: "maroon",
						}}
						onClick={() => onColorChange("goldenmaroon")}></button>
				</div> */}
				<div>
					<button
						style={{
							backgroundColor: "black",
							border: "black",
							borderRadius: "50%",
							width: "30px",
							height: "30px",
							cursor: "pointer",
							margin: "5px",
						}}
						onClick={() => onColorChange("goldenblack")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorGolden;
