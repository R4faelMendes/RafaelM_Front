import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";

function ConfirmDelete({open, onClose, onConfirm, targetName}) {
  
  return(
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> Confirmar exclusão</DialogTitle>
      <DialogContent>
        <Typography>Deseja mesmo excluir? <p>{targetName}</p></Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={()=> {onConfirm()}}>Excluir</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDelete;