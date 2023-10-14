import { connect } from 'react-redux';
import AuthContent from '../../ui/Auth/AuthContent';
import {login, createUser} from '../../../store/Auth/actions'

export default connect(
    ({ }) => ({ }),
    {
        loginHandler: login,
        newUserHandler: createUser,
        setAuthenticate
    }
)(AuthContent)