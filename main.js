let movie
const main = document.querySelector('#main')
const searchButton = document.querySelector('#search')
const tombol = document.querySelector('#Search-button')
function onsearch(searchparam) {

   if (searchparam == '') {
      main.innerHTML = '';
      return;
   }

   axios.get('https://www.omdbapi.com/?apikey=d684a20e&s=' + searchparam)

      .then(response => {
         const data = response.data
         const movies = data.Search
         let cards = "";
         movies.forEach(el => cards += showCards(el))

         main.innerHTML = cards


         const detailButton = document.querySelectorAll('.details-button')
         detailButton.forEach((button) => {
            button.addEventListener('click', (event) => {
               event.preventDefault();
               const movie = event.target.getAttribute('data-id');
               getMovieDetails(movie);
            })

         })



      })
}

function getMovieDetails(movie) {
   axios.get('https://www.omdbapi.com/?apikey=d684a20e&i=' + movie)
      .then(response => {
         const data = response.data;
         displaymoviedetails(data);

      })
      .catch(error => {
         console.error(error);
      })

}
function displaymoviedetails(moviedetails) {
   const detailcards = `<div class="detail-card">
   <h1>${moviedetails.Title}</h1>
   <div class="left-content">
     <img src="${moviedetails.Poster}" title="${moviedetails.Title}">
   </div>
   <div class="right-content">
     <ul class="movie-misc-info">
       <li class="year"> <strong>Year : </strong> ${moviedetails.Year}</li>
       <li class="rated"><strong>Ratings : </strong> ${moviedetails.Rated}</li>
       <li class="released"><strong>Released : </strong> ${moviedetails.Released}</li>
     </ul>
     <p class="genre"> <strong>Genre : </strong> ${moviedetails.Genre}</p>
     <p class="writer"><strong>Writer : </strong> ${moviedetails.Writer}</p>
     <p class="plot"><strong>Plot : </strong> ${moviedetails.Plot}</p>
     <p><strong>Director : </strong> ${moviedetails.Director}</p>
     <p><strong>Actors : </strong> ${moviedetails.Actors}</p>
     <p class="language"> <strong>Language : </strong> ${moviedetails.Language}</p>
     <div class="close-button">
       <a href="#" class="details-close-button">Close</a>
     </div>
   </div>
 </div>
 `;

   main.innerHTML = detailcards;

   const closebutton = document.querySelectorAll('.details-close-button')
   closebutton.forEach((btn) => {
      btn.addEventListener('click', () => {
         clearmovie();
      })


   })


}

function clearmovie() {
   main.innerHTML = '';
   onsearch(searchButton.value)
}


function showCards(el) {
   return `
   <div class="card">
       <h1>${el.Title}</h1>
       <img src="${el.Poster}"
       title="${el.Title}">
       <a href="#" class="details-button" data-id = "${el.imdbID}">Details</a>
   </div>`




}
searchButton.addEventListener('input', function () {

   onsearch(searchButton.value)
})
