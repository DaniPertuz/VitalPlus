import React from 'react';

import '../../styles/styles.css';

import logo from '../../assets/VitalPlus.png';
import { useForm } from '../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleInputChange] = useForm({
        username: '',
        password: ''
    });

    const { username, password } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(username, password));
    }

    return (
        <div id="login" className="container-fluid">
            <div className="row">
                <div className="container text-center col-xs-12 col-sm-12 col-md-9 col-lg-4 mt-5">
                    <form
                        className="container bg-light rounded animate__animated animate__zoomIn"
                        onSubmit={handleLogin}
                    >
                <div className="col-xs-3 col-sm-3 col-md-12 col-lg-12 text-center">
                    <img
                        className="rounded w-75 animate__animated animate__zoomIn"
                        src={logo}
                        alt="Logo" />
                </div>
                        <h3
                            className="text-center mt-2">
                            Inicio de sesión
                            </h3>
                        <div className="form-group">
                            <input
                                id="inputUsername"
                                type="text"
                                className="form-control mt-4"
                                placeholder="Nombre de usuario"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                id="inputPassword"
                                type="password"
                                className="form-control mt-4"
                                placeholder="Contraseña"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group text-center">
                            <button
                                type="submit"
                                className="btn btn-primary bg-gradient rounded-pill my-5 px-5">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
