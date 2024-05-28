import styles from "./Keychain.module.css";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Keychain = ({
	selectedColor = "white",
	selectedImage,
	textAdded,
	imageUpdateTrigger,
	textUpdateTrigger,
}) => {
	const frontCanvasRef = useRef(null);
	const backCanvasRef = useRef(null);
	const frameRef = useRef(null);

	const [frontCanvas, setFrontCanvas] = useState(null);
	const [backCanvas, setBackCanvas] = useState(null);

	const [selectedTextObject, setSelectedTextObject] = useState(false);
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const [color, setColor] = useState("#000000");
	const [selectedFont, setSelectedFont] = useState("Arial");
	const [showFontDropdown, setShowFontDropdown] = useState(false);
	const [isTextSelected, setIsTextSelected] = useState(false);
	const [editMode, setEditMode] = useState(true);
	const [selectedSide, setSelectedSide] = useState("Front");
	const [preview, setPreview] = useState(false);
	const [vendors, setVendors] = useState([]);
	const [selectedVendor, setSelectedVendor] = useState("");
	const [image, setImage] = useState([]);
	const [showImage, setShowImage] = useState(false);
	const [open, setOpen] = useState(false);

	const fontFamilies = [
		"Arial",
		"Times New Roman",
		"Helvetica",
		"Courier New",
		"Verdana",
		"Georgia",
		"Palatino Linotype",
		"Garamond",
		"Baskerville",
		"Tahoma",
		"Calibri",
		"Lucida Sans",
		"Trebuchet MS",
		"Consolas",
		"Courier",
		"Lucida Console",
	];

	const getImageSource = (color) => {
		if (color === "white") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverWhite.png";
		} else if (color === "red") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverRed.png";
		} else if (color === "green") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverGreen.png";
		} else if (color === "brown") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverBrown.png";
		} else if (color === "purple") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverPurple.png";
		} else if (color === "pink") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverPink.png";
		} else if (color === "maroon") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverMaroon.png";
		} else if (color === "blue") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverBlue.png";
		}

		// golden white
		else if (color === "goldenwhite") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenWhite.png";
		} else if (color === "goldenred") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenRed.png";
		} else if (color === "goldengreen") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenGreen.png";
		} else if (color === "goldenbrown") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenBrown.png";
		} else if (color === "goldenpurple") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenPurple.png";
		} else if (color === "goldenpink") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenPink.png";
		} else if (color === "golden") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenGrey.png";
		} else if (color === "goldenyellow") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenYellow.png";
		} else if (color === "goldenblack") {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\GoldenBlack.png";
		} else {
			return "src\\CustomizationPage\\Product\\images\\KEY CHAIN\\SilverWhite.png";
		}
	};

	const imgSrc = getImageSource(selectedColor);

	useEffect(() => {
		const newFrontCanvas = new fabric.Canvas(frontCanvasRef.current);
		const newBackCanvas = new fabric.Canvas(backCanvasRef.current);

		setFrontCanvas(newFrontCanvas);
		setBackCanvas(newBackCanvas);

		const handleResize = () => {
			if (frontCanvas) {
				frontCanvas.setWidth(frameRef.current.clientWidth);
				frontCanvas.setHeight(frameRef.current.clientHeight);
				frontCanvas.renderAll();
			}
			if (backCanvas) {
				backCanvas.setWidth(frameRef.current.clientWidth);
				backCanvas.setHeight(frameRef.current.clientHeight);
				backCanvas.renderAll();
			}
		};

		window.addEventListener("resize", handleResize);

		fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
			x: 0.5,
			y: -0.5,
			offsetY: -16,
			cornerSize: 16,
			cursorStyle: "pointer",
			mouseUpHandler: deleteObject,
			render: renderIcon("times-circle-regular"),
		});
		fabric.Image.prototype.controls.deleteControl = new fabric.Control({
			x: 0.5,
			y: -0.5,
			offsetY: -16,
			cornerSize: 16,
			cursorStyle: "pointer",
			mouseUpHandler: deleteObject,
			render: renderIcon("times-circle-regular"),
		});

		function renderIcon(icon) {
			return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
				const size = this.cornerSize;
				ctx.save();
				ctx.translate(left, top);
				ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
				ctx.fillStyle = styleOverride.fill || "red"; // Customizable color
				ctx.fillRect(-size / 2, -size / 2, size, size);

				// Draw the "X"
				const padding = size / 5; // Adjust for icon padding
				ctx.strokeStyle = "white"; // Customizable color
				ctx.lineWidth = size / 10; // Customizable line thickness
				ctx.beginPath();
				ctx.moveTo(-size / 2 + padding, -size / 2 + padding);
				ctx.lineTo(size / 2 - padding, size / 2 - padding);
				ctx.moveTo(size / 2 - padding, -size / 2 + padding);
				ctx.lineTo(-size / 2 + padding, size / 2 - padding);
				ctx.stroke();

				ctx.restore();
			};
		}

		function deleteObject(eventData, transform) {
			const target = transform.target;
			const canvas = target.canvas;
			if (canvas.contains(target)) {
				canvas.remove(target);
			}
			canvas.requestRenderAll();
		}

		newFrontCanvas.on("selection:updated", (e) =>
			setSelectedTextObject(e.target)
		);
		newFrontCanvas.on("selection:cleared", (e) => setSelectedTextObject(false));
		newBackCanvas.on("selection:updated", (e) =>
			setSelectedTextObject(e.target)
		);
		newBackCanvas.on("selection:cleared", (e) => setSelectedTextObject(false));

		return () => {
			window.removeEventListener("resize", handleResize);
			newFrontCanvas.dispose();
			newBackCanvas.dispose();
		};
	}, [frameRef, selectedSide]);

	useEffect(() => {
		const addImagesToCanvas = (canvas, image) => {
			if (!canvas || !image) return;

			fabric.Image.fromURL(image, (img) => {
				img.scaleToWidth(100); // Smaller default size
				img.scaleToHeight(100);
				img.set({
					left: 40, // Randomize position
					top: 40,
					originX: "center",
					originY: "center",
					borderColor: "black",
					cornerColor: "black",
				});
				canvas.add(img);
				canvas.renderAll();
			});
		};

		if (selectedSide === "Front") {
			addImagesToCanvas(frontCanvas, selectedImage);
		} else {
			addImagesToCanvas(backCanvas, selectedImage);
		}
	}, [selectedImage, imageUpdateTrigger]);

	useEffect(() => {
		const addTextToCanvas = (canvas) => {
			if (!canvas || textAdded) return;

			const textObject = new fabric.Textbox("Enter Text: ", {
				left: 50,
				top: 50,
				originX: "center",
				originY: "center",
				fontSize: 15,
				width: 100,
				borderColor: "black",
				cornerColor: "black",
				fill: "#000000",
			});
			canvas.add(textObject);
			canvas.renderAll();
		};

		console.log("selected side", selectedSide);

		if (selectedSide === "Front") {
			addTextToCanvas(frontCanvas);
		}
		if (selectedSide === "Back") {
			addTextToCanvas(backCanvas);
		}
	}, [textAdded, textUpdateTrigger]);

	useEffect(() => {
		if (!frontCanvas || !backCanvas) return;

		const currentCanvas = selectedSide === "Front" ? frontCanvas : backCanvas;

		currentCanvas.on("mouse:down", (options) => {
			if (options.target && options.target.type === "textbox") {
				setSelectedTextObject(options.target);
				setIsTextSelected(true); // Update text selection status
			} else {
				setSelectedTextObject(null);
				setIsTextSelected(false);
			}
		});

		currentCanvas.on("selection:cleared", () => setIsTextSelected(false));
	}, [frontCanvas, backCanvas, selectedSide, editMode]);

	const handleBoldClick = (canvas) => {
		if (selectedTextObject) {
			selectedTextObject.set({
				fontWeight:
					selectedTextObject.fontWeight === "bold" ? "normal" : "bold",
			});
			canvas.renderAll();
		}
	};

	const handleItalicClick = (canvas) => {
		if (selectedTextObject) {
			selectedTextObject.set({
				fontStyle:
					selectedTextObject.fontStyle === "italic" ? "normal" : "italic",
			});
			canvas.renderAll();
		}
	};

	const handleUnderlineClick = (canvas) => {
		if (selectedTextObject) {
			selectedTextObject.set({
				underline: !selectedTextObject.underline, // Toggle underline
			});
			canvas.renderAll();
		}
	};

	const handleColorClick = (canvas) => {
		setDisplayColorPicker(!displayColorPicker);
	};

	const handleColorChange = (newColor, canvas) => {
		setColor(newColor.hex);
		if (selectedTextObject) {
			selectedTextObject.set({ fill: newColor.hex });
			canvas.renderAll();
		}
	};

	const closeColorPicker = (canvas) => {
		setDisplayColorPicker(false);
		canvas.renderAll();
	};

	const handleFontFamilyClick = (canvas) => {
		setShowFontDropdown(!showFontDropdown);
	};

	const handleFontChange = (newFont, canvas) => {
		setSelectedFont(newFont);
		if (selectedTextObject) {
			selectedTextObject.set({ fontFamily: newFont });
			canvas.renderAll();
		}
	};

	const applyFont = (canvas) => {
		setShowFontDropdown(false); // Close the dropdown
		canvas.renderAll();
	};

	const handlePreviewClick = () => {
		setEditMode(false);
		setPreview(true);

		// Disable interaction with ALL objects
		if (frontCanvas) {
			frontCanvas.forEachObject((obj) => {
				obj.selectable = false;
				obj.evented = false;
				obj.hasControls = false;
				obj.hasBorders = false;
				obj.deleteControl = false;
			});
			frontCanvas.renderAll();
		}

		if (backCanvas) {
			backCanvas.forEachObject((obj) => {
				obj.selectable = false;
				obj.evented = false;
				obj.hasControls = false;
				obj.hasBorders = false;
				obj.deleteControl = false;
			});
			backCanvas.renderAll();
		}
	};

	const handleDesignClick = () => {
		setEditMode(true);
		setPreview(false);

		// Enable interaction with ALL objects
		if (frontCanvas) {
			frontCanvas.forEachObject((obj) => {
				obj.selectable = true;
				obj.evented = true;
				obj.hasControls = true;
				obj.hasBorders = true;
				obj.deleteControl = true;
			});
			frontCanvas.renderAll();
		}

		if (backCanvas) {
			backCanvas.forEachObject((obj) => {
				obj.selectable = true;
				obj.evented = true;
				obj.hasControls = true;
				obj.hasBorders = true;
				obj.deleteControl = true;
			});
			backCanvas.renderAll();
		}
	};

	const vendorURL = "http://localhost:8000/api/v2/shop/admin-all-sellers";

	const getVendors = async () => {
		try {
			let response = await axios.get(vendorURL, {
				withCredentials: true, // Include credentials (cookies) in the request
			});
			setVendors(response.data.sellers);
			console.log("Vendors: ", response.data);
		} catch (error) {
			console.error("Error fetching vendors:", error);
		}
	};
	console.log("vendors", vendors);

	useEffect(() => {
		getVendors();
	}, []);

	let url = "http://localhost:8000/api/v2/image";

	async function saveImageToMongoDb() {
		const node = frameRef.current;

		try {
			const canvas = await html2canvas(node);
			const imageLink = canvas.toDataURL("image/png");
			displayImage(imageLink);
			await axios.post(`${url}/upload-image`, {
				imageUrl: imageLink,
				vendor: selectedVendor,
			});
			console.log("Image saved to MongoDB successfully!");
		} catch (e) {
			console.log("Error uploading image", e);
		}
	}

	const getImage = async () => {
		try {
			const response = await axios.get(`${url}/get-all-images`);
			setImage(response?.data?.images);
			console.log("Image fetched from MongoDB successfully!");
			console.log("Images: ", response.data.images);
			console.log("image == > ", image);
			// image.map((img) => {
			// 	console.log("Image URL map : ", img.imageUrl);
			// });
			console.log("Image URL: ", response.data.images[0].imageUrl);
		} catch (error) {
			console.error("Error fetching image from MongoDB:", error);
		}
	};

	console.log("image == > ", image);

	useEffect(() => {
		getImage();
	}, []);

	function displayImage(imageLink) {
		setShowImage(true);
		setPreview(false);
		const sectionElement = document.getElementById("sectionproduct");
		// console.log("section Element ===> ", sectionElement);
		const imgElement = document.createElement("img");
		imgElement.style.width = "30vw";
		imgElement.style.height = "70vh";
		console.log("img Element ===> ", imgElement);
		imgElement.src = imageLink;
		imgElement.alt = "Generated Image";
		sectionElement.appendChild(imgElement);
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function refresh() {
		window.location.reload();
		console.log("refresh called");
	}

	const handleSideChange = (side) => {
		setSelectedSide(side);
		console.log("side changed");
		toast(`${side} selected`, {
			autoClose: 1000,
			progressStyle: {
				background: side === "Front" ? "blue" : "red",
			},
		});
	};
	console.log("Selected side change to ====> ", selectedSide);

	return (
		<>
			<section className={styles.section}>
				<section>
					<div ref={frameRef}>
						<img className={styles.image} src={imgSrc} alt="keychain" />
						<div className={`${styles.frame} ${!editMode && styles.noBorder}`}>
							{selectedSide === "Front" ? (
								<canvas ref={frontCanvasRef} id="canvas-front"></canvas>
							) : (
								<canvas ref={backCanvasRef} id="canvas-back"></canvas>
							)}
						</div>
					</div>
				</section>

				{isTextSelected && editMode && (
					<section className={styles.btnSect}>
						<button
							onClick={() =>
								handleFontFamilyClick(
									selectedSide === "Front" ? frontCanvas : backCanvas
								)
							}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/167/167502.png"
								alt=""
							/>
						</button>
						{showFontDropdown && (
							<div className={styles.fontDropdown}>
								<select
									style={{
										padding: "0.2rem",
										borderRadius: "20px",
									}}
									value={selectedFont}
									onChange={(e) =>
										handleFontChange(
											e.target.value,
											selectedSide === "Front" ? frontCanvas : backCanvas
										)
									}>
									{fontFamilies.map((font) => (
										<option key={font} value={font}>
											{font}
										</option>
									))}
								</select>
								<button
									style={{
										marginLeft: "1rem",
									}}
									onClick={applyFont}>
									Apply
								</button>
							</div>
						)}
						<button
							onClick={() =>
								handleColorClick(
									selectedSide === "Front" ? frontCanvas : backCanvas
								)
							}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/11460/11460836.png"
								alt=""
							/>
						</button>
						{displayColorPicker ? (
							<div
								style={{
									position: "absolute",
									top: "53%",
									left: "40%",
									zIndex: 99,
								}}>
								<SketchPicker color={color} onChange={handleColorChange} />
								<button
									onClick={() =>
										closeColorPicker(
											selectedSide === "Front" ? frontCanvas : backCanvas
										)
									}>
									Apply
								</button>
							</div>
						) : null}
						<button
							onClick={() =>
								handleBoldClick(
									selectedSide === "Front" ? frontCanvas : backCanvas
								)
							}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/114/114304.png"
								alt=""
							/>
						</button>
						<button
							onClick={() =>
								handleItalicClick(
									selectedSide === "Front" ? frontCanvas : backCanvas
								)
							}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/14253/14253712.png"
								alt=""
							/>
						</button>
						<button
							onClick={() =>
								handleUnderlineClick(
									selectedSide === "Front" ? frontCanvas : backCanvas
								)
							}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/25/25433.png"
								alt=""
							/>
						</button>
					</section>
				)}

				<section>
					<div>
						<button
							style={{
								borderRadius: "50px",
								padding: "0.5rem 1rem 0.5rem 1rem",
								margin: "1rem 2rem",
								backgroundColor: "black",
								color: "white",
								border: "none",
								outline: "none",
								cursor: "pointer",
							}}
							onClick={() => handleSideChange("Front")}>
							Front
						</button>
						<button
							style={{
								borderRadius: "50px",
								padding: "0.5rem 1rem 0.5rem 1rem",
								margin: "1rem 2rem",
								backgroundColor: "black",
								color: "white",
								border: "none",
								outline: "none",
								cursor: "pointer",
							}}
							onClick={() => handleSideChange("Back")}>
							Back
						</button>
						<ToastContainer />
						<br></br>
						<br></br>
						{/* <button onClick={() => getVendors()}>Vendors</button> */}
						<select
							style={{
								padding: "0.2rem",
								borderRadius: "20px",
								marginTop: "-5rem",
								// top: "100%",
								left: "70%",
								position: "absolute",
								// backgroundColor: "lightblue",
								border: "none",
								outline: "none",
							}}
							name="vendor"
							id="vendor"
							onChange={(e) => setSelectedVendor(e.target.value)}>
							<option value="">Select a vendor</option>
							{vendors.map((vendor) => (
								<option
									style={{
										backgroundColor: "lightgrey",
										color: "black",
										border: "none",
										outline: "none",
									}}
									key={vendor.name}
									value={vendor.name}>
									{vendor.name}
								</option>
							))}
						</select>
					</div>
					<button className={styles.previewBtn} onClick={handlePreviewClick}>
						Preview
					</button>
					<button className={styles.designBtn} onClick={handleDesignClick}>
						Design
					</button>

					{preview && (
						<>
							<Button
								sx={{
									position: "absolute",
									top: "120%",
									left: "38%",
									backgroundColor: "rgb(2, 2, 2)",
									color: "rgb(190, 190, 190)",
									border: "none",
									outline: "none",
									borderRadius: "50px",
									padding: "0.5rem 5rem",
									cursor: "pointer",
									transition:
										"transform 0.3s ease-in-out, background-color 0.4s ease-in-out, color 0.3s ease-in-out",
									"&:hover": {
										transform: "scale(1.1)",
										backgroundColor: "rgb(250, 4, 4)",
										color: "rgb(250, 250, 250)",
										border: "none",
									},
									"&:hover span": {
										transition: "font-size 0.3s ease-in-out",
										fontSize: "1.1em",
									},
								}}
								variant="outlined"
								onClick={handleClickOpen}>
								Continue
							</Button>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description">
								<DialogTitle id="alert-dialog-title">
									{"Confirm your design"}
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										Are you sure you want to continue?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											handleClose();
											saveImageToMongoDb();
										}}>
										Ok
									</Button>
									<Button onClick={handleClose} autoFocus>
										Cancel
									</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
				</section>

				<section
					style={{
						height: "100vh",
						width: "190%",
						backgroundColor: "lightgrey",
						top: "130%",
						left: "-90%",
						color: "white",
						position: "absolute",
					}}>
					<h3
						style={{
							left: "20%",
							position: "relative",
							color: "black",
							top: "5%",
							display: "inline",
						}}>
						Front Image
					</h3>
					<h3
						style={{
							left: "65%",
							position: "relative",
							color: "black",
							top: "5%",
							display: "inline",
						}}>
						Back Image
					</h3>
					<section
						style={{
							height: "10vh",
							width: "20vw",
							position: "relative",
							left: "10%",
							top: "10%",
							display: "flex",
							flexDirection: "row",
							gap: "250px",
						}}
						id="sectionproduct"></section>
				</section>
			</section>
		</>
	);
};

export default Keychain;
