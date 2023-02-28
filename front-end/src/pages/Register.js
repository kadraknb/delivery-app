import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';

function Register() {
  const { setEmail, setPassword } = useContext(DeliveryContext);
  // const [error, setError] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(true);
  // const navigate = useNavigate();

  return (
    <div>
      <form>
        <h1>Registro</h1>
        <section>
          <label htmlFor="input-email">
            E-mail
            <input
              type="email"
              name="email"
              onChange={ (e) => setEmail(e.target.value) }
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="label-password">
            Password
            <input
              type="password"
              name="password"
              onChange={ (e) => setPassword(e.target.value) }
              data-testid="common_login__input-password"
            />
          </label>
        </section>
        <div>
          <button
            type="button"
            name="register"
            data-testid="common_login__button-register"
          >
            Register
          </button>
        </div>
      </form>
      { error ? <p data-testid="common_login__element-invalid-email">Mensagem de erro</p>
        : undefined }

    </div>
  );
}

export default Register;
