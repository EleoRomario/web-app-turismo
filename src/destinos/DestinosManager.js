import "../taskManager.css";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AddDestino } from "./AddDestino";
import { Destino } from "./Destino";

export const DestinosManager = ({ id }) => {
	const [openAddModal, setOpenAddModal] = useState(false);
	const [departamentos, setDepartamentos] = useState([]);

	/* function to get all tasks from firestore in realtime */
	useEffect(() => {
		const taskColRef = query(
			collection(db, `departamentos/${id}/destinos`),
			orderBy("created", "desc")
		);
		onSnapshot(taskColRef, (snapshot) => {
			setDepartamentos(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
	}, [id]);

	return (
		<div className="taskManager">
			<div className="taskManager__container">
				<button onClick={() => setOpenAddModal(true)}>
					Add destino +
				</button>
				<div className="taskManager__tasks">
					{departamentos.map((task) => (
						<Destino
							idDep={id}
							id={task.id}
							key={task.id}
							title={task.data.title}
							description={task.data.description}
							latitud={task.data.latitud}
							longitud={task.data.longitud}
							image={task.data.image}
						/>
					))}
				</div>
			</div>

			{openAddModal && (
				<AddDestino
					onClose={() => setOpenAddModal(false)}
					open={openAddModal}
					docId={id}
				/>
			)}
		</div>
	);
};
