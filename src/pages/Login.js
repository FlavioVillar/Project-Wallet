import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
    this.validateInputs = this.validateInputs.bind(this);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.setState({ isDisabled: this.validateInputs() });
    });
  }

  // alguem@email.com
  validateInputs() {
    const { email, password } = this.state;
    const MIN_PASSWORD_LENGTH = 6;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return !regex.test(email) || password.length < MIN_PASSWORD_LENGTH;
  }

  render() {
    const { isDisabled, email, password } = this.state;
    const { login } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <input
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              placeholder="Email"
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              placeholder="Senha"
              onChange={ this.handleChange }
            />
          </div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ () => { login(email); } }
            >
              Entrar

            </button>
          </Link>
        </form>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
