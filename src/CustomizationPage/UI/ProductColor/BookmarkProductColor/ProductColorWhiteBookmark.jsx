import styles from "../../Styles/ProductColor.module.css";

function ProductColorWhiteBookmark({ onColorChange }) {
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
					With <strong>White</strong> Tassels.
				</p>
			</div>
			<div
				className={styles.colorPallete}
				style={{
					margin: "18rem 0 0 1.2rem",
					top: "67%",
				}}>
				<div>
					<button onClick={() => onColorChange("whitewhite")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("whitered")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("whitegreen")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("whitebrown")}></button>
				</div>
				<div>
					<button onClick={() => onColorChange("whitepurple")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "yellow",
							border: "lightyellow",
						}}
						onClick={() => onColorChange("whiteyellow")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorWhiteBookmark;
