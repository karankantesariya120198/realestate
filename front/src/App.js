import React, { useState, useEffect } from "react";
import DirectoryTable from "./components/DirectoryTable";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./hooks/useModal";
import axios from "axios";
import ViewUserForm from "./components/ViewUserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [api, setApi] = useState();
  const [editing, setEditing] = useState(false);
  const [viewing, setViewing] = useState(false);
  const initialFormState = {
    id: null,
    name: "",
    real_state_type: "",
    street: "",
    external_number: "",
    internal_number: "",
    neighborhood: "",
    city: "",
    country: "",
    rooms: "",
    bathrooms: "",
    comments: "",
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    axios("http://127.0.0.1:8000/api/v1/properties")
      .then((response) =>
        response.data.data.data.map((user) => ({
          id: user.id,
          name: user.name,
          real_state_type: user.real_state_type,
          street: user.street,
          external_number: user.external_number,
          internal_number: user.internal_number,
          neighborhood: user.neighborhood,
          city: user.city,
          country: user.country,
          rooms: user.rooms,
          bathrooms: user.bathrooms,
          comments: user.comments
        }))
      )
      .then((data) => {
        setUsers(data);
      });
  }, [api]);

  const addUser = (user) => {
    console.log("New user added successfully");
    setViewing(false);
    setEditing(false);
    toggle();
    setApi(true);
  };

  const editUser = (user) => {
    console.log("Edit user successfully");
    setViewing(false);
    setEditing(true);
    toggle();
    setCurrentUser(user);
  };

  const viewUser = (user) => {
    setEditing(false);
    setViewing(true);
    toggle();
    setCurrentUser(user);
  }

  const updateUser = (id, updatedUser) => {
    console.log("Update user succefully");
    setEditing(false);
    toggle();
    setApi(true);
  };

  const deleteUser = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/v1/properties/${id}`)  
      .then(res => {  
        console.log(res);  
      }) 
    setApi(true);
  };

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container">
        <button className="button-add" onClick={addUser}>
          Add Properties
        </button>
      </div>
      {editing ? (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <EditUserForm
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          }
        />
      ) : viewing ?
      (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <ViewUserForm 
              currentUser={currentUser}
            />
          }
        />
      )
      : (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <AddUserForm 
              addUser={addUser} 
            />
          }
        />
      )}
      <DirectoryTable
        users={currentUsers}
        viewUser={viewUser}
        editUser={editUser}
        deleteUser={deleteUser}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </>
  );
};

export default App;
