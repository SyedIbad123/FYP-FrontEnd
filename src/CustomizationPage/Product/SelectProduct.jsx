import style from "./SelectProduct.module.css";

function SelectProduct({ onProductSelect }) {
	return (
		<div className={style.selectproduct}>
			<h2>Select Product</h2>
			<button onClick={() => onProductSelect("keychain")}>Keychain</button>
			<button onClick={() => onProductSelect("goodie bag")}>Goodie Bag</button>
			<button onClick={() => onProductSelect("bookmarks")}>Bookmarks</button>
		</div>
	);
}

export default SelectProduct;
