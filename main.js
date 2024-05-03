const content = document.querySelector(".content");

async function fetchData() {
  try {
    const response = await fetch(
      "https://64fc7173605a026163ae8034.mockapi.io/gallery"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Response was not OK");
  }
  /* fetch("https://64fc7173605a026163ae8034.mockapi.io/gallery")
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Response was not OK");
    }); */
}

fetchData()
  .then((data) => renderItems(data))
  .catch((error) => {
    content.innerText = "Something went wrong :-(";
  });

function createItem({ name, photos }) {
  const images = photos.reduce(
    (acc, url) => acc + `<img class="content__img" src="${url}"  alt="" />`,
    ""
  );
  return `
    <div>

      <p class="content__title">${name}</p>
      <div class="content__item">${images}</div>
    </div>
  `;
}

function renderItems(data) {
  let fragment = "";
  data.forEach((item) => {
    fragment += createItem(item);
  });
  content.innerHTML = fragment;
}
