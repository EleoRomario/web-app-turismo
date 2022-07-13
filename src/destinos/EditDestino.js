import Modal from "../Modal";
import { useState } from "react";
import "../editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const EditDestino = ({
	open,
	onClose,
	toEditTitle,
	toEditDescription,
	toEditLatitud,
	toEditLongitud,
	toEditImage,
	toEditCategory,
  idDep,
	id,
}) => {
	const [title, setTitle] = useState(toEditTitle);
	const [description, setDescription] = useState(toEditDescription);
	const [latitud, setLatitud] = useState(toEditLatitud);
	const [longitud, setLongitud] = useState(toEditLongitud);
	const [image, setImage] = useState(toEditImage);
	const [category, setCategory] = useState(toEditCategory);

  const imageHandler = async (e) => {
		const archivo = e.target.files[0];
		const storageRef = ref(storage, `images/${archivo.name}`);
		uploadBytes(storageRef, archivo).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downloadURL) => {
				setImage(downloadURL);
			});
		});
  };

	/* function to update firestore */
	const handleUpdate = async (e) => {
		e.preventDefault();
		const taskDocRef = doc(db, `departamentos/${idDep}/destinos`, id);
		try {
			await updateDoc(taskDocRef, {
				title: title,
				description: description,
        latitud: latitud,
        longitud: longitud,
				image: image,
				category: category,
			});
			onClose();
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Modal modalLable="Edit Destino" onClose={onClose} open={open}>
			<form onSubmit={handleUpdate} className="editTask">
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
				/>
				<input
					type="number"
					name="logitud"
					onChange={(e) => setLongitud(e.target.value)}
					value={longitud}
					placeholder="Longitud"
				/>
				<select
					name="category"
					onChange={(e) => {
						setCategory(e.target.value);
					}}
					value={category}
				>
					<option value="" hidden>
						Seleccione una categoria
					</option>
					<option value="aventura">Aventura</option>
					<option value="cultural">Cultural</option>
					<option value="extremo">Extremo</option>
				</select>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Descripcion"
					value={description}
				></textarea>
				<div className="image_edit">
					<input type="file" onChange={imageHandler} />
					<img src={image} alt="" />
				</div>
				{/* <input type="file" onChange={imageHandler} /> */}
				<button type="submit">Edit</button>
			</form>
		</Modal>
	);
};

