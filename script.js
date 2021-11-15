
const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.button__search');
const filmsList = document.querySelector('.films_list');
const filmInfo = document.querySelector('.film__info');
const fixed = document.querySelector('.fixed__info');
const body = document.querySelector('body');
const btnMore = document.querySelector('.btn__more');
const title = document.querySelector('.header__title');
const erorr = document.querySelector('.erorr');


let pageCount = 1;

createFilmlist();

btnMore.addEventListener('click', () => {
    pageCount++

    filmsList.innerHTML = "";

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
    .then(function(resp) { return resp.json() })
    .then(function(data) {

       erorr.innerHTML = "";

       validLength(data.results);

    function createFilm(filmData){
        const filmElement = document.createElement('li');
        filmElement.classList.add('film');

        if (!filmData.poster_path) {
            filmElement.innerHTML = `<img class="logo__film" src="image/5.jpg"><span class="title__film">${filmData.original_title}</span>`;
        } else {
            filmElement.innerHTML = `<img class="logo__film" src="https://image.tmdb.org/t/p/w500${filmData.poster_path}"><span class="title__film">${filmData.original_title}</span>`;
        }

        filmsList.append(filmElement);

        filmElement.addEventListener('click', (e) => {
            fetch(`https://api.themoviedb.org/3/movie/${filmData.id}?api_key=6c6f41519384715153841c341e2ac177`)
                .then(function(resp) { return resp.json() })
                .then(function(data) {
                console.log(data)

                body.style = 'background: rgba(1, 2, 7, 0.596)'
                fixed.style = 'display : block';

                fixed.innerHTML = `<img class="poster_path" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
                                        <div class="info">
                                        <h1 class="title">${data.original_title}</h1>
                                        <p class="year">Date: <span>${data.release_date}</span></p>
                                        <p class="country">Country: <span>${data.production_countries[0].name}</span></p>
                                        <p class="genres">Genre: <span>${data.genres[0].name}</span></p>
                                        <p class="company">Production company: <span>${data.production_companies[0].name}</span></p>
                                        <p class="overview">Overview: <span>${data.overview}</span></p>
                                        </div>`
                    
                window.addEventListener('click', () => {
                    fixed.style = 'display : none';
                    body.style = 'background: #fff'
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
        
    filmsList.innerHTML = '';

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=6c6f41519384715153841c341e2ac177&query=${searchInput.value}`)
        .then(function(resp) { return resp.json() })
        .then(function(data) {

            if(data.results.length === 0) {
                erorr.innerHTML = "<h1 class='not__found'>Nothing found</h1>";
            } else {
                erorr.innerHTML = "";
            }

            btnMore.style = 'display : none';

            function createFilm(filmData){
                const filmElement = document.createElement('li');
                filmElement.classList.add('film');

                if (!filmData.poster_path) {
                    filmElement.innerHTML = `<img class="logo__film" src="image/5.jpg"><span class="title__film">${filmData.original_title}</span>`;
                } else {
                    filmElement.innerHTML = `<img class="logo__film" src="https://image.tmdb.org/t/p/w500${filmData.poster_path}"><span class="title__film">${filmData.original_title}</span>`;
                }

                filmsList.append(filmElement);
        
                filmElement.addEventListener('click', (e) => {
                    fetch(`https://api.themoviedb.org/3/movie/${filmData.id}?api_key=6c6f41519384715153841c341e2ac177`)
                        .then(function(resp) { return resp.json() })
                        .then(function(data) {
                        console.log(data)
        
                        body.style = 'background: rgba(1, 2, 7, 0.596)';
                        fixed.style = 'display : block';
        
                        fixed.innerHTML = `<img class="poster_path" src="https://image.tmdb.org/t/p/w500${data.poster_path}">
                                                <div class="info">
                                                <h1 class="title">${data.original_title}</h1>
                                                <p class="year">Date: <span>${data.release_date}</span></p>
                                                <p class="country">Country: <span>${data.production_countries[0].name}</span></p>
                                                <p class="genres">Genre: <span>${data.genres[0].name}</span></p>
                                                <p class="company">Production company: <span>${data.production_companies[0].name}</span></p>
                                                <p class="overview">Overview: <span>${data.overview}</span></p>
                                                </div>`
                            
                        window.addEventListener('click', () => {
                            fixed.style = 'display : none';
                            body.style = 'background: #fff'
                        })
                })
                        .catch(function(){
                            alert('Error: not information!!!');
                        });
                });
            }

            data.results.forEach(film => createFilm(film));
        })
});

    
function validLength(arr) {
    if (arr.length >= 20) {
        btnMore.style = 'display : block';
    } else {
        btnMore.style = 'display : none';
    }
}
