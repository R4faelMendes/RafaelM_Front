import HeaderAmbos from "../headerAmbos/HeaderAmbos";
import FooterAmbos from "../footerAmbos/FooterAmbos";
import { Box } from "@mui/material";


function DefaultLayout({children}) {

    return(
        <Box sx={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
            <HeaderAmbos/>

            {/* Conteúdo do  site */}
            <Box sx={{
                display:"flex",
                flex:"1",
                justifyContent:"center",
                alignItems:"center",
                padding:"20px"
            }}>
            {children}
            </Box>
            {/* Rodapé */}
            <FooterAmbos/>
        </Box>
    )
}
export default DefaultLayout;
