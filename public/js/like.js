const likeButtons = document.querySelectorAll("form button.like");
const dislikeButtons = document.querySelectorAll("form button.dislike");
const noMoreCardsSection = document.querySelector("#no-more-cards");
let cards = [];
let cardCounter;
async function saveLike (e) {

	const form = e.parentNode;
	const formData = new FormData(form);
    const restaurant_id = formData.get("restaurant_id").trim();
	const card = form.parentNode.parentNode.parentNode;
	const route = '/likes/save';
	try {
		
		const response = await axios.post(route, {
			restaurant_id: restaurant_id,
		});
		console.log(response);

		if(response.status === 200){
			cardCounter--;
			card.classList.add('swipe-right');
			card.addEventListener('animationend', (e) => {
				card.remove();
			});
			if(cardCounter === 0){
				console.log('no more');
				noMoreCardsSection.classList.add('show')
			}
		}
		return response;
	} catch (errors) {
		window.location = '/login';
	}
}

async function saveDislike (e) {

	const form = e.parentNode;
	const formData = new FormData(form);
    const restaurant_id = formData.get("restaurant_id").trim();
	const card = form.parentNode.parentNode.parentNode;
	const route = '/dislikes/save';
	try {
		
		const response = await axios.post(route, {
			restaurant_id: restaurant_id,
		});
		console.log(response);
		if(response.status === 200){
			cardCounter--;
			card.classList.add('swipe-left');
			card.addEventListener('animationend', (e) => {
				card.remove();
			});
			if(cardCounter === 0){
				console.log('no more');
				noMoreCardsSection.classList.add('show')
			}
		}
		return response;
	} catch (errors) {
		window.location = '/login';
	}
}
			
likeButtons.forEach(btn => {
	cards.push(btn);
	cardCounter = cards.length;

	btn.addEventListener("click", function(e) {
		e.preventDefault();
		saveLike(this);
	});
});

dislikeButtons.forEach(btn => {
	btn.addEventListener("click", function(e) {
		e.preventDefault();
		saveDislike(this);
	});
});
