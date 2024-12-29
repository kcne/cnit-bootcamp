
import {useState, useEffect} from 'react';
import Modal from './Modal'

function DisplayUsers() {

const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(undefined);
const [isModalOpen, setIsModalOpen] = useState(false); // boolean

// Delete => setAction('delete)
// Update => setAction('update')
const [action, setAction] = useState(undefined);


function openModal(user){
  setSelectedUser(user);
  setIsModalOpen(true);
  console.log(user);
  console.log(isModalOpen);
}

function closeModal(){
  setSelectedUser(undefined);
  setIsModalOpen(false);
}


useEffect(() => {

 getUsers();
}, [])

async function getUsers() {
  //API URL
  const url = "http://localhost:3000/api/users";
  try {
    const response = await fetch(url);
    if (!response.ok) {
        console.log("Error fetching data.");
    }
    const userData = await response.json();
    // users.setState(userData)
    setUsers(userData);
    console.log(userData);
  } catch (error) {
    console.error(error.message);
  }
}


// userData => {email, password}
async function updateUser(id, userData) {
  //API URL
    const url = `http://localhost:3000/api/users/${id}`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userData.email, password: userData.password })
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        console.log("Error updating user.");
    }
    const userData = await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteUser(id) {
  //API URL
    const url = `http://localhost:3000/api/users/${id}`;
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        console.log("Error deleting user.");
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function handleSubmit(event){
 event.preventDefault();
  const formData = new FormData(event.target); 
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  if(action == 'Update'){
  await updateUser(formData.get('id'), userData)
  }
  if(action == 'Delete')
  {
    await deleteUser(formData.get('id'))
  }

  closeModal();
  setAction(undefined);
  getUsers();
}

  return (
    <div>
      <table>
        <thead>
            <th className="px-4">User Id</th>
            <th className="px-4">Email</th>
            <th className="px-4">Password</th>
            <th className="px-4">Actions</th>
        </thead>
        <tbody>
        {
            users.map(user =>
        (<tr key={user.id}>
            <td className="px-4">{user.id}</td>
            <td className="px-4">{user.email}</td>
            <td className="px-4">{user.password}</td>
            <td className="px-4 flex gap-3">
              <button className="bg-blue-300" onClick={() => {openModal(user); setAction('Update')}}>Update</button>
              <button className="bg-red-300" onClick={()=> {openModal(user); setAction('Delete')}}>Delete</button>
          </td>
        </tr>
        )
        )}
        </tbody>
     </table>

    <Modal isOpen = {isModalOpen} onClose={closeModal} >
      {
      selectedUser &&
      <div>
     <form onSubmit={handleSubmit}>
        <label htmlFor="id">UserId:</label>
        <br/>
        <input value={selectedUser.id} id="id" name="id" readOnly />
        <br/>
        <label htmlFor="email">Email:</label>
        <br/>
        <input
          type="text"
          id="email"
          name="email"
          className="ring-1 ring-black"
          defaultValue={selectedUser.email}
          readOnly={ action && action=='Update' ? false : true}
        />
         <br/>
        <label htmlFor="password">Password:</label>
         <br/>
        <input
          type="text"
          id="password"
          name="password"
          className="ring-1 ring-black"
          defaultValue={selectedUser.password}
          readOnly={ action && action=='Update' ? false : true}
        />
        <div>
        Are you sure you want to delete selected user?
        </div>

        {action && action=='Update' &&
          <div className="flex gap-3 py-3">
          <button className=" bg-green-300"
              type="submit"
               onClick={() => updateUser(userData)}>
            Save
          </button>
          <button className="bg-red-300" type="button" onClick={closeModal}> 
            Close
          </button>
        </div>
        }

        {action && action=='Delete' &&
          <div className="flex gap-3 py-3">
          <button className=" bg-red-300"
              type="submit">
            Delete
          </button>
          <button className="bg-orange-300" type="button" onClick={closeModal}> 
            No
          </button>
        </div>
        }
      </form>
      </div>
    }
    </Modal>
    </div>
  )
}
export default DisplayUsers
