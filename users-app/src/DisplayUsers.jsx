
import {useState, useEffect} from 'react';


function DisplayUsers() {

const [users, setUsers] = useState([]);

useEffect(() => {

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

 getUsers();
}, [])


  return (
    <>
      <table>
        <thead>
            <th className="px-4">User Id</th>
            <th className="px-4">Email</th>
            <th className="px-4">Password</th>
        </thead>
        <tbody>
        {
            users.map(user =>
        (<tr key={user.id}>
            <td className="px-4">{user.id}</td>
            <td className="px-4">{user.email}</td>
            <td className="px-4">{user.password}</td>
        </tr>
        )
        )}
        </tbody>
     </table>
    </>
  )
}

export default DisplayUsers
