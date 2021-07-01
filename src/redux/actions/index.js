const patientsActions = require('../redux/actions/patients');
const paymentsActions = require('../redux/actions/payments');
const proceduresActions = require('../redux/actions/procedures');
const professionalsActions = require('../redux/actions/professionals');
const modalActions = require('../redux/actions/modal');
const reportActions = require('../redux/actions/reports');
const usersActions = require('../redux/actions/users');

module.exports = {
    ...patientsActions,
    ...paymentsActions,
    ...proceduresActions,
    ...professionalsActions,
    ...modalActions,
    ...reportActions,
    ...usersActions
}