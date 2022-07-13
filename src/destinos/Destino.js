import "../task.css";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { EditDestino } from "./EditDestino";

export const Destino = ({ idDep, id, title, description, latitud, longitud, category, image }) => {
	const [open, setOpen] = useState({ edit: false, view: false });

	const handleClose = () => {
		setOpen({ edit: false, view: false });
	};

  console.log("idDep", idDep);
	/* function to delete a document from firstore */
	const handleDelete = async () => {
		const taskDocRef = doc(db, `departamentos/${idDep}/destinos`, id);
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
							Edit
						</button>
						<button
							className="task__deleteButton"
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
			{open.edit && (
				<EditDestino
					onClose={handleClose}
					toEditTitle={title}
					toEditDescription={description}
					toEditLatitud={latitud}
					toEditLongitud={longitud}
					toEditImage={image}
					toEditCategory={category}
					open={open.edit}
					idDep={idDep}
					id={id}
				/>
			)}
		</div>
	);
}
