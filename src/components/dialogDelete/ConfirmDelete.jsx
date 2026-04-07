import {Dialog, DialogTitle,DialogActions,DialogContent,Button,Typography} from "@mui/material";

function ConfirmDelete({open, onClose,onConfirm,userName}){
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Confirmar exclusão</DialogTitle>
            <DialogContent>
                <Typography>Deseja mesmo excluir <p>{userName}</p></Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="error" >Excluir</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDelete;