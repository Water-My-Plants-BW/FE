import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialPlant = {
  id: Date.now(),
  nickname: { nickname: "" },
  species: "",
  H20Frequency: ""
};

const PlantList = ({ plants, updatePlants }) => {
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);
  const [newPlant, setNewPlant] = useState(initialPlant);

  const editPlant = plant => {
    setEditing(true);
    setPlantToEdit(plant);
  };


  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://backendhere/api/plants/${plantToEdit.id}`, plantToEdit)
    .then(response => {
      console.log(response)
      axiosWithAuth().get('http://backendhere/api/plants')
      .then(response => {
        updatePlants(response.data)
      })
      .catch(error => console.log(error))
    })
  };

  const deletePlant = plant => {
    axiosWithAuth().delete(`http://backendhere/api/colors/${plant.id}`)
    .then(response => {
      updatePlants(plants.filter(plantId => plantId.id !== plant.id ))
    })
    .catch(error => console.log(error))
  };

  const submitNewPlant = event => {
    event.preventDefault();
    axiosWithAuth().post('http://backendhere/api/plants', newPlant)
    .then(response => {
      updatePlants(response.data)
      setNewPlant(initialPlant);
    })
    .catch(error => console.log(error))
  }

  return (
    <div>
      <p>Your Plants</p>
      <ul>
        {plants.map(plant => (
          <li key={plant.id} onClick={() => editPlant(plant)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deletePlant(plant)
                  }
                }>
                  x
              </span>{" "}
              {plant.id}
            </span>
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit plant</legend>
          <label>
            plant nickname:
            <input
              onChange={e =>
                setPlantToEdit({ ...plantToEdit, plant: e.target.value })
              }
              value={plantToEdit.nickname}
            />
          </label>
          <label>
            species:
            <input
              onChange={e =>
                setPlantToEdit({
                  ...plantToEdit,
                  species: e.target.value }
                )
              }
              value={plantToEdit.species}
            />
          </label>
          <label>
            H20Frequency:
            <input
              onChange={e =>
                setPlantToEdit({
                  ...plantToEdit,
                  H20Frequency: e.target.value }
                )
              }
              value={plantToEdit.H20Frequency}
            />
          </label>
          <div>
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      
      <form onSubmit={submitNewPlant}>
        <label htmlFor='plant'>Plant Nickname: </label>
        <input type='text' name='nickname' id='nickname' value={newPlant.nickname} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            plant: event.target.value
          })
        }} />
        <label htmlFor='species'>Species: </label>
        <input type='text' name='species' id='species' value={newPlant.species} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            species: event.target.value}
          )
        }} />
        <label htmlFor='h20frequency'>H20Frequency: </label>
        <input type='text' name='h20frequency' id='h20frequency' value={newPlant.H20Frequency} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            H20Frequency: event.target.value}
          )
        }} />
        <button type='submit'>Add a new plant!</button>
      </form>
    </div>
  );
};

export default PlantList;