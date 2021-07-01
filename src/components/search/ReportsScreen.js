import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../hooks/useForm';
import { getPatient } from '../../redux/actions/patients';
import { reportsByPatient, reportsByProcedure, reportsByProfessional } from '../../redux/actions/reports';
import { ReportsPatientList } from './ReportsPatientList';
import { ReportsProcedureList } from './ReportsProcedureList';
import { ReportsProfessionalList } from './ReportsProfessionalList';

export const ReportsScreen = () => {

    const dispatch = useDispatch();

    const [values, handleInputChange] = useForm({
        collection: '',
        range: '',
        document: '',
        id: ''
    });

    const { collection, range, document, id } = values;

    const { data: proceduresDB } = useSelector(state => state.procedures);
    const { data: professionalsDB } = useSelector(state => state.professionals);
    const { data: reportsDB, total: totalDB } = useSelector(state => state.reports);
    const { patient } = useSelector(state => state.patients);

    const [procedures, setProcedures] = useState(proceduresDB);
    const [professionals, setProfessionals] = useState(professionalsDB);
    const [proceduresReports, setProceduresReports] = useState(false);
    const [professionalsReports, setProfessionalsReports] = useState(false);
    const [payments, setPayments] = useState(reportsDB);
    const [total, setTotal] = useState(totalDB);

    useEffect(() => {
        setPayments(reportsDB);
        setProcedures(proceduresDB);
        setProfessionals(professionalsDB);
        setTotal(totalDB);
        dispatch(getPatient(document));
    }, [reportsDB, proceduresDB, professionalsDB, totalDB, dispatch, document]);

    const handleQuery = (event) => {
        event.preventDefault();

        switch (collection) {
            case 'procedures':
                dispatch(reportsByProcedure(range, id));
                setProfessionalsReports(false);
                setProceduresReports(true);
                break;
            case 'professionals':
                dispatch(reportsByProfessional(range, id));
                setProceduresReports(false);
                setProfessionalsReports(true);
                break;
            default:
                dispatch(reportsByPatient(range, patient._id));
                break;
        }
    }

    return (
        <div className="container">
            <h3 className="text-center mt-3">Reportes</h3>
            <hr />
            <form onSubmit={handleQuery}>
                <div className="row">
                    <div className="col-md-3 mb-1">
                        <select
                            id="comboRange"
                            className="form-select"
                            name="range"
                            value={range}
                            onChange={handleInputChange}
                        >
                            <option defaultValue>Lapso...</option>
                            <option value="year">Año</option>
                            <option value="semester">Semestre</option>
                            <option value="month">Mes</option>
                            <option value="week">Semana</option>
                        </select>
                    </div>
                    <div className="col-md-3 mb-1">
                        <select
                            id="comboCollection"
                            className="form-select"
                            name="collection"
                            value={collection}
                            onChange={handleInputChange}
                        >
                            <option defaultValue>Criterio...</option>
                            <option value="patients">Paciente</option>
                            <option value="procedures">Procedimiento</option>
                            <option value="professionals">Profesional</option>
                        </select>
                    </div>

                    {collection === "patients" &&
                        <div className="col-md-3 mb-1">
                            <input
                                id="patientDocument"
                                className="form-control"
                                autoComplete="off"
                                name="document"
                                placeholder="Documento del paciente..."
                                value={document}
                                onChange={handleInputChange}
                            />
                        </div>
                    }

                    {collection === "procedures" &&
                        <div className="col-md-3 mb-1">
                            <select
                                id="comboProcedure"
                                className="form-select"
                                name="id"
                                value={id}
                                onChange={handleInputChange}
                            >
                                <option defaultValue>Seleccione...</option>
                                {procedures &&
                                    procedures.map((procedure, index) =>
                                        <option key={index} value={procedure._id}>{procedure.name}</option>
                                    )}
                            </select>
                        </div>
                    }

                    {collection === "professionals" &&
                        <div className="col-md-3 mb-1">
                            <select
                                id="comboProfessional"
                                className="form-select"
                                name="id"
                                value={id}
                                onChange={handleInputChange}
                            >
                                <option defaultValue>Seleccione...</option>
                                {
                                    professionals.map((professional, index) =>
                                        <option key={index} value={professional._id}>{professional.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    }

                    {id &&
                        <div className="col-md-2 mb-1">
                            <button className="btn btn-primary">Consultar</button>
                        </div>
                    }
                </div>
            </form>
            <div className="row">
                {collection === 'procedures' && proceduresReports &&
                    <ReportsProcedureList payments={payments} total={total} />
                }
                {collection === 'professionals' && professionalsReports &&
                    <ReportsProfessionalList payments={payments} total={total} />
                }
                {collection === 'patients' && document &&
                    <ReportsPatientList payments={payments} total={total} />
                }
            </div>
        </div>
    )
}
