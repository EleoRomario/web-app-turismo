import Modal from "./Modal";
import "./taskItem.css";
import "./taskManager.css";

export const Departamento = ({ onClose, open, title, description, image }) => {
	return (
		<Modal modalLable="Departamento" onClose={onClose} open={open}>
			<div className="taskItem">
				<h2>{title}</h2>
				<p>{description}</p>
				<img src={image} alt="" />
			</div>
		</Modal>
	);
};

