import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import { FaRegWindowClose } from 'react-icons/fa';
import generator from 'generate-password';
import Swal from 'sweetalert2';

import { updateUser } from '../../redux/actions/users';
import { uiCloseModal } from '../../redux/actions/modal';

const initUser = {
    name: '',
    email: '',
    username: '',
    password: '',
    role: ''
}

export const UsersModal = () => {

    const dispatch = useDispatch();

    const { modalDialog } = useSelector(state => state.modal);
    const { user } = useSelector(state => state.users);

    const [formValues, setFormValues] = useState(initUser);
    const [display, setDisplay] = useState(false);
    const [passwordDisplay, setPasswordDisplay] = useState('');

    const { name, username, role } = formValues;

    useEffect(() => {
        if (user) {
            setFormValues(user);
        }
    }, [user]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        dispatch(uiCloseModal());
    }

    const handleDisplay = () => {
        setDisplay(false);
    }

    const handleResetPassword = () => {
        const pwd = generator.generate({
            length: 10,
            numbers: true,
            uppercase: false
        });

        setDisplay(true);
        setPasswordDisplay(pwd);
        setFormValues({
            ...formValues,
            password: pwd
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        if (user) {
            if (JSON.stringify(user) !== JSON.stringify(formValues)) {
                setFormValues({
                    ...formValues,
                    password: passwordDisplay
                });
                dispatch(updateUser(formValues));
                setDisplay(false);
            } else {
                Swal.fire('Atención', 'Datos no fueron modificados', 'info');
            }
        }
        closeModal();
    }

    return (
        <Modal
            open={modalDialog}
            onClose={closeModal}
            center
        >
            <h2 className="mt-4">Actualización de usuario</h2>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                    <label
                        htmlFor="inputName"
                        className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        onChange={handleInputChange}
                        name="name"
                        autoComplete="off"
                        value={name}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputUsername"
                        className="form-label">
                        Usuario
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputDocument"
                        onChange={handleInputChange}
                        name="username"
                        autoComplete="off"
                        value={username}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="inputRole"
                        className="form-label">
                        Rol
                    </label>
                    <select
                        id="inputRole"
                        className="form-select"
                        name="role"
                        value={role}
                        onChange={handleInputChange}>
                        <option value="ADMIN">
                            Administrador
                        </option>
                        <option value="AGENT">
                            Agente
                        </option>
                    </select>
                </div>
                <div className="col-md-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleResetPassword}
                    >
                        Reestablecer contraseña
                    </button>
                </div>
                {display &&
                    <div className="col-md-5">
                        <div className="border border-primary rounded text-center text-light">
                            <button
                                onClick={handleDisplay}
                                className="btn text-primary float-end">
                                <FaRegWindowClose />
                            </button>
                            <div className="clearfix" />
                            {user &&
                                <p className="text-start text-primary">
                                    Contraseña: {passwordDisplay}
                                </p>
                            }
                        </div>
                    </div>
                }
                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-success m-1">
                        Registrar
                    </button>
                </div>
            </form>
        </Modal>
    )
}
