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
					<button onClick={() => onColorChange("whitepink")}></button>
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
						onClick={() => onColorChange("whitelightgreen")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "lightblue",
							border: "lightblue",
							borderRadius: "50%",
							display: "inline-block",
							width: " 30px",
							height: " 30px",
							margin: "5px",
							cursor: "pointer",
						}}
						onClick={() => onColorChange("whitelightblue")}></button>
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
						onClick={() => onColorChange("whiteblue")}></button>
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
						onClick={() => onColorChange("whiteyellow")}></button>
				</div>
				<div>
					<button
						style={{
							backgroundColor: "black",
							border: "blac",
							borderRadius: "50%",
							display: "inline-block",
							width: " 30px",
							height: " 30px",
							margin: "5px",
							cursor: "pointer",
						}}
						onClick={() => onColorChange("whiteblack")}></button>
				</div>

				{/* Add more buttons for other colors */}
			</div>
		</>
	);
}

export default ProductColorWhitie;
