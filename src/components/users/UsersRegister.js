import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegWindowClose } from 'react-icons/fa';
import generator from 'generate-password';

import { useForm } from '../hooks/useForm';
import { addUser } from '../../redux/actions/users';

export const UsersRegister = () => {

    const dispatch = useDispatch();

    const [display, setDisplay] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        role: ''
    });

    const { user: userDB } = useSelector(state => state.users);

    const [values, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        role: ''
    });

    const { name, email, role } = values;

    useEffect(() => {
        setUser(userDB);
    }, [dispatch, email, userDB]);

    const handleDisplay = () => {
        setDisplay(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const pwd = generator.generate({
            length: 10,
            numbers: true,
            uppercase: false
        });

        setPassword(pwd);
        values.password = pwd;

        dispatch(addUser(values));
        setDisplay(true);

        reset();
    }

    return (
        <div className="row">
            <p className="fs-3 text-center mt-3">Agregar nuevo usuario</p>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-3 mt-1">
                        <input
                            id="inputName"
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            autoComplete="off"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3 mt-1">
                        <input
                            id="inputEmail"
                            type="email"
                            className="form-control"
                            placeholder="Email de usuario"
                            autoComplete="off"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3 mt-1">
                        <select
                            id="inputRole"
                            className="form-select"
                            name="role"
                            value={role}
                            onChange={handleInputChange}>
                            <option defaultChecked>
                                Rol de usuario...
                            </option>
                            <option value="ADMIN">
                                Administrador
                            </option>
                            <option value="AGENT">
                                Agente
                            </option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button
                            type="submit"
                            className="btn btn-primary m-1"
                        >
                            Generar usuario
                    </button>
                    </div>
                </div>
            </form>
            {display &&
                <div className="row">
                    <div
                        className="col-md-3 offset-md-4 mt-2
                    border border-success rounded text-center text-success bg-success">
                        <button
                            onClick={handleDisplay}
                            className="btn text-success float-end">
                            <FaRegWindowClose />
                        </button>
                        <div className="clearfix" />
                        {user &&
                            <p className="text-start">
                                Nombre de usuario: {user.username}
                                <br />
                                Contraseña: {password}
                            </p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
