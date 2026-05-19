import { AppBar, Toolbar, Box, Typography, ButtonBase } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function HeaderAmbos() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #cc1a00 0%, #ff2200 60%, #ff4422 100%)",
        boxShadow: "0 4px 16px rgba(200,0,0,0.3), 0 1px 0 rgba(255,255,255,0.1)",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "1px",
          background: "rgba(255,255,255,0.12)",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3, height: 64 }}>

        {/* Logo + nome */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "8px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 18, color: "white" }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 500,
                color: "white",
                letterSpacing: "0.02em",
                lineHeight: 1.2,
              }}
            >
              Sistema Vio
            </Typography>
            <Typography
              sx={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              Gestão escolar
            </Typography>
          </Box>
        </Box>

        {/* Botão de perfil */}
        <ButtonBase
          onClick={() => console.log("Perfil foi clicado")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "24px",
            padding: "5px 14px 5px 8px",
            transition: "background 0.2s",
            "&:hover": {
              background: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 16, color: "white" }} />
          </Box>

          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
            Meu perfil
          </Typography>

          <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }} />
        </ButtonBase>

      </Toolbar>
    </AppBar>
  );
}

export default HeaderAmbos;