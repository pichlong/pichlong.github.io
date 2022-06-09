function addEvents() {
	window.addCart();

	const toastWindow = document.getElementById("toast");

	const toastCloseButton = document.getElementById("close-toast");

	function toastToggle(missingFields, force = false) {
		console.log("missing fields", missingFields);

		if (toastWindow.style.display === "flex" && !force) {
			toastWindow.style.display = "none";
		} else {
			toastWindow.style.display = "flex";
		}

		document.querySelector("#toast p").innerHTML = `${
			missingFields.length
				? "<b>Missing fields:</b><br>" + missingFields.join(", ")
				: ""
		}`;
	}

	toastCloseButton.addEventListener("click", toastToggle, false);

	const checkoutNext = document.getElementById("checkout-2");

	function validateCheckout() {
		let missingFields = [];
		const requiredShippingFieldNames = {
			"card-holder": "Card holder",
			"card-number": "Card number",
			"expiration-date-month": "Expiration date month",
			"expiration-date-year": "Expiration date year",
			"security-number": "Security number",
		};

		const areFieldsValid = Object.keys(requiredShippingFieldNames)
			.map((fieldName) => {
				const field = document.getElementById(fieldName);

				console.log("fieldName: ", fieldName, field);
				const result = field.value !== "";

				if (!result) {
					console.log("CHECKING RESULT", requiredShippingFieldNames[fieldName]);
					missingFields.push(requiredShippingFieldNames[fieldName]);
				}
				return result;
			})
			.every((iteration) => !!iteration);

		function next() {
			window.location.href = "confirmation.html";
		}

		console.log("areFieldsValid: ", areFieldsValid);

		if (areFieldsValid) {
			next();
		} else {
			toastToggle(missingFields, true);
			window.scrollTo(0, 0);
		}
	}

	checkoutNext.addEventListener("click", validateCheckout, false);
}

window.onload = addEvents;
