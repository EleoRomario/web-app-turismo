import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import { db, storage} from './firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState(null)

  /* function to add new task to firestore */

  const imageHandler = (e) => {
		if(imageUrl == null) return
		const archivo = e.target.files[0];
		const storageRef = ref(storage, `images/${archivo.name}`);
		uploadBytes(storageRef, archivo).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downloadURL) => {
				setImageUrl(downloadURL);
			});
		});
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "departamentos"), {
			title: title,
			description: description,
			image: imageUrl,
			created: Timestamp.now(),
		});
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
		<Modal modalLable="Add Departamento" onClose={onClose} open={open}>
			<form
				onSubmit={handleSubmit}
				className="addTask editTask"
				name="addTask"
			>
				<input
					type="text"
					name="title"
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					placeholder="Titulo"
				/>
				<textarea
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Descripcion"
					value={description}
				></textarea>
				<div className="image_edit">
					<input type="file" onChange={imageHandler} />
					<img src={imageUrl} alt="" />
				</div>
				<button type="submit">Guardar</button>
			</form>
		</Modal>
  );
}

export default AddTask
