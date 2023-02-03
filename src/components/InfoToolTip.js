import successPicture from '../images/register_success.svg';
import failPicture from '../images/register_fail.svg';

function InfoToolTip({ isOpen, onClose, state }) {

  return (
    <div className={`popup infotooltip ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        <div className='infotooltip__elements'>
          <img src={state ? successPicture : failPicture} className="infotooltip__img" />

          {state ? <p className='infotooltip__text'>Вы успешно<br />зарегистрировались!</p> : <p className='infotooltip__text'>Что-то пошло не так!<br />Попробуйте ещё раз.</p>}

        </div>
        <button
          type="button"
          aria-label="Кнопка закрыть"
          className="popup__button-close"
          onClick={onClose}
        />

      </div>
    </div>
  );
}

export default InfoToolTip