import logo from '../images/logo_white.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header({ loggedIn, email }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      {/* <Routes>
        <Route path='/sign-in' element={
          <Link to='/sign-up' className='header__link'>Зарегистрироваться</Link>
        } />
        <Route path='/sign-up' element={
          <Link to='/sign-in' className='header__link'>Войти</Link>
        } />
        <Route path='/' element={
          <div className='header__block'>
            <p className='header__email'>{email}</p>
            <Link to='sign-in' className='header__exit'>Выйти</Link>
          </div>
        } />
      </Routes> */}
    </header>
  )
}

export default Header