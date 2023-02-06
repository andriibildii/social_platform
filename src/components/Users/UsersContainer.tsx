import { FC } from "react";
import {useSelector } from "react-redux";
import { UsersItems } from "./UsersItems/UsersItems";
import Preloader from "../../common/Preloader/Preloader";

import { getIsFetching} from "../../store/users-selectors";

const UsersContainer: FC = () => {
    const isFetching = useSelector(getIsFetching);
    return (
        <>
            {isFetching && <Preloader />}
            <UsersItems />
        </>
    );
};

export default UsersContainer;
