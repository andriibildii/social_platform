import { FC } from "react";
import Contact from "./Contact/Contact";
import { ProfileType } from "../../../../types/types";

type PropsTypes = {
    profile: ProfileType;
    isOwner: boolean;
    changeEditMode: () => void;
};
const ProfileData: FC<PropsTypes> = ({ profile, isOwner, changeEditMode }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <button onClick={changeEditMode}>edit</button>
                </div>
            )}
            <div>
                <b>Full name: </b>
                {profile?.fullName}
            </div>
            <div>
                <b>Looking for a job:</b>{" "}
                {profile?.lookingForAJob ? "yes" : "no"}
            </div>
            {profile?.lookingForAJob && (
                <div>
                    <b>My professional skills:</b>{" "}
                    {profile.lookingForAJobDescription}
                </div>
            )}
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b>{" "}
                {(Object.keys(profile.contacts) as Array<keyof typeof profile.contacts>).map((key) => {
                    return (
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileData;
