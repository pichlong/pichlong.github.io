function addEvents() {
	window.addCart();

	const toastWindow = document.getElementById("toast");

	const toastCloseButton = document.getElementById("close-toast");

	function toastToggle(missingFileds, force = false, checked) {
		const { missingShippingFields, missingBillingFields } = missingFileds;

		console.log(
			"missingShippingFields",
			missingShippingFields,
			"missingBillingFields",
			missingBillingFields
		);

		if (toastWindow.style.display === "flex" && !force) {
			toastWindow.style.display = "none";
		} else {
			toastWindow.style.display = "flex";
		}

		document.querySelector("#toast p").innerHTML = `${
			missingShippingFields.length
				? "<b>Missing shipping fields:</b><br>" +
				  missingShippingFields.join(", ")
				: ""
		} ${
			!checked && missingShippingFields.length && missingBillingFields.length
				? "<br>"
				: ""
		} ${
			missingBillingFields.length && !checked
				? "<b>Missing billing fields:</b><br>" + missingBillingFields.join(", ")
				: ""
		}`;
	}

	toastCloseButton.addEventListener("click", toastToggle, false);

	const checkoutNext = document.getElementById("checkout-1");

	const billingInputs = document.getElementById("billing-inputs");

	const sameAddress = document.getElementById("same-address");

	sameAddress.addEventListener("click", sameAddressToggle);

	function sameAddressToggle(event) {
		if (event.target.checked) {
			billingInputs.style.display = "none";
		} else {
			billingInputs.style.display = "flex";
		}
	}

	function validateCheckout() {
		let missingShippingFields = [];
		let missingBillingFields = [];
		const requiredShippingFieldNames = {
			"s-first-name": "First Name",
			"s-last-name": "Last Name",
			"s-address": "Address",
			"s-city": "City",
			"s-country": "Country",
			"s-state": "State",
			"s-postal-code": "Postal Code",
			"s-phone": "Phone",
		};
		const requiredBillingFieldNames = {
			"b-first-name": "First Name",
			"b-last-name": "Last Name",
			"b-address": "Address",
			"b-city": "City",
			"b-country": "Country",
			"b-state": "State",
			"b-postal-code": "Postal Code",
			"b-phone": "Phone",
		};

		const areShippingFieldsValid = Object.keys(requiredShippingFieldNames)
			.map((fieldName) => {
				const field = document.getElementById(fieldName);

				console.log("fieldName: ", fieldName, field);
				const result = field.value !== "";

				if (!result) {
					console.log("CHECKING RESULT", requiredShippingFieldNames[fieldName]);
					missingShippingFields.push(requiredShippingFieldNames[fieldName]);
				}
				return result;
			})
			.every((iteration) => !!iteration);

		const areBillingFieldsValid = Object.keys(requiredBillingFieldNames)
			.map((fieldName) => {
				const field = document.getElementById(fieldName);

				console.log("fieldName: ", fieldName, field);
				const result = field.value !== "";

				if (!result) {
					console.log("CHECKING RESULT", requiredBillingFieldNames[fieldName]);
					missingBillingFields.push(requiredBillingFieldNames[fieldName]);
				}
				return result;
			})
			.every((iteration) => !!iteration);

		function next() {
			window.location.href = "checkout2.html";
		}

		console.log(
			"areShippingFieldsValid: ",
			areShippingFieldsValid,
			"areBillingFieldsValid: ",
			areBillingFieldsValid,
			"sameAddress.checked: ",
			sameAddress.checked
		);

		if (sameAddress.checked && areShippingFieldsValid) {
			next();
		} else if (
			!sameAddress.checked &&
			areShippingFieldsValid &&
			areBillingFieldsValid
		) {
			next();
		} else {
			toastToggle(
				{ missingShippingFields, missingBillingFields },
				true,
				sameAddress.checked
			);
			window.scrollTo(0, 0);
		}
	}

	checkoutNext.addEventListener("click", validateCheckout, false);
}

window.onload = addEvents;
