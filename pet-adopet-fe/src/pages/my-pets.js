import React, { useState, useEffect } from "react";
import MyCard from "../components/my-pets/card";
import axios from "axios";

export default function MyPets() {
  const [hasPets, setHaspets] = useState(false);
  const [pets, setPets] = useState(null);
  const [saveToggle, setSaveToggle] = useState(true);

  const userLogged = JSON.parse(localStorage.getItem("user"));

  async function getAllPets() {
    const pets = await axios.post(
      `https://eli-server.herokuapp.com/pets/user/${userLogged.appUserId}`
    );
    return pets.data;
  }

  useEffect(() => {
    (async () => {
      const myPets = await getAllPets();
      console.log(myPets);
      setPets(myPets);
      if (myPets) {
        setHaspets(true);
      }
    })();
  }, []);

  return (
    <div>
      {hasPets ? (
        <div>
          <button
            onClick={() => setSaveToggle(true)}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            Saved Pets
          </button>{" "}
          <button
            onClick={() => setSaveToggle(false)}
            class="btn btn-outline-success my-2 my-sm-0"
          >
            Owend Pets
          </button>
          <MyCard pets={saveToggle ? pets[0] : pets[1]} />
        </div>
      ) : (
        <div>
          <h1>You currently do not own or foster any pets.</h1>
        </div>
      )}
    </div>
  );
}
