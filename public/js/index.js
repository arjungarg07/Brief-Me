document.getElementById('url-form').addEventListener('submit', async (e) => {
	// let creationDate = new Date().toLocaleDateString();
	e.preventDefault();
	// console.log(e.target.elements[0].value);
	const {
		target: {
			elements: [{ value: originalUrl }],
		},
	} = e;

	if (!validURL(originalUrl)) {
		console.log('Invalid Url');
		onInvalid();
	} else {
		//   console.log(elements[0].value);
		console.log(originalUrl);
		let response = await fetch('/shorten', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				originalUrl,
			}),
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
		if (response.success) {
			console.log('Response:', response);
			document.getElementById('shorten_url').innerText = response.data;
			document.getElementById('shorten_url').href = response.data;
			document.getElementById('copy').innerText='Copy'
		}
		document.querySelector('#copy').style.display = 'block';
		document.querySelector('#copy').addEventListener('click', (e) => {
			ClipBoard(response.data);
		});
	}
});

function validURL(url) {
	if (
		url.substring(0, 4) != 'http' &&
		url.substring(0, 4) != 'HTTP' &&
		url.substring(0, 4) != 'Http'
	)
		return false;
	else {
		return true;
	}
}

function onInvalid() {
	document.getElementById('invalid-url').style.display = 'block';
	document.getElementById('invalid-url').innerText = 'Please enter Valid Url';
	setTimeout(function () {
		document.getElementById('invalid-url').style.display = 'none';
	}, 2000);
}

function submitForm(e) {
	console.log(e.target);
}

function ClipBoard(result) {
	navigator.clipboard.writeText(result);
	document.getElementById("copy").innerHTML='Copied'
}
