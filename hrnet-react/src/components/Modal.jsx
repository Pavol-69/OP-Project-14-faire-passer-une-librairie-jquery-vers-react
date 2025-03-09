import "../style/generalCSS.scss";
import "../style/components/Modal.scss";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function Modal({ showModal, setShowModal, title, content }) {
  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => setShowModal(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
