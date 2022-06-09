function addEvents() {
	const cartOpenButtons = document.querySelectorAll(".cart-open-icon");

	const cartCloseButton = document.getElementById("cart-close-icon");

	const cartWindow = document.getElementById("cart-window");

	function cartTogle() {
		if (cartWindow.style.display === "flex") {
			cartWindow.style.display = "none";
		} else {
			cartWindow.style.display = "flex";
		}
	}

	cartOpenButtons.forEach((cartOpenButton) => {
		cartOpenButton.addEventListener("click", cartTogle, false);
	});

	cartCloseButton.addEventListener("click", cartTogle, false);
}

window.onload = addEvents;

window.addCart = addEvents;
