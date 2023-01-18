import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ComponentType } from "react";

export type WithRouterProps = {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

export const withRouter = <Props extends WithRouterProps>(Component: ComponentType<Props>) => {
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...(props as Props)} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
};
