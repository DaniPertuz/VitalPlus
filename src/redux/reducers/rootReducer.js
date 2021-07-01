import { combineReducers } from 'redux';
import { AuthReducer } from './AuthReducer';
import { ModalReducer } from './ModalReducer';
import { PatientsReducer } from './PatientsReducer';
import { PaymentsReducer } from './PaymentsReducer';
import { ProcedureReducer } from './ProceduresReducer';
import { ProfessionalsReducer } from './ProfessionalsReducer';
import { ReportsReducer } from './ReportsReducer';
import { UsersReducer } from './UsersReducer';

export const rootReducer = combineReducers({
    auth: AuthReducer,
    modal: ModalReducer,
    professionals: ProfessionalsReducer,
    procedures: ProcedureReducer,
    patients: PatientsReducer,
    payments: PaymentsReducer,
    reports: ReportsReducer,
    users: UsersReducer
});