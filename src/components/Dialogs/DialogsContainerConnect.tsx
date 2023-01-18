import Dialogs, { MapDispatchToPropsType, MapStateToPropsType } from "./Dialogs";
import { connect } from "react-redux";
import { actions } from "../../redux/dialogs-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getDialogsPage } from "../../redux/dialogs-selectors";
import { AppStateType } from "../../redux/store";
import { ComponentType } from "react";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: getDialogsPage(state),
    };
};

export default compose<ComponentType>(
    connect<
      MapStateToPropsType,
      MapDispatchToPropsType,
      undefined,
      AppStateType
      >(mapStateToProps, {
      sendMessage: actions.sendMessageCreator,
    }),
    withAuthRedirect
)(Dialogs);
