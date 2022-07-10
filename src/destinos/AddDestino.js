import Modal from "../Modal";
import { useState } from "react";
import "../addTask.css";
import { db, storage } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const AddDestino = ({ onClose, open, docId }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("null");
	const [latitud, setLatitud] = useState("");
	const [longitud, setLongitud] = useState("");

	/* function to add new task to firestore */
	console.log(docId);

	const imageHandler = async (e) => {
		const archivo = e.target.files[0];
		const storageRef = ref(storage, `images/${archivo.name}`);
		const uploadImage = uploadBytesResumable(storageRef, archivo);
		console.log("archivo cargado:", archivo.name);
		const enlaceUrl = await getDownloadURL(uploadImage.snapshot.ref);
		setImageUrl(enlaceUrl);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addDoc(collection(db, `departamentos/${docId}/destinos`), {
				title: title,
				description: description,
				image: imageUrl,
				latitud: latitud,
				longitud: longitud,
				created: Timestamp.now(),
			});
			onClose();
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Modal modalLable="Add Destino" onClose={onClose} open={open}>
			<form onSubmit={handleSubmit} className="addTask" name="addTask">
				<input
					type="text"
					name="title"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					placeholder="Titulo"
				/>
				<input
					type="number"
					name="latitud"
					onChange={(e) => setLatitud(e.target.value)}
					value={latitud}
					placeholder="Latitud"
					pattern="[0-9]+([\.,][0-9]+)?"
					step="0.01"
				/>
				<input
					type="number"
					name="logitud"
					onChange={(e) => setLongitud(e.target.value)}
					value={longitud}
					placeholder="Longitud"
					pattern="[0-9]+([\.,][0-9]+)?"
					step="0.01"
				/>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Descripcion"
					value={description}
				></textarea>
				<input type="file" onChange={imageHandler} />
				<button type="submit">Guardar</button>
			</form>
		</Modal>
	);
};
