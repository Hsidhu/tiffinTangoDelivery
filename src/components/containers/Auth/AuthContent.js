import { connect } from 'react-redux';
import AuthContent from '../../ui/Auth/AuthContent';
import {createUser, setAuthenticate} from '../../../store/Auth/actions'

export default connect(
    ({ authToken, isAuthenticated }) => ({ authToken, isAuthenticated }),
    {
        newUserHandler: createUser,
        setAuthenticate
    }
)(AuthContent)