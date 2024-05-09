import styles from "./Bookmark.module.css";
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

const Bookmark = ({
	selectedColor = "white",
	selectedImage,
	textAdded,
	handleAddText,
	imageUpdateTrigger,
	textUpdateTrigger,
}) => {
	const canvasRef = useRef(null);
	// const canvasRef2 = useRef(null);

	const frameRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [selectedTextObject, setSelectedTextObject] = useState(false);
	const [displayColorPicker, setDisplayColorPicker] = useState(false);
	const [color, setColor] = useState("#000000");
	const [tasselColor, setTasselColor] = useState("");
	const [selectedFont, setSelectedFont] = useState("Arial");
	const [showFontDropdown, setShowFontDropdown] = useState(false);
	const [isTextSelected, setIsTextSelected] = useState(false);
	const [editMode, setEditMode] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	console.log("Bookmark component");

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

	// if (selectedBlackcolor === "black") {
	// 	setTasselColor(selectedBlackcolor);
	// }

	// if (selectedGoldencolor === "golden") {
	// 	setTasselColor(selectedGoldencolor);
	// }

	const getImageSource = (color) => {
		// Black Tassel
		if (color === "white") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselWhiteBookmark.png";
		} else if (color === "brown") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselBrownBookmark.png";
		} else if (color === "red") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselRedBookmark.png";
		} else if (color === "green") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselGreenBookmark.png";
		} else if (color === "purple") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselPurpleBookmark.png";
		} else if (color === "pink") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselPinkBookmark.png";
		} else if (color === "blue") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\BlackTasselBlueBookmark.png";
		}

		//  golden tassel
		else if (color === "goldenwhite") {
			return "src/CustomizationPage/Product/images/Bookmarks/GoldenTasselWhiteBookmark.png";
		} else if (color === "goldenbrown") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselBrownBookmark.png";
		} else if (color === "goldenred") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselRedBookmark.png";
		} else if (color === "goldengreen") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselGreenBookmark.png";
		} else if (color === "goldenpurple") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselPurpleBookmark.png";
		} else if (color === "goldenyellow") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselYellowBookmark.png";
		} else if (color === "goldenblue") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\GoldenTasselBlueBookmark.png";
		}

		// white tassel
		else if (color === "whitewhite") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselWhiteBookmark.png";
		} else if (color === "whitebrown") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselBrownBookmark.png";
		} else if (color === "whitered") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselRedBookmark.png";
		} else if (color === "whitegreen") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselGreenBookmark.png";
		} else if (color === "whitepurple") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselPurpleBookmark.png";
		} else if (color === "whitepink") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselPinkBookmark.png";
		} else if (color === "whiteyellow") {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselYellowBookmark.png";
		} else {
			return "src\\CustomizationPage\\Product\\images\\BookMarks\\WhiteTasselWhiteBookmark.png";
		}
	};

	var imgSrc = getImageSource(selectedColor);

	useEffect(() => {
		const newCanvas = new fabric.Canvas(canvasRef.current);
		setCanvas(newCanvas);

		const handleResize = () => {
			if (canvas) {
				canvas.setWidth(frameRef.current.clientWidth);
				canvas.setHeight(frameRef.current.clientHeight);
				canvas.renderAll();
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

		newCanvas.on("selection:updated", (e) => setSelectedTextObject(e.target));
		newCanvas.on("selection:cleared", (e) => setSelectedTextObject(false));

		// Example: Assume your image has an 'onload' event listener
		// const imgElement = frameRef.current.querySelector("img");
		// if (imgElement) {
		// 	imgElement.onload = () => setImageLoaded(true);
		// }

		return () => {
			if (canvas) {
				canvas.dispose(); // Dispose of all objects and the canvas itself
			}
		};
	}, [frameRef]); // Empty dependency array: runs only on mount, unmount

	useEffect(() => {
		const addImagesToCanvas = () => {
			// console.log("selectedImage", selectedImage);
			if (!canvas || !selectedImage) return;

			fabric.Image.fromURL(selectedImage, (img) => {
				// img.controls = canvas.customControls;
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
				// canvas.setActiveObject(img);
				canvas.renderAll();
			});
		};

		addImagesToCanvas();
		console.log("selectedImage inside useEffect:");
	}, [selectedImage, imageUpdateTrigger]);

	useEffect(() => {
		const addTextToCanvas = () => {
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

				fill: "white",
				// controls: canvas.deleteControl,
			});
			canvas.add(textObject);
			// canvas.setActiveObject(textObject);
			canvas.renderAll();
		};

		addTextToCanvas();
		console.log("textAdded inside useEffect:");
	}, [textAdded, textUpdateTrigger]);

	useEffect(() => {
		if (!canvas) return;

		canvas.on("mouse:down", (options) => {
			if (options.target && options.target.type === "textbox") {
				setSelectedTextObject(options.target);
				setIsTextSelected(true); // Update text selection status
			} else {
				setSelectedTextObject(null);
				setIsTextSelected(false);
			}
		});

		canvas.on("selection:cleared", (e) => setIsTextSelected(false));
	}, [canvas, editMode]);

	const handleBoldClick = () => {
		if (selectedTextObject) {
			selectedTextObject.set({
				fontWeight:
					selectedTextObject.fontWeight === "bold" ? "normal" : "bold",
			});
			canvas.renderAll();
		}
	};

	const handleItalicClick = () => {
		if (selectedTextObject) {
			selectedTextObject.set({
				fontStyle:
					selectedTextObject.fontStyle === "italic" ? "normal" : "italic",
			});
			canvas.renderAll();
		}
	};

	const handleUnderlineClick = () => {
		if (selectedTextObject) {
			selectedTextObject.set({
				underline: !selectedTextObject.underline, // Toggle underline
			});
			canvas.renderAll();
		}
	};

	const handleColorClick = () => {
		setDisplayColorPicker(!displayColorPicker);
	};

	const handleColorChange = (newColor) => {
		setColor(newColor.hex);
	};

	const closeColorPicker = () => {
		if (selectedTextObject) {
			selectedTextObject.set({ fill: color });
			canvas.renderAll();
		}
		setDisplayColorPicker(false);
	};

	const handleFontFamilyClick = () => {
		setShowFontDropdown(!showFontDropdown);
	};

	const handleFontChange = (newFont) => {
		setSelectedFont(newFont);
	};

	const applyFont = () => {
		if (selectedTextObject) {
			selectedTextObject.set({ fontFamily: selectedFont });
			canvas.renderAll();
		}
		setShowFontDropdown(false); // Close the dropdown
	};

	const [preview, setPreview] = useState(false);

	const handlePreviewClick = () => {
		setEditMode(false);
		setPreview(true);

		// Disable interaction with ALL objects
		canvas.forEachObject((obj) => {
			obj.selectable = false;
			obj.evented = false;
			obj.hasControls = false;
			obj.hasBorders = false;
			obj.deleteControl = false;
		});
		canvas.renderAll();
	};

	const handleDesignClick = () => {
		setEditMode(true);
		setPreview(false);

		// Enable interaction with ALL objects
		canvas.forEachObject((obj) => {
			obj.selectable = true;
			obj.evented = true;
			obj.hasControls = true;
			obj.hasBorders = true;
			obj.deleteControl = true;
		});
		canvas.renderAll();
	};

	// const downloadImage = () => {
	// 	const link = document.createElement("a");
	// 	link.download = "image.png";
	// 	link.href = canvas.toDataURL({
	// 		format: "png",
	// 		quality: 1,
	// 	});
	// 	link.click();
	// };

	// const handleProductSelect = (product) => {
	// 	setSelectedProduct(product);
	// };

	// async function saveImageToMongoDb(imageLink) {
	// 	let url = "http://localhost:8000/api/v2/image/upload-image";
	// 	let data = {
	// 		image: imageLink,
	// 	};

	// 	// try {
	// 	// 	const res = await axios.post(url, data);
	// 	// 	return res.data;
	// 	// } catch (e) {
	// 	// 	console.error("Error Message", e.message);
	// 	// }

	// 	axios
	// 		.post(url, { image: imageLink })
	// 		.then((response) => {
	// 			// console.log("Response:", response.data);
	// 			// console.log("image link === > ", imageLink);
	// 			console.log("image  === > ", data.image);
	// 			// Handle response
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error);
	// 			// Handle error
	// 		});
	// }

	let url = "http://localhost:8000/api/v2/image";

	const handleSave = async () => {
		// const node = frameRef.current;

		try {
			// const canvas = await html2canvas(node);
			// const imageLink = canvas.toDataURL("image/png");

			// Choose ONE of the following actions (A, B, or C):

			// A. Store to Database ('db.json')
			// await saveImageLinkToJson("db.json", imageLink, "customized_image.png");
			// console.log("image link : ", imageLink);

			// saveImageToMongoDb(imageLink); // this function saves image in db
			// B. Display the Image
			// displayImage(imageLink);

			// C. Other Actions (e.g., upload to an image hosting service)
			// ... Your code to handle the imageLink

			console.log("Image generated and processed successfully!");
		} catch (error) {
			console.error("Error generating or handling image:", error);
		}
	};

	async function saveImageToMongoDb() {
		const node = frameRef.current;

		try {
			const canvas = await html2canvas(node);
			const imageLink = canvas.toDataURL("image/png");
			displayImage(imageLink);
			await axios.post(`${url}/upload-image`, {
				imageUrl: imageLink,
			});
		} catch (e) {
			console.log(e);
		}

		console.log("Image saved to MongoDB successfully!");
	}

	// async function saveImageLinkToJson(filename, dataUrl, imageName) {
	// 	try {
	// 		const existingData = await fetch(filename).then((response) => {
	// 			if (!response.ok) {
	// 				throw new Error(`Error fetching ${filename}: ${response.statusText}`);
	// 			}
	// 			return response.json();
	// 		});
	// 		console.log("Existing Data before push : ", existingData);

	// 		const newImageEntry = { link: dataUrl, filename: imageName };
	// 		existingData.images.push(newImageEntry);

	// 		console.log("Existing Data after push : ", existingData);
	// 		console.log("New image entry : ", newImageEntry);
	// 		console.log("Stringify existing data : ", JSON.stringify(existingData));

	// 		await axios
	// 			.put(`/images`, existingData) // Update with your server URL
	// 			.then((response) => {
	// 				if (response.status === 200) {
	// 					console.log("Image link saved to db.json successfully!");
	// 				} else {
	// 					console.error("Error saving to db.json:", response.statusText);
	// 				}
	// 				console.log("Response data : ", response.data);
	// 				return response.data;
	// 			});
	// 	} catch (error) {
	// 		console.error("Error interacting with db.json:", error);
	// 	}
	// }

	const [showImage, setShowImage] = useState(false);

	function displayImage(imageLink) {
		setShowImage(true);
		setPreview(false);

		const sectionElement = document.getElementById("sectionproduct");
		console.log("section Element ===> ", sectionElement);

		const imgElement = document.createElement("img");

		imgElement.style.width = "30vw"; 
		imgElement.style.height = "70vh";
		console.log("img Element ===> ", imgElement);

		imgElement.src = imageLink;
		imgElement.alt = "Generated Image";

		sectionElement.appendChild(imgElement);
	}

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function refresh() {
		window.location.reload();
	}

	return (
		<>
			<section className={styles.section}>
				<section>
					<div ref={frameRef}>
						{/* <canvas ref={canvasRef2}> */}
						<img
							style={{
								marginTop: "17rem",
							}}
							className={styles.image}
							src={imgSrc}
							alt="bookmark"
						/>
						<div
							style={{
								marginTop: "6rem",
								// backgroundColor: "black",
							}}
							className={`${styles.frame} ${!editMode && styles.noBorder}`}>
							<canvas
								id="canvas"
								ref={canvasRef}
								// className={styles.canvas1}
								style={{
									// backgroundColor: "white",
									height: "10vh",
								}}></canvas>
						</div>
						{/* </canvas> */}
					</div>
				</section>
				{isTextSelected && editMode && (
					<section className={styles.btnSect}>
						<button onClick={handleFontFamilyClick}>
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
									onChange={(e) => handleFontChange(e.target.value)}>
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
						<button onClick={handleColorClick}>
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
								<button onClick={closeColorPicker}>Apply</button>
							</div>
						) : null}
						<button onClick={handleBoldClick}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/114/114304.png"
								alt=""
							/>
						</button>
						<button onClick={handleItalicClick}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/14253/14253712.png"
								alt=""
							/>
						</button>
						<button onClick={handleUnderlineClick}>
							<img
								style={{ width: "25px", height: "25px" }}
								src="https://cdn-icons-png.flaticon.com/512/25/25433.png"
								alt=""
							/>
						</button>
					</section>
				)}

				<section
					style={
						{
							// marginTop: "3rem",
							// top: "10%",
							// position: "absolute",
							// top: "80%",
							// left: "50%",
						}
					}>
					<button
						// style={{
						// 	marginTop: "3rem",
						// 	top: "10%",
						// }}
						className={styles.previewBtn}
						onClick={handlePreviewClick}>
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
									top: "110%",
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
										Are you want to sure to continue ?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											handleClose(), saveImageToMongoDb();
										}}>
										Ok
									</Button>
									<Button onClick={handleClose} autoFocus>
										cancel
									</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
					{showImage && (
						<>
							<Button
								sx={{
									position: "absolute",
									top: "110%",
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
								Confirm
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
										Are you want to sure to continue ?
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											handleClose(), refresh();
										}}>
										Ok
									</Button>
									<Button onClick={handleClose} autoFocus>
										cancel
									</Button>
								</DialogActions>
							</Dialog>
						</>
					)}
				</section>
			</section>
			<section
				style={{
					height: "10vh",
					width: "20vw",
					// backgroundColor: "black",
					position: "relative",
					left: "10%",
				}}
				id="sectionproduct"></section>
		</>
	);
};

export default Bookmark;
