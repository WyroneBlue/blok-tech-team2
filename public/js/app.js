const faveBtn = document.querySelector('.save-restaurant');
const starRating = document.querySelector('#star-rating');
const sliderRating = document.querySelector('#slider-rating');
const useVibrationBtn = document.querySelector('form label button');
let useVibration = false;

const checkVibration = () => {
	if (!window || !window.navigator || !window.navigator.vibrate) {
		useVibrationBtn.classList.add('n-a');
		return;
	}
};

const vibrate = (ms = 10) => {
	navigator.vibrate([ms]);
};

const toggleRestaurant = (e) => {

	e.target.classList.toggle('saved');
	if(e.target.classList.contains('saved')){

		e.target.src = e.target.dataset.saved;
	} else {

		e.target.src = e.target.dataset.unsaved;
	}
};

const updateRating = (value) => {
	starRating.style.width = `${value}vw`;
	if(useVibration){
		vibrate();
	}
};

const setSliderRating = (e) => {
	e.preventDefault();
	if(e.target.value >= 1){
		let val = calcRating(e.target.value);
		updateRating(val);
	} else {
		e.target.value = 1;
	}
};

const calcRating = (rating, stars = 5) => {
	const width = stars * 17.9;
	return ((rating / stars) * width);
};

if(faveBtn){
	faveBtn.addEventListener('click', toggleRestaurant);
}

if(sliderRating){
	sliderRating.addEventListener('input', setSliderRating, {passive: false});
}

if(useVibrationBtn){
	useVibrationBtn.addEventListener('click', (e) => {
		e.target.classList.toggle('active');
		useVibration = !useVibration;
	});
}

window.addEventListener('DOMContentLoaded', checkVibration);