const likeButtons = document.querySelectorAll("form button.like");
const noMoreCardsSection = document.querySelector("#no-more-cards");
let cards = [];
let cardCounter;
async function saveLike (e) {

	const form = e.parentNode;
	const formData = new FormData(form);
    const restaurant_id = formData.get("restaurant_id").trim();
	const card = form.parentNode.parentNode
	const route = '/likes/save';
	try {
		
		const response = await axios.post(route, {
			restaurant_id: restaurant_id,
		});

		if(response.status === 200){
			cardCounter--;
			card.remove();
			if(cardCounter === 0){
				console.log('no more');
				noMoreCardsSection.classList.add('show')
			}
		}
		return response;
	} catch (errors) {
		console.error(errors);
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
