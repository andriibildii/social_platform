import React from "react";

type Props = {
    activateEditMode: () => void;
    initialStatus: string;
};

export type Ref = HTMLDivElement;

export const Status = React.forwardRef<Ref, Props>(function Status(props, ref) {
    return (
        <div {...props} ref={ref}>
            <b>Status: </b>
            <span onDoubleClick={props.activateEditMode}>
                {props.initialStatus || "-->add your status<--"}
            </span>
        </div>
    );
});
