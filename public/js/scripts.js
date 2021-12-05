function getGifts() {
  document.querySelector(".gifts").innerHTML = ``;
  fetch(`api/gifts`)
    .then((response) => response.json())
    .then((data) => data.sort((a, b) => +b.year - +a.year))
    .then((gifts) => renderGifts(gifts));
}

function addGift(event) {
  event.preventDefault();
  const { title, image, year, description } = event.target;
  const gift = {
    title: title.value,
    image: image.value,
    year: year.value,
    description: description.value,
  };
  fetch("api/gifts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gift),
  })
    .then((response) => response.json())
    .then(getGifts);
}

function renderGifts(gifts) {
  gifts.forEach((gift) => {
    // destructure
    const { _id, title, image, year, description } = gift;
    giftEl = document.createElement("div");
    giftEl.innerHTML = `
    <img src="img/${image}" />
    <h3><a href="detail.html?gift=${_id}">${title}</a></h3>
    <p>${description}</p>
    <p>${year}</p>
    <button class="delete" data-id=${_id} href="#">Delete</button>
  `;
    return document.querySelector(".gifts").append(giftEl);
  });
}

function deleteGift(event) {
  fetch(`api/gift/${event.target.dataset.id}`, {
    method: "DELETE",
  }).then(getGifts());
}

// new
function seed() {
  fetch("api/import").then(getGifts);
}

function handleClicks(event) {
  if (event.target.matches("[data-id]")) {
    deleteGift(event);
  } else if (event.target.matches("#seed")) {
    seed();
  }
}

document.addEventListener("click", handleClicks);

const addForm = document.querySelector("#addForm");
addForm.addEventListener("submit", addGift);

getGifts();
