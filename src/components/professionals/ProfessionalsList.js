import React from 'react'
import { ProfessionalsItem } from './ProfessionalsItem'

export const ProfessionalsList = ({ professionals = [] }) => {
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-6">
                    {
                        professionals.map((professional) =>
                            <ProfessionalsItem
                                key={professional._id}
                                {...professional}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}
