import Designing from "./UI/Designing";
import Header from "./UI/Header";
import { Routes, Route } from "react-router-dom";
// import Designing from "./UI/Designing"; // Import your DesignPage component
import StylesPage from "./Product/StylesPage/StylePage";

const CustomizePage = () => {
	return (
		<>
			{/* <Header />

			<Routes>
				{/* <Route path="/" index element={<Designing />} /> */}
			{/* <Route path="/design" element={<Designing />} />
				<Route path="/styles" element={<StylesPage />} />
			</Routes> */}{" "}
			{/* */}
			<Designing />
		</>
	);
};

export default CustomizePage;
