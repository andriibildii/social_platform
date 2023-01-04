import { useEffect, useState } from "react";

const ProfileStatus = (props) => {
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

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div>
            {!editMode ? (
                <div>
                    <span onDoubleClick={activateEditMode}>
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
