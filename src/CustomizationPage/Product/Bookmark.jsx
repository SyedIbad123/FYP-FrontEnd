import styles from "./Product.module.css";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";

const Bookmark = ({
	selectedColor = "white",
	selectedBlackcolor,
	selectedGoldencolor = "golden",
	selectedImage,
	textAdded,
	handleAddText,
	imageUpdateTrigger,
	textUpdateTrigger,
	setSelectedBlackcolor,
	setSelectedGoldencolor,
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

	const handlePreviewClick = () => {
		setEditMode(false);

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

	const downloadImage = () => {
		const link = document.createElement("a");
		link.download = "image.png";
		link.href = canvas.toDataURL({
			format: "png",
			quality: 1,
		});
		link.click();
	};

	const handleProductSelect = (product) => {
		setSelectedProduct(product);
	};

	const handleSave = async () => {
		const node = frameRef.current;

		try {
			const canvas = await html2canvas(node);
			const imageLink = canvas.toDataURL("image/png");

			// Choose ONE of the following actions (A, B, or C):

			// A. Store to Database ('db.json')
			await saveImageLinkToJson("db.json", imageLink, "customized_image.png");
			console.log("image link : ", imageLink);

			// B. Display the Image
			displayImage(imageLink);

			// C. Other Actions (e.g., upload to an image hosting service)
			// ... Your code to handle the imageLink

			console.log("Image generated and processed successfully!");
		} catch (error) {
			console.error("Error generating or handling image:", error);
		}
	};

	async function saveImageLinkToJson(filename, dataUrl, imageName) {
		try {
			const existingData = await fetch(filename).then((response) => {
				if (!response.ok) {
					throw new Error(`Error fetching ${filename}: ${response.statusText}`);
				}
				return response.json();
			});
			console.log("Existing Data before push : ", existingData);

			const newImageEntry = { link: dataUrl, filename: imageName };
			existingData.images.push(newImageEntry);

			console.log("Existing Data after push : ", existingData);
			console.log("New image entry : ", newImageEntry);
			console.log("Stringify existing data : ", JSON.stringify(existingData));

			await axios
				.put(`/images`, existingData) // Update with your server URL
				.then((response) => {
					if (response.status === 200) {
						console.log("Image link saved to db.json successfully!");
					} else {
						console.error("Error saving to db.json:", response.statusText);
					}
					console.log("Response data : ", response.data);
					return response.data;
				});
		} catch (error) {
			console.error("Error interacting with db.json:", error);
		}
	}

	function displayImage(imageLink) {
		const imgElement = document.createElement("img");
		imgElement.src = imageLink;
		imgElement.alt = "Generated Image";
		document.body.appendChild(imgElement);
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
						<button onClick={handleFontFamilyClick}>Font</button>
						{showFontDropdown && (
							<div className={styles.fontDropdown}>
								<select
									value={selectedFont}
									onChange={(e) => handleFontChange(e.target.value)}>
									{fontFamilies.map((font) => (
										<option key={font} value={font}>
											{font}
										</option>
									))}
								</select>
								<button onClick={applyFont}>Apply</button>
							</div>
						)}
						<button onClick={handleColorClick}>color</button>
						{displayColorPicker ? (
							<div style={{ position: "absolute" }}>
								<SketchPicker color={color} onChange={handleColorChange} />
								<button onClick={closeColorPicker}>Apply</button>
							</div>
						) : null}
						<button onClick={handleBoldClick}>Bold</button>
						<button onClick={handleItalicClick}>Italic</button>
						<button onClick={handleUnderlineClick}>Underline</button>
					</section>
				)}

				<section>
					<button className={styles.previewBtn} onClick={handlePreviewClick}>
						Preview
					</button>
					<button className={styles.designBtn} onClick={handleDesignClick}>
						Design
					</button>
					<button className={styles.saveBtn} onClick={handleSave}>
						Save Image
					</button>
				</section>
			</section>
		</>
	);
};

export default Bookmark;
