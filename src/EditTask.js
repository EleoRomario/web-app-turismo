import Modal from "./Modal";
import { useState } from "react";
import "./editTask.css";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function EditTask({
	open,
	onClose,
	toEditTitle,
	toEditDescription,
	toEditImage,
	id,
}) {
	const [title, setTitle] = useState(toEditTitle);
	const [description, setDescription] = useState(toEditDescription);
	const [image, setImage] = useState(toEditImage);

	const imageHandler = async (e) => {
		const archivo = e.target.files[0];
		const storageRef = ref(storage, `images/${archivo.name}`);
		const uploadImage = uploadBytesResumable(storageRef, archivo);
		console.log("archivo cargado:", archivo.name);
		const enlaceUrl = await getDownloadURL(uploadImage.snapshot.ref);
		setImage(enlaceUrl);
	};

	
	/* function to update firestore */
	const handleUpdate = async (e) => {
		e.preventDefault();
		const taskDocRef = doc(db, "departamentos", id);
		try {
			await updateDoc(taskDocRef, {
				title: title,
				description: description,
				image: image,
			});
			onClose();
		} catch (err) {
			alert(err);
		}
	};

	return (
		<Modal modalLable="Edit Task" onClose={onClose} open={open}>
			<form onSubmit={handleUpdate} className="editTask">
				<input
					type="text"
					name="title"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				></textarea>
				<div className="image_edit">
					<input type="file" onChange={imageHandler} />
					<img src={image} alt="" />
				</div>
				<button type="submit">Edit</button>
			</form>
		</Modal>
	);
}

export default EditTask;
