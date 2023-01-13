import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import {
    sendMessageCreator,
} from "../../redux/dialogs-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getdialogsPage } from "../../redux/dialogs-selectors";

const mapStateToProps = (state) => {
    return {
        dialogsPage: getdialogsPage(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => dispatch(sendMessageCreator(newMessageBody)),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);
