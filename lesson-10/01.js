/*
  Цель задания: Разработать функционал для удаления фильма из списка с использованием паттерна MVC. После удаления фильма, необходимо отобразить сообщение "Фильм успешно удалён!" в message-box

  При возникновении сложностей можете ознакомиться с пошаговым планом реализации ниже, но лучше попробовать сначала самостоятельно 🧙‍♂️

Пошаговый план реализации:

1. Реализовать метод deleteMovie в объекте model:
  - метод должен принимать id фильма, который необходимо удалить
  - метод должен удалить фильм из массива movies
  - метод должен обновить отображение фильмов на странице

2. Добавить обработчик события для удаления фильмов:
  - в метода view.init добавить обработчик события на список фильмов
  - используя делегирование событий, обработать клик на кнопке удаления фильма
  - при клике на кнопку удаления, получить id фильма из родительского элемента и передать его в метод deleteMovie объекта controller

3. Реализовать метод deleteMovie в объекте controller:
  - метод должен принимать id фильма
  - метод должен передать id фильма в метод deleteMovie объекта model
  - метод должен отобразить сообщение "Фильм успешно удалён!" в message-box
*/

// const model = {
//   movies: [],
//   addMovie(title, description) {
//     const id = Math.random()
//     const newMovie = { id, title, description }
//     this.movies.push(newMovie)
//     view.renderMovies(this.movies)
//   },
//   // your code
//   deleteMovie(id) {
//     this.movies = this.movies.filter(movie => movie.id !== id);
//     this.view.renderMovies(this.movies);
//   },
//   setView(viewInstance) {
//     this.view = viewInstance;
//   }
// }
//
// const view = {
//   init() {
//     this.moviesContainer = document.querySelector('.list');
//     this.messageBox = document.querySelector('.message-box');
//     this.renderMovies(model.movies)
//
//     const form = document.querySelector('.form')
//     const inputTitle = document.querySelector('.input-title')
//     const inputDescription = document.querySelector('.input-description')
//
//     form.addEventListener('submit', function (event) {
//       event.preventDefault()
//       const title = inputTitle.value
//       const description = inputDescription.value
//       controller.addMovie(title, description)
//
//       inputTitle.value = ''
//       inputDescription.value = ''
//     })
//
//     // your code
//
//     this.moviesContainer.addEventListener('click', (event) => {
//       if (event.target.classList.contains('delete-button')) {
//         const movieElement = event.target.closest('.movie');
//         const id = movieElement.id;
//         controller.deleteMovie(id);
//       }
//     });
//   },
//   renderMovies(movies) {
//     const list = document.querySelector('.list')
//     let moviesHTML = ''
//
//     for (const movie of movies) {
//       moviesHTML += `
//         <li id="${movie.id}" class="movie">
//           <b class="movie-title">${movie.title}</b>
//           <p class="movie-description">${movie.description}</p>
//           <button class="delete-button" type="button">Удалить 🗑</button>
//         </li>
//       `
//     }
//
//     list.innerHTML = moviesHTML
//   },
//   displayMessage(message, isError = false) {
//     const messageBox = document.querySelector('.message-box')
//     messageBox.textContent = message
//     if (isError) {
//       messageBox.classList.remove('success')
//       messageBox.classList.add('error')
//     } else {
//       messageBox.classList.remove('error')
//       messageBox.classList.add('success')
//     }
//   },
// }
//
// const controller = {
//   addMovie(title, description) {
//     if (title.trim() !== '' && description.trim() !== '') {
//       model.addMovie(title, description)
//       view.displayMessage('Фильм добавлен успешно!')
//     } else {
//       view.displayMessage('Заполните все поля!', true)
//     }
//   },
//   // your code
//   deleteMovie(id) {
//     model.deleteMovie(id);
//     view.displayMessage('Фильм успешно удалён!');
//   }
// }
//
// function init() {
//   model.setView(view)
//   view.init()
// }
//
// document.addEventListener('DOMContentLoaded', init)

const model = {
  movies: [],

  addMovie(title, description) {
    const id = Math.random().toString(36).substr(2, 9); // уникальный id
    const newMovie = { id, title, description };
    this.movies.push(newMovie);
    view.renderMovies(this.movies);
  },

  deleteMovie(id) {
    // удаляем фильм по id
    this.movies = this.movies.filter(movie => movie.id !== id);
    this.view.renderMovies(this.movies); // обновляем отображение
  },

  // чтобы связать с view, добавим ссылку
  setView(viewInstance) {
    this.view = viewInstance;
  }
};

const view = {
  init() {
    this.moviesContainer = document.querySelector('.list');
    this.messageBox = document.querySelector('.message-box');

    // инициализация рендера фильмов
    this.renderMovies(model.movies);

    // Обработчик формы
    const form = document.querySelector('.form');
    const inputTitle = document.querySelector('.input-title');
    const inputDescription = document.querySelector('.input-description');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = inputTitle.value;
      const description = inputDescription.value;
      controller.addMovie(title, description);
      inputTitle.value = '';
      inputDescription.value = '';
    });

    // Обработчик делегирования кликов для удаления
    this.moviesContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-button')) {
        const movieElement = event.target.closest('.movie');
        const id = movieElement.id; // получаем id фильма
        controller.deleteMovie(id);
      }
    });
  },

  renderMovies(movies) {
    let html = '';
    for (const movie of movies) {
      html += `
        <li id="${movie.id}" class="movie">
          <b class="movie-title">${movie.title}</b>
          <p class="movie-description">${movie.description}</p>
          <button class="delete-button" type="button">Удалить 🗑</button>
        </li>
      `;
    }
    this.moviesContainer.innerHTML = html;
  },

  displayMessage(message, isError = false) {
    this.messageBox.textContent = message;
    if (isError) {
      this.messageBox.classList.remove('success');
      this.messageBox.classList.add('error');
    } else {
      this.messageBox.classList.remove('error');
      this.messageBox.classList.add('success');
    }
  },
};

const controller = {
  addMovie(title, description) {
    if (title.trim() !== '' && description.trim() !== '') {
      model.addMovie(title, description);
      view.displayMessage('Фильм добавлен успешно!');
    } else {
      view.displayMessage('Заполните все поля!', true);
    }
  },

  deleteMovie(id) {
    model.deleteMovie(id);
    view.displayMessage('Фильм успешно удалён!');
  }
};

function init() {
  model.setView(view); // связь модели и представления
  view.init();
}

document.addEventListener('DOMContentLoaded', init);
