import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box } from "@mui/material";


function DefaultLayout({children}) {

    return(
        <Box sx={{display:"flex", flexDirection:"column", minHeight:"100vh"}}>
            <Header/>

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
            <Footer/>
        </Box>
    )
}
export default DefaultLayout;
