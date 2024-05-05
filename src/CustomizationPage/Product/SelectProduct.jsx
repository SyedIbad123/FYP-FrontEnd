import style from "./SelectProduct.module.css";

function SelectProduct({ onProductSelect }) {
	return (
		<div className={style.selectproduct}>
			<h2>Select Product</h2>
			<button className={style.btn} onClick={() => onProductSelect("keychain")}>
				Keychain
			</button>
			<button
				className={style.btn}
				onClick={() => onProductSelect("goodie bag")}>
				Goodie Bag
			</button>
			<button
				className={style.btn}
				onClick={() => onProductSelect("bookmarks")}>
				Bookmarks
			</button>
		</div>
	);
}

export default SelectProduct;
