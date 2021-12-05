function showDetail() {
  document.querySelector(".gift").innerHTML = ``;
  const urlParams = new URLSearchParams(window.location.search);
  const giftId = urlParams.get("gift");

  fetch(`api/gifts/${giftId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((gift) => renderGift(gift));
}

function renderGift(gift) {
  const { image, title, description } = gift;

  giftEl = document.createElement("div");
  giftEl.innerHTML = `
    <img src="img/${image}" />
    <h3>${title}</h3>
    <p>${description}</p>
    <a href="/">Back</a>
    `;

  editForm.title.value = title;
  editForm.image.value = image;
  editForm.description.value = description;

  document.querySelector(".gift").append(giftEl);
}

const updateGift= (event) => {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const giftId = urlParams.get("gift");
  const { title, image, description } = event.target;
  const updatedGift = {
    _id: giftId,
    title: title.value,
    image: image.value,
    description: description.value,
  };
  fetch(`api/gifts/${giftId}`, {
    method: "PUT",
    body: JSON.stringify(updatedGift),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(showDetail);
};

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", updateGift);

showDetail();
