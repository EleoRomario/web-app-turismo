import Modal from "./Modal"
import './taskItem.css'
import "./taskManager.css";
import { DestinosManager } from "./destinos/DestinosManager";

function TaskItem({onClose, open, id}) {
  return (
		<Modal modalLable="Destinos" onClose={onClose} open={open}>
			<DestinosManager id={id} />
		</Modal>
  );
}

export default TaskItem
