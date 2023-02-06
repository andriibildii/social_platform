import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { TextField, Tooltip } from "@mui/material";

type PropsTypes = {
    status: string;
    updateStatus: (status: string) => void;
};

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
                <>
                    <b>Status: </b>
                    <Tooltip title="Click twice to change the status" arrow>
                        <span onDoubleClick={activateEditMode}>
                            {initialStatus || "-->add your status<--"}
                        </span>
                    </Tooltip>
                </>
            ) : (
                <div>
                    <TextField
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={handleStatusChange}
                        multiline
                        rows={2}
                        fullWidth
                    />
                </div>
            )}
        </div>
    );
};

export default ProfileStatus;