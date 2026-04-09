import { Box, Typography } from "@mui/material";

function FooterAmbos() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ff2200",
        width: "100%",
        height: "45px",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        boxShadow: "0px -2px 8px rgba(0,0,0,0.2)",
        zIndex: 1200,
      }}
    >
      <Typography variant="body2" sx={{ color: "#fff" }}>
        © {new Date().getFullYear()} Sistema Vio
      </Typography>

      <Typography variant="body2" sx={{ color: "#fff", opacity: 0.8 }}>
        Desenvolvido por Rafael Mendes
      </Typography>
    </Box>
  );
}

export default FooterAmbos;