import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Preloader = () => {
    return (
        <div>
            <Box sx={{ minHeight: 796, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CircularProgress size={80} thickness={4} />
            </Box>
        </div>
    );
};

export default Preloader;
