import React, { ComponentType, FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store";

type MapPropsType = {
    isAuth: boolean;
};

type DispatchPropsType = {};

export function withAuthRedirect<WCP extends object>(WrappedComponent: ComponentType<WCP>) {

    const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
        const navigate = useNavigate();
        const { isAuth, ...restProps } = props;

        useEffect(() => {
            !isAuth && navigate("/login");
        }, [isAuth]);

        return <WrappedComponent {...restProps as WCP} />;
    }

    let ConnectedAuthRedirectComponent = connect<
        MapPropsType,
        DispatchPropsType,
        WCP,
        AppStateType
    >(mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType);
