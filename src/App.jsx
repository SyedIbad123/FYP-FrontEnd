import CustomizePage from "./CustomizationPage/CustomizePage";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./CustomizationPage/Product/ProductContext/ProductContext";

function App() {
	return (
		<BrowserRouter>
			<ProductProvider>
				<CustomizePage />
			</ProductProvider>
		</BrowserRouter>
	);
}

export default App;
