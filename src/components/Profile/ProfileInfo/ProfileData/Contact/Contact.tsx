import { FC } from "react";
import style from "../../ProfileInfo.module.css";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

type PropsTypes = {
    contactTitle: string;
    contactValue: string;
};

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    justifyContent: "center",
    minHeight: "20px",
}));

const Contact: FC<PropsTypes> = ({ contactTitle, contactValue }) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                <Grid xs={6}>
                    <Item>
                        <b>{contactTitle}</b>
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item>{contactValue}</Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Contact;
