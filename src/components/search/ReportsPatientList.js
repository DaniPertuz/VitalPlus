import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
moment.locale('es');

export const ReportsPatientList = ({ payments = [], total }) => {

    const handleDate = (date) => {
        return moment(date).format('MMMM D, YYYY');
    }

    return (
        <div className="col-md-12 table-responsive-md mt-5">
            <ReactHTMLTableToExcel
                id="excelButton"
                className="btn btn-success"
                table="tablePatients"
                filename="ReportePorPaciente"
                sheet="Hoja1"
                buttonText="Exportar a Excel"
            />
            <table id="tablePatients" className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Valor</th>
                        <th>Método de pago</th>
                        <th>Tipo de pago</th>
                        <th>Tratamiento</th>
                        <th>Profesional</th>
                        <th>Saldo</th>
                        <th>Total</th>
                        <th>Registros: {total}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments.map(({ value, method, type, date, professional, procedure, balance }, index) =>
                            <tr key={index}>
                                <td className="text-capitalize">{handleDate(date)}</td>
                                <td>{value}</td>
                                <td>{method}</td>
                                <td>{type}</td>
                                <td>{procedure.name}</td>
                                <td>{professional.name}</td>
                                <td>{balance}</td>
                                <td>{procedure.value}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
