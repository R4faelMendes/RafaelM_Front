import { Box, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import CodeIcon from "@mui/icons-material/Code";
//
function FooterAmbos() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #cc1a00 0%, #ff2200 60%, #ff4422 100%)",
        width: "100%",
        height: "52px",
        position: "fixed",
        bottom: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        boxShadow: "0 -4px 16px rgba(200,0,0,0.25), 0 -1px 0 rgba(255,255,255,0.1)",
        zIndex: 1200,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.18)",
        },
      }}
    >
      {/* Esquerda — copyright */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ShieldOutlinedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }} />
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, letterSpacing: "0.01em" }}
        >
          © {new Date().getFullYear()} Sistema Vio
        </Typography>
      </Box>

      {/* Divisor */}
      <Box sx={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.2)" }} />

      {/* Direita — dev */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <CodeIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }} />
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.75)", letterSpacing: "0.01em" }}
        >
          Desenvolvido por{" "}
          <Box component="span" sx={{ fontWeight: 500, color: "rgba(255,255,255,0.95)" }}>
            Rafael Mendes
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default FooterAmbos;