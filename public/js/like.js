const likeButton = document.querySelector(".like");

likeButton.addEventListener("click", () => {
axios
  .post("/likes/save" + id)
  .then((response) => {
  const likeData = response.data;
  updateSpecificLesson(likeData);
})
.catch(function (error) {
  console.log(error);
})
})
