import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//import SearchResults from "./results";
import MyCard from "../my-pets/card";
import axios from "axios";

import { Col, Row, Card, Accordion, Figure } from "react-bootstrap";

export default function SearchBar() {
  const [searchToggle, setSearchToggle] = useState(true);
  const { register, handleSubmit } = useForm();
  //const [searchResult, setsearchResult] = useState(false);
  const [pets, setPets] = useState([]);

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      const petList = await searchRes(data);
      setPets(petList);
    } catch (error) {
      console.log(error);
    }
  };

  const searchRes = async (data) => {
    if (data.height === "") {
      delete data.height;
    }
    if (data.type === "") {
      delete data.type;
    }
    if (data.weight === "") {
      delete data.weight;
    }
    if (data.name === "") {
      delete data.name;
    }
    if (data.status === "") {
      delete data.status;
    }

    try {
      const result = await axios.post(
        "https://eli-server.herokuapp.com/pets",
        data
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {searchToggle ? (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="form-inline my-2 my-lg-0"
          >
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by type (cat/dog)"
              aria-label="Search"
              {...register("type")}
            ></input>
            <button
              onClick={() => setSearchToggle(false)}
              class="btn btn-outline-success my-2 my-sm-0"
            >
              Advanced Search
            </button>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      ) : (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <form
            onSubmit={handleSubmit(onSubmit)}
            class="form-inline my-2 my-lg-0"
          >
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by type (cat/dog)"
              aria-label="Search"
              {...register("type")}
            ></input>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by Adoption Status"
              aria-label="Search"
              {...register("status")}
            ></input>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by Height"
              aria-label="Search"
              {...register("height")}
            ></input>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by Weight"
              aria-label="Search"
              {...register("weight")}
            ></input>
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search by Name"
              aria-label="Search"
              {...register("name")}
            ></input>
            <button
              class="btn btn-outline-success my-2 my-sm-0"
              onClick={() => setSearchToggle(true)}
            >
              Basic Search
            </button>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>
      )}
      {/* {searchResult && <SearchResults />}  */}
      <MyCard pets={pets} />
    </div>
  );
}
