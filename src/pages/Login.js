import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginAction } from '../actions';
import wallet from '../img/wallet.png';
import './Login.css';

// refatorado usando hooks

// validate é criado para ser chamado no useEffect
function validate(email, password, btnDisabled) {
  const MIN_PASSWORD_LENGTH = 5;
  const validateEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/.test(email);
  const validatePassword = password.length > MIN_PASSWORD_LENGTH;
  const validInputs = [validateEmail, validatePassword];
  const isValid = validInputs.every((input) => input);
  if (isValid) {
    btnDisabled(false);
  } else {
    btnDisabled(true);
  }
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  // Hook useEffect como componentDidMount, componentDidUpdate, e componentWillUnmount combinados.
  useEffect(() => { validate(email, password, setIsDisabled); }, [email, password]);

  const handleClick = () => {
    dispatch(loginAction(email));
    history.push('/carteira');
  };
  return (
    <div className="container-login">
      <div className="Login">
        <div className="img-wallet">
          <img className="img-login" src={ wallet } alt="wallet" />
        </div>
        <h2 className="text-login">Login</h2>
        <div className="container-input-login">
          <input
            className="input-login"
            data-testid="email-input"
            type="text"
            name="email"
            value={ email }
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            className="input-login"
            data-testid="password-input"
            type="password"
            name="password"
            value={ password }
            placeholder="Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        <button
          className="button-login"
          type="button"
          disabled={ isDisabled }
          onClick={ () => handleClick() }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
