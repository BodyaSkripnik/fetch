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
}

fetchData()
  .then((response) => createImages(response))
  .catch((error) => {
    console.log("error");
  });

function createImgTemplate(name, url) {
  return `<div>
            <h1 class="content-title">${name}</h1>
            <div class="content__wrapper">${url}</div>
          </div>`
}

function createImages(response) {
  response.forEach(({ name, photos }) => {
    const urls = photos.reduce(
      (acc, url) => acc + `<img class="photo" src="${url}"  alt="" />`,
      ""
    );
    content.innerHTML += createImgTemplate(name, urls);
  });
}
