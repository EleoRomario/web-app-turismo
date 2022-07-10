import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './firebase'
import AddTask from './AddTask'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [departamentos, setDepartamentos] = useState([]);

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(
		collection(db, "departamentos"),
		orderBy("created", "desc")
	);
    onSnapshot(taskColRef, (snapshot) => {
      setDepartamentos(
			snapshot.docs.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}))
		);
    })
  },[])

  return (
    <div className='taskManager'>
      <header>App Turismo</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add departamento +
        </button>
        <div className='taskManager__tasks'>

          {departamentos.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              title={task.data.title} 
              description={task.data.description}
              image={task.data.image}
            />
          ))}

        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
