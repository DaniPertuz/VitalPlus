import React from 'react';

import { store } from '../src/redux/store/store';
import { AppRouter } from './routes/AppRouter';

import { Provider } from 'react-redux';

export const VitalPlusApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
