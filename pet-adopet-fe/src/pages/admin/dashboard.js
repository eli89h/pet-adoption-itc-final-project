import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";

import AddPet from "./add-pet";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userList, setUserList] = useState();
  const [userSavedPets, setSavedUserPets] = useState();
  const [userOwendPets, setOwendUserPets] = useState();
  const [petList, setPetList] = useState();
  const [petEdit, setPetEdit] = useState();

  const userLogged = JSON.parse(localStorage.getItem("user"));

  const handleUsers = async () => {
    const getAllUsers = await returnAllUsers();
    setUserList(getAllUsers);
    setPetList(null);
    setOwendUserPets(null);
    setSavedUserPets(null);
  };
  const handlePets = async () => {
    const getAllPets = await returnAllPets();
    setPetList(getAllPets);
    setUserList(null);
    setOwendUserPets(null);
    setSavedUserPets(null);
  };
  const handleUserPets = async (id) => {
    const getAllUserPets = await returnUserPets(id);
    console.log(getAllUserPets);
    setOwendUserPets(getAllUserPets[0]);
    setSavedUserPets(getAllUserPets[1]);
  };
  const handleEditPets = async () => {
    const getAllPets = await returnAllPets();
    setPetList(getAllPets);
  };

  const returnAllUsers = async () => {
    try {
      const users = await axios.post(
        `https://eli-server.herokuapp.com/users/allusers`,
        null,
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      return users.data;
    } catch (error) {
      console.log(error);
    }
  };

  const returnAllPets = async () => {
    try {
      const users = await axios.get(
        `https://eli-server.herokuapp.com/pets/list`,
        null,
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      return users.data;
    } catch (error) {
      console.log(error);
    }
  };

  const returnUserPets = async (UserId) => {
    try {
      console.log(UserId);
      const userPets = await axios.post(
        `https://eli-server.herokuapp.com/pets/user/${UserId}`,
        null,
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      return userPets.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Pet
      </Button>
      <button
        onClick={() => handleUsers()}
        type="button"
        class="btn btn-primary"
      >
        Get All Users
      </button>
      <button
        onClick={() => handlePets()}
        type="button"
        class="btn btn-primary"
      >
        Get All Pets
      </button>
      {userList &&
        userList.map((user, index) => (
          <div className="user-list" key={index}>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.phone}</p>
            <p>{user.email}</p>
            <button
              onClick={() => handleUserPets(user.id)}
              type="button"
              class="btn btn-primary"
            >
              Show User Pets
            </button>
          </div>
        ))}
      {petList &&
        petList.map((pet, index) => (
          <div className="user-list" key={index}>
            <p>{pet.name}</p>
            <p>{pet.type}</p>
            <p>{pet.status}</p>
            <p>{pet.breed}</p>
            <button type="button" class="btn btn-primary">
              Edit Pet
            </button>
          </div>
        ))}
      {userOwendPets &&
        userOwendPets.map((pet, index) => (
          <div className="user-list" key={index}>
            <p>{pet.name}</p>
            <p>{pet.type}</p>
            <p>{pet.status}</p>
            <p>{pet.breed}</p>
            <p>{pet.bio}</p>
            <p>{pet.color}</p>
            <p>{pet.restrictions}</p>
            <p>{pet.hypoallergenic}</p>
            <p>{pet.height}</p>
            <p>{pet.weight}</p>
          </div>
        ))}
      {userSavedPets &&
        userSavedPets.map((pet, index) => (
          <div className="user-list" key={index}>
            <p>{pet.name}</p>
            <p>{pet.type}</p>
            <p>{pet.status}</p>
            <p>{pet.breed}</p>
            <p>{pet.bio}</p>
            <p>{pet.color}</p>
            <p>{pet.restrictions}</p>
            <p>{pet.hypoallergenic}</p>
            <p>{pet.height}</p>
            <p>{pet.weight}</p>
          </div>
        ))}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPet />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
