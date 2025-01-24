const render = document.querySelector('.gallerylist');

export function formResults(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="gallery-item">
            <a href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" height="200"/>
            </a>
            <div class="info">
                <p class="info-text"><b>Likes:</b> ${likes}</p>
                <p class="info-text"><b>Views:</b> ${views}</p>
                <p class="info-text"><b>Comments:</b> ${comments}</p>
                <p class="info-text"><b>Downloads:</b> ${downloads}</p>
            </div>
        </div>
    `
    )
    .join('');

  render.insertAdjacentHTML('beforeend', markup);
}
