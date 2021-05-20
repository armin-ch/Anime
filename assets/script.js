document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('anime').innerHTML = ''

  axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${document.getElementById('name').value}`)
    .then(res => {
      let anime = res.data.data
      for (i = 0; i < 10; i++) {
        let source = anime[i].attributes.posterImage.medium
        console.log(anime[i])
        document.getElementById('anime').innerHTML += `
                <div class="col s12 m4">
                  <div class="card">
                    <div class="card-image">
                      <img src="${source}" alt="${anime[i].attributes.titles.en_jp}">
                      <span class="card-title">${anime[i].attributes.titles.en_jp} (EN)<br />${anime[i].attributes.titles.ja_jp} (JP)</span>
                    </div>
                    <div class="card-content">
                      <p>Age Rating: ${anime[i].attributes.ageRating}</p>
                      <p>Rating: ${anime[i].attributes.averageRating}</p>
                      <p>Status: ${anime[i].attributes.status}</p>
                      <p>Number of Episodes: ${anime[i].attributes.episodeCount}</p>
                      <p>Categories: ${anime[i].relationships.categories.links.related}</p>
                    </div>
                  </div>
                </div>
            `
      }
      document.getElementById('name').value = ''
    })
    .catch(err => console.error(err))
})