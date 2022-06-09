function addEvents() {
	const cartOpenButton = document.getElementById("cart-open-icon");

	const cartOpenButton1 = document.getElementById("cart-open-icon-1");

	const cartCloseButton = document.getElementById("cart-close-icon");

	const cartWindow = document.getElementById("cart-window");

	function cartOpen() {
		cartWindow.style.display = "flex";
	}

	function cartClose() {
		cartWindow.style.display = "none";
	}

	function cartTogle() {
		if (cartWindow.style.display === "flex") {
			cartClose();
		} else {
			cartOpen();
		}
	}

	window.cartOpen = cartOpen;

	cartOpenButton.addEventListener("click", cartTogle, false);
	cartOpenButton1.addEventListener("click", cartTogle, false);

	cartCloseButton.addEventListener("click", cartTogle, false);
}

window.onload = addEvents;
