import FooterIndex from "../footerIndex/FooterIndex";
import HeaderIndex from "../headerIndex/HeaderIndex";
import { Box } from "@mui/material";

function DefaultLayoutIndex({children}){
    return(
        <Box sx={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
            {/* Cabeçalho */}
            <HeaderIndex/>

            {/* Conteúdo do site */}
            <Box sx={{
                display:"flex", 
                flex: 1, 
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
            }}>
                {children}
            </Box>

            {/* Rodapé */}
            <FooterIndex/>
        </Box>
    )
}

export default DefaultLayoutIndex;