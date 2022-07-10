import "./task.css";
import { useState } from "react";
import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Departamento } from "./Departamento";

function Task({ id, title, description, image }) {
	const [open, setOpen] = useState({
		edit: false,
		destinos: false,
		view: false,
	});

	const handleClose = () => {
		setOpen({ edit: false, destinos: false, view: false });
	};

	/* function to delete a document from firstore */
	const handleDelete = async () => {
		const taskDocRef = doc(db, "departamentos", id);
		try {
			await deleteDoc(taskDocRef);
		} catch (err) {
			alert(err);
		}
	};

	return (
		<div className="task">
			<img src={image} alt="" className="dep_img" />
			<div className="task__body">
				<h2>{title}</h2>
				<div className="task__buttons">
					<div className="task__deleteNedit">
						<button
							className="task__editButton"
							onClick={() => setOpen({ ...open, edit: true })}
						>
							<i className="uil uil-pen"></i>
							Edit
						</button>
						<button
							className="task__deleteButton"
							onClick={handleDelete}
						>
							<i className="uil uil-trash"></i>
							Delete
						</button>
						<button
							className="task__viewButton"
							onClick={() => setOpen({ ...open, view: true })}
						>
							<i className="uil uil-eye"></i>
							Ver
						</button>
					</div>
					<button
						onClick={() => setOpen({ ...open, destinos: true })}
					>
						Destinos
					</button>
				</div>
			</div>

			{open.destinos && (
				<TaskItem
					onClose={handleClose}
					title={title}
					open={open.destinos}
					id={id}
				/>
			)}
			{open.view && (
				<Departamento
					onClose={handleClose}
					title={title}
					description={description}
					image={image}
					open={open.view}
					id={id}
				/>
			)}

			{open.edit && (
				<EditTask
					onClose={handleClose}
					toEditTitle={title}
					toEditDescription={description}
					toEditImage={image}
					open={open.edit}
					id={id}
				/>
			)}
		</div>
	);
}

export default Task;
