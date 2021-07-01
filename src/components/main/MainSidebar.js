import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaCartPlus,
    FaRegUser,
    FaUserMd,
    FaNotesMedical,
    FaClipboardList,
    FaTh,
    FaUsers,
    FaUserAlt,
    FaSignOutAlt
} from 'react-icons/fa';

import logo from '../../assets/VitalPlus400x160.png';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

export const MainSidebar = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <nav className="navbar navbar-expand-lg bg-clear-blue">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-target="#mainNavbar"
                    data-bs-toggle="collapse"
                    aria-expanded="false">
                    <span className="navbar-toggler-icon text-light"><FaTh /></span>
                </button>
                <img src={logo} alt="logo" className="logo navbar-brand img-thumbnail" />
                <div id="mainNavbar" className="collapse navbar-collapse mt-2">
                    <div className="row">
                        <div className="col-md-10">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink
                                        exact to="/"
                                        activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                        className="nav-link fs-5 px-2 text-light">
                                        <FaCartPlus /> Pagos
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/patients"
                                        activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                        className="nav-link fs-5 px-2 text-light">
                                        <FaRegUser /> Pacientes
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/professionals"
                                        activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                        className="nav-link fs-5 px-2 text-light">
                                        <FaUserMd /> Profesionales
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/procedures"
                                        activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                        className="nav-link fs-5 px-2 text-light">
                                        <FaNotesMedical /> Tratamientos
                                    </NavLink>
                                </li>
                                {user.role === "ADMIN" &&
                                    <li className="nav-item">
                                        <NavLink
                                            to="/reports"
                                            activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                            className="nav-link fs-5 px-2 text-light">
                                            <FaClipboardList /> Reportes
                                        </NavLink>
                                    </li>
                                }
                                {user.role === "ADMIN" &&
                                    <li className="nav-item">
                                        <NavLink
                                            to="/users"
                                            activeClassName="active animate__animated animate__pulse animate__faster 200ms"
                                            className="nav-link fs-5 px-2 text-light">
                                            <FaUsers /> Usuarios
                                        </NavLink>
                                    </li>
                                }
                            </ul>
                        </div>
                        <div className="col-md-2 text-end">
                            <button
                                onClick={handleLogout}
                                className="btn btn-outline-warning">
                                <strong className="fs-6"><FaSignOutAlt /> Salir</strong>
                            </button>
                            <br />
                            <span className="fs-6 text-light">
                                <FaUserAlt /> {user.name}
                                <br />
                                {user.role === "ADMIN"
                                    ? " ADMIN"
                                    : " Agente"
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
