import { Box, Typography } from "@mui/material";

function FooterAmbos() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ff2200",
        width: "100%",
        height: "30px",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        bottom: 0,
      }}
    >
      <Typography> &copy; - desenvolvido por Rafael Mendes</Typography>
    </Box>
  );
}

export default FooterAmbos;
