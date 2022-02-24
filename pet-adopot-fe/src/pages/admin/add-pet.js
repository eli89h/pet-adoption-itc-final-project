import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

export default function AddPet() {
  const {
    register,
    //formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const newPet = await createPet(data);
    try {
      await addPetPic(newPet.pet.id, data.picture[0]);
    } catch (error) {
      console.log(error);
    }
    console.log(newPet);
  };

  const createPet = async (data) => {
    if (data.hypoallergenic.length === 1) {
      data.hypoallergenic = true;
    } else {
      data.hypoallergenic = false;
    }

    try {
      const result = await axios.post(
        "https://eli-server.herokuapp.com/admin/pet",
        {
          type: data.type,
          name: data.name,
          status: data.status,
          height: data.height,
          weight: data.weight,
          color: data.color,
          bio: data.bio,
          hypoallergenic: data.hypoallergenic,
          restrictions: data.restrictions,
          breed: data.breed,
        }
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addPetPic = async (petId, pic) => {
    try {
      const picFormData = new FormData();
      picFormData.append("picture", pic);
      const picResult = await axios.put(
        `https://eli-server.herokuapp.com/admin/petPicUpload/${petId}`,
        picFormData
      );
      console.log(picResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit(onSubmit)}>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add type (cat/dog)"
          {...register("type")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add Adoption Status"
          {...register("status")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="number"
          placeholder="Add Height"
          {...register("height")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="number"
          placeholder="Add Weight"
          {...register("weight")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add Name"
          {...register("name")}
        ></input>

        <input name="picture" type="file" {...register("picture")} />

        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add Color"
          {...register("color")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add Bio"
          {...register("bio")}
        ></input>
        <div class="form-check form-switch">
          <input
            //class="form-check-input"
            value={false}
            type="checkbox"
            //id="flexSwitchCheckDefault"
            {...register("hypoallergenic")}
          ></input>
          <label class="form-check-label">Is Hypoallergenic?</label>
        </div>
        <input
          class="form-control mr-sm-2"
          type="checkbox"
          placeholder="Is Hypoallergenic?"
          {...register("hypoallergenic")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Any Dietary Restrictions?"
          {...register("restrictions")}
        ></input>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Add Breed"
          {...register("breed")}
        ></input>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
          Add Pet
        </button>
      </form>
    </div>
  );
}
