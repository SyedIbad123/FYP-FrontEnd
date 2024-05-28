import CustomizePage from "./CustomizationPage/CustomizePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./CustomizationPage/Product/ProductContext/ProductContext";

function App() {
	return (
		<Router>
			<ProductProvider>
				<Routes>
					<Route path="/" element={<CustomizePage />} />
				</Routes>
			</ProductProvider>
		</Router>
	);
}

export default App;
