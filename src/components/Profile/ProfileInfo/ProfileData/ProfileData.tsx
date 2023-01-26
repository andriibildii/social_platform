import { FC } from "react";
import Contact from "./Contact/Contact";
import { ProfileType } from "../../../../types/types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type PropsTypes = {
    profile: ProfileType;
    isOwner: boolean;
    changeEditMode: () => void;
};

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    justifyContent: "center",
    minHeight: "20px",
}));

const ProfileData: FC<PropsTypes> = ({ profile, isOwner, changeEditMode }) => {
    return (
        <div>
            {isOwner && (
                <div>
                    <Button
                        onClick={changeEditMode}
                        color="primary"
                        variant="outlined"
                    >
                        edit
                    </Button>
                </div>
            )}
            <div>
                <Box sx={{ width: "100%" }}>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                        <Grid xs={6}>
                            <Item>
                                <b>Full name: </b>
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>{profile?.fullName}</Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                <b>Looking for a job:</b>
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                {" "}
                                {profile?.lookingForAJob ? "yes" : "no"}
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                <b>My professional skills:</b>
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>{profile.lookingForAJobDescription}</Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>
                                <b>About me:</b>
                            </Item>
                        </Grid>
                        <Grid xs={6}>
                            <Item>{profile.aboutMe}</Item>
                        </Grid>
                        <Grid xs={12}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <b>Contacts:</b>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {(
                                        Object.keys(profile.contacts) as Array<
                                            keyof typeof profile.contacts
                                        >
                                    ).map((key) => {
                                        return (
                                            <Contact
                                                key={key}
                                                contactTitle={key}
                                                contactValue={
                                                    profile.contacts[key]
                                                }
                                            />
                                        );
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

export default ProfileData;
