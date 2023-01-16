import { ChangeEvent, FC, useEffect, useState } from "react";

type PropsTypes = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatus: FC<PropsTypes> = (props) => {
    const initialStatus = props.status;
    const [status, setStatus] = useState(initialStatus);
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value);
    };

    return (
        <div>
            {!editMode ? (
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>
                        {initialStatus || "-->add your status<--"}
                    </span>
                </div>
            ) : (
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={handleStatusChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;
