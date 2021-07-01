import React from 'react';
import { PaymentsItem } from './PaymentsItem';

export const PaymentsList = ({ payments = [] }) => {
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {
                payments.map((payment, index) =>
                    <PaymentsItem
                        key={index}
                        {...payment}
                    />
                )
            }
        </div>
    )
}
