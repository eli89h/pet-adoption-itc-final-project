import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ManageUserPet(props) {
  const pet = props.pet;
  console.log(pet);
  const userLogged = JSON.parse(localStorage.getItem("user"));
  console.log(userLogged.appUserId);

  const [adoptFosterPet, setAdoptFosterPet] = useState(null);
  const [returnPet, setReturnPet] = useState(null);
  const [savePet, setSavePet] = useState(null);
  const [unSavePet, setUnSavePet] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(
    (response) => {
      console.log(response);

    },
    [response]
  ); 

  const adoptFosterAPI = async (status) => {
    try {
      const adopt = await axios.post(
        `https://eli-server.herokuapp.com/pets/${pet.id}/adopt`,
        {
          status: status,
        },
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      //setUpdatedDetail(updateUser.data.text);
      setResponse(adopt.data.text);
      return adopt.data;
    } catch (error) {
      console.log(error);
    }
  };
  const returnAPI = async () => {
    try {
      const adopt = await axios.post(
        `https://eli-server.herokuapp.com/pets/${pet.id}/return`,
        null,
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      //setUpdatedDetail(updateUser.data.text);
      setResponse(adopt.data.text);
      return adopt.data;
    } catch (error) {
      console.log(error);
    }
  };
  const saveAPI = async () => {
    try {
      const adopt = await axios.post(
        `https://eli-server.herokuapp.com/pets/${pet.id}/save`,
        null,
        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      //setUpdatedDetail(updateUser.data.text);
      setResponse(adopt.data.text);
      return adopt.data;
    } catch (error) {
      console.log(error);
    }
  };
  const unSaveAPI = async () => {
    
    try {
      const adopt = await axios.delete(
        `https://eli-server.herokuapp.com/pets/${pet.id}/save`,

        {
          headers: {
            authorization: userLogged.token,
          },
        }
      );
      //setUpdatedDetail(updateUser.data.text);
      setResponse(adopt.data.text);
      
    } catch (error) {
      console.log(error);
    }
  };

  let component;

  switch (pet.status) {
    case "Adopted":
      component = (
        <div>
          {pet.user_id === userLogged.appUserId ? (
            <button onClick={() => returnAPI()} class="primary">
              Return Pet
            </button>
          ) : null}
          {pet.saved_u_id ? (
            <button class="primary" onClick={() => unSaveAPI()}>
              Unsave
            </button>
          ) : (
            <button class="primary" onClick={() => saveAPI()}>
              Save for later
            </button>
          )}
        </div>
      );
      break;
    case "Fosterd":
      component = (
        <div>
          {pet.user_id === userLogged.appUserId ? (
            <button onClick={() => returnAPI()} class="primary">
              Return Pet
            </button>
          ) : null}
          {pet.user_id === userLogged.appUserId ? (
            <button onClick={() => adoptFosterAPI("Adopted")} class="primary">
              Adopt
            </button>
          ) : null}

          {pet.saved_u_id ? (
            <button class="primary" onClick={() => unSaveAPI()}>
              Unsave
            </button>
          ) : (
            <button onClick={() => saveAPI()} class="primary">
              Save for later
            </button>
          )}
        </div>
      );
      break;
    default:
      component = (
        <div>
          <button onClick={() => adoptFosterAPI("Fosterd")} class="primary">
            {" "}
            Foster
          </button>
          <button onClick={() => adoptFosterAPI("Adopted")} class="primary">
            Adopt
          </button>
          {pet.saved_u_id ? (
            <button class="primary" onClick={() => unSaveAPI()}>
              Unsave
            </button>
          ) : (
            <button onClick={() => saveAPI()} class="primary">
              Save for later
            </button>
          )}
        </div>
      );
  }
  return component;
}
