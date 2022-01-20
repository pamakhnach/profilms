
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.button__search');
const filmsList = document.querySelector('.films_list');
const filmInfo = document.querySelector('.film__info');
const fixed = document.querySelector('.fixed__info');
const body = document.querySelector('body');
const btnLeft = document.querySelector('.btn__left');
const btnRight = document.querySelector('.btn__right');
const title = document.querySelector('.header__title');
const erorr = document.querySelector('.erorr');

let pageCount = 1;

pageCount === 1 ? btnLeft.classList.remove('active') : btnLeft.classList.add('active');

createFilmlist();

btnLeft.addEventListener('click', () => {
    pageCount--
    pageCount === 1 ? btnLeft.classList.remove('active') : btnLeft.classList.add('active');

    filmsList.innerHTML = "";

    createFilmlist()
})


btnRight.addEventListener('click', () => {
    pageCount++

    filmsList.innerHTML = "";
    btnLeft.classList.add('active');

    createFilmlist();
})

title.addEventListener('click', () => {
    pageCount = 1;

    filmsList.innerHTML = "";
    searchInput.value = "";

    createFilmlist();
})

function createFilmlist() {
fetch(`https://api.themoviedb.org/3/discover/movie?page=${pageCount}&api_key=6c6f41519384715153841c341e2ac177`)
    .then((resp) =>  resp.json() )
    .then(function(data) {

       erorr.innerHTML = "";

    function createFilm(filmData){
        const filmElement = document.createElement('li');
        filmElement.classList.add('film');

        let poster = filmData.poster_path ? `https://image.tmdb.org/t/p/w500${filmData.poster_path}` : "image/5.jpg";

        filmElement.innerHTML = `<img class="logo__film" src='${poster}'>
                                <span class="title__film">${filmData.original_title}</span>`;

        filmsList.append(filmElement);

        filmElement.addEventListener('click', (e) => {
            fetch(`https://api.themoviedb.org/3/movie/${filmData.id}?api_key=6c6f41519384715153841c341e2ac177`)
                .then((resp) => resp.json() )
                .then(function(data) {
                
                body.classList.add('active');
                fixed.classList.add('active');

                fixed.innerHTML = `<img class="poster_path" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
                                        <div class="info">
                                        <h1 class="title">${data.original_title}</h1>
                                        <p class="year">Date: <span>${data.release_date}</span></p>
                                        <p class="country">Country: <span>${data.production_countries[0].name}</span></p>
                                        <p class="genres">Genre: <span>${data.genres[0].name}</span></p>
                                        <p class="company">Production company: <span>${data.production_companies[0].name}</span></p>
                                        <p class="overview">Overview: <span>${data.overview}</span></p>
                                        <button class="modal__close">Close</button>
                                        </div>`;
                
                const closeModal = document.querySelector('.modal__close');

                closeModal.addEventListener('click', () => {
                    body.classList.remove('active');
                    fixed.classList.remove('active');
                })
        })
                .catch(function(){
                    alert('Error: not information!!!');
                });
        });
    }

        data.results.forEach(film => createFilm(film));

    })
    .catch(function(){
        alert('Error');
    });
}

searchButton.addEventListener('click', () => {
    if(searchInput.value) {
    filmsList.innerHTML = '';

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=6c6f41519384715153841c341e2ac177&query=${searchInput.value}`)
        .then((resp) => resp.json() )
        .then(function(data) {
           
            data.results.length === 0 ? erorr.innerHTML = "<h1 class='not__found'>Nothing found</h1>" : erorr.innerHTML = "";

            function createFilm(filmData){
                const filmElement = document.createElement('li');

                filmElement.classList.add('film');
                
                let poster = filmData.poster_path ? `https://image.tmdb.org/t/p/w500${filmData.poster_path}` : "image/5.jpg";

                filmElement.innerHTML = `<img class="logo__film" src='${poster}'><span class="title__film">${filmData.original_title}</span>`;
                
                filmsList.append(filmElement);
        
                filmElement.addEventListener('click', (e) => {
                    fetch(`https://api.themoviedb.org/3/movie/${filmData.id}?api_key=6c6f41519384715153841c341e2ac177`)
                        .then((resp) => resp.json() )
                        .then(function(data) {
        
                        body.classList.add('active');
                        fixed.classList.add('active');
        
                        fixed.innerHTML = `<img class="poster_path" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
                                                <div class="info">
                                                <h1 class="title">${data.original_title}</h1>
                                                <p class="year">Date: <span>${data.release_date}</span></p>
                                                <p class="country">Country: <span>${data.production_countries[0].name}</span></p>
                                                <p class="genres">Genre: <span>${data.genres[0].name}</span></p>
                                                <p class="company">Production company: <span>${data.production_companies[0].name}</span></p>
                                                <p class="overview">Overview: <span>${data.overview}</span></p>
                                                <button class="modal__close">Close</button>
                                                </div>`;
                            
                        const closeModal = document.querySelector('.modal__close');
                
                        closeModal.addEventListener('click', () => {
                        body.classList.remove('active');
                        fixed.classList.remove('active');
                        })
                })
                        .catch(function(){
                            alert('Error: not information!!!');
                        });
                });
            }

            data.results.forEach(film => createFilm(film));
        })
    } else {
        filmsList.innerHTML = "";

        createFilmlist()
    }
});


