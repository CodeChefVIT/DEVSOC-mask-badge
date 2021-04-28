async function requestExternalImage(imageUrl) {
	const res = await fetch("fetch_external_image", {
		method: "post",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ imageUrl }),
	});
	if (!(res.status < 400)) {
		console.error(res.status + " : " + (await res.text()));
		throw new Error("failed to fetch image from url: " + imageUrl);
	}

	let blob;
	try {
		blob = await res.blob();
		return await faceapi.bufferToImage(blob);
	} catch (e) {
		console.error("received blob:", blob);
		console.error("error:", e);
		throw new Error("failed to load image from url: " + imageUrl);
	}
}

function renderNavBar(navbarId, exampleUri) {
	const examples = [
		{
			uri: "mask_on_profile",
			name: "Put a #MaskOn with Photify",
		},
		{
			uri: "badge",
			name: "Get the official DEVSOC Badge",
		},
	];

	const navbar = $(navbarId).get(0);
	const pageContainer = $(".page-container").get(0);

	const header = document.createElement("h3");
	header.innerHTML = examples.find((ex) => ex.uri === exampleUri).name;
	pageContainer.insertBefore(header, pageContainer.children[0]);

	const menuContent = document.createElement("ul");
	menuContent.id = "slide-out";
	menuContent.classList.add("side-nav", "fixed");
	navbar.appendChild(menuContent);

	const menuButton = document.createElement("a");
	menuButton.href = "#";
	menuButton.classList.add("button-collapse", "show-on-large");
	menuButton.setAttribute("data-activates", "slide-out");
	const menuButtonIcon = document.createElement("i");
	menuButtonIcon.classList.add("material-icons", "small");
	menuButtonIcon.innerHTML = "menu";
	menuButton.appendChild(menuButtonIcon);
	navbar.appendChild(menuButton);

	const li = document.createElement("li");
	const websiteLink = document.createElement("a");
	websiteLink.classList.add("waves-effect", "waves-light", "side-by-side");
	websiteLink.id = "github-link";
	websiteLink.href = "https://photify.codechefvit.com";
	websiteLink.target = "_blank";
	const h5 = document.createElement("h5");
	h5.innerHTML = "Photify!";
	websiteLink.appendChild(h5);
	li.appendChild(websiteLink);
	menuContent.appendChild(li);

	examples.forEach((ex) => {
		const li = document.createElement("li");
		if (ex.uri === exampleUri) {
			li.style.background = "#080020";
		}
		const a = document.createElement("a");
		a.classList.add("waves-effect", "waves-light", "pad-sides-sm");
		a.href = ex.uri;
		const span = document.createElement("span");
		span.innerHTML = ex.name;
		span.style.whiteSpace = "nowrap";
		a.appendChild(span);
		li.appendChild(a);
		menuContent.appendChild(li);
	});

	$(".button-collapse").sideNav({
		menuWidth: 260,
	});
}

function renderSelectList(
	selectListId,
	onChange,
	initialValue,
	renderChildren
) {
	const select = document.createElement("select");
	$(selectListId).get(0).appendChild(select);
	renderChildren(select);
	$(select).val(initialValue);
	$(select).on("change", (e) => onChange(e.target.value));
	$(select).material_select();
}

function renderOption(parent, text, value) {
	const option = document.createElement("option");
	option.innerHTML = text;
	option.value = value;
	parent.appendChild(option);
}
