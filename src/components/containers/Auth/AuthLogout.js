import { connect } from 'react-redux';
import AuthLogout from '../../ui/Auth/AuthLogout';
import {logout, setAuthenticate} from '../../../store/Auth/actions'

export default connect(
    ({ isAuthenticated }) => ({isAuthenticated }),
    {
        logout,
        setAuthenticate
    }
)(AuthLogout)