import React from 'react';

import { UsersItem } from './UsersItem';

export const UsersList = ({ users = [] }) => {
    return (
        <div className="card-columns animate__animated animate__fadeIn">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-12">
                    {
                        users.map((user, index) =>
                            <UsersItem
                                key={index}
                                {...user}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
