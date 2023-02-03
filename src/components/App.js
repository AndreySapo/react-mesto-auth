import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { exampleAPI } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import '../index.css';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    about: "Исследователь океана",
    avatar: "../images/Avatar.png",
    name: "Жак Ив-Кусто",
  })

  // обработчики кнопок в Main
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCloseAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    exampleAPI.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards( // обновляем карточки
          (state) => state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleCardDelete(card) {
    exampleAPI.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateUser(inputs) {
    exampleAPI.setUserInfo(inputs)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleUpdateAvatar(link) {
    exampleAPI.setAvatar(link)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }

  function handleAddPlaceSubmit(cardFromInput) {
    // TODO запрос к апи с добавлением карточки

    exampleAPI.addNewCard(cardFromInput)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })

  }

  React.useEffect(() => {
    Promise.all(
      [
        exampleAPI.getUser(),
        exampleAPI.getCardList()
      ]
    )
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          title={`confirm-popup`}
          name={`confirm`}
        />

        <ImagePopup
          card={selectedCard}
          onClose={handleCloseAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
