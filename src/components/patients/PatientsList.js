import React from 'react';
import { PatientsItem } from './PatientsItem';

export const PatientsList = ({ patients = [] }) => {
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-6">
                    {
                        patients.map((patient) =>
                            <PatientsItem
                                key={patient._id}
                                {...patient}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}
