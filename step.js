const steps = document.querySelectorAll(".step");

let inProgress = false;
let animationTriggered = false;

function startProgress(step) {
	if (inProgress || animationTriggered) {
		return;
	}

	inProgress = true;

	const progressBar = document.getElementById(`myBar-${step.dataset.step}`);
	let width = 0;
	const intervalId = setInterval(frame, 20);

	function frame() {
		if (width >= 100) {
			clearInterval(intervalId);
			inProgress = false;

			if (step.dataset.step == 1) {
				const nextStep = document.querySelector('[data-step="2"]');
				nextStep.classList.remove("disabled");
			}
			console.log(`Animation for step ${step.dataset.step} is complete`);
			animationTriggered = true;

			// Change the color of the next step title, icon, and border to red
			const nextStepTitle = document.querySelector(
				`#title-${Number(step.dataset.step) + 1}`
			);
			const nextStepIcon = document.querySelector(
				`#fa-icon-${Number(step.dataset.step) + 1}`
			);
			const nextStep = document.querySelector(
				`[data-step="${Number(step.dataset.step) + 1}"]`
			);
			if (nextStepTitle) {
				nextStepTitle.style.color = "rgb(82, 132, 242)";
			}
			if (nextStepIcon) {
				nextStepIcon.style.color = "rgb(82, 132, 242)";
			}
			if (nextStep) {
				nextStep.style.border = "2px solid rgb(82, 132, 242)";
			}
			animationTriggered = false; // Reset the flag
		} else {
			width++;
			progressBar.style.width = width + "%";
		}
	}
}

steps.forEach((step) => {
	step.addEventListener("click", () => {
		if (step.classList.contains("disabled") || inProgress) {
			return;
		}

		startProgress(step);

		console.log(`Step ${step.dataset.step} has been clicked`);
	});

	step.addEventListener("mouseenter", () => {
		icon.style.color = "rgb(82, 132, 242)";
		title.style.color = "rgb(82, 132, 242)";
	});

	step.addEventListener("mouseleave", () => {
		icon.style.color = "rgb(138, 138, 138)";
		title.style.color = "rgb(61, 61, 61)";
	});
	const firstStep = document.querySelector(".step");
	firstStep.addEventListener("click", (event) => {
		const icon = event.target.querySelector(
			`#fa-icon-${event.target.dataset.step}`
		);
		const title = event.target.querySelector(
			`#title-${event.target.dataset.step}`
		);
		icon.style.color = "rgb(82, 132, 242)";
		title.style.color = "rgb(82, 132, 242)";
		event.target.style.border = "2px solid rgb(82, 132, 242)";
	});

	const nextStep = document.querySelector('[data-step="2"]');
	nextStep.classList.add("disabled");
});
