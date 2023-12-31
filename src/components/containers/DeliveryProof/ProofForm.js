import { connect } from 'react-redux';
import ProofForm from '../../ui/DeliveryProof/ProofForm';

export default connect(
    ({ userDetails, dailyDeliveries }) => ({ userDetails, dailyDeliveries }),
    {}
)(ProofForm)
