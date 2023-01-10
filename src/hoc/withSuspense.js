import { Suspense } from "react";
import Preloader from "../common/preloader/Preloader";

export const withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<Preloader />}>
            <Component {...props} />;
        </Suspense>

    };
};
