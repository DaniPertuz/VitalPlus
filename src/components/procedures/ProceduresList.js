import React from 'react';
import { ProcedureItem } from './ProcedureItem';

export const ProceduresList = ({ procedures = [] }) => {
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-6">
                    {
                        procedures.map((procedure) =>
                            <ProcedureItem
                                key={procedure._id}
                                {...procedure}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}
