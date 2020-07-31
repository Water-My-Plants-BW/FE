import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const initialPlant = {
  id: Date.now(),
  nickname: "",
  species: "",
  h2oFrequency: "",
};

const PlantList = ({ plants, updatePlants }) => {
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);
  const [newPlant, setNewPlant] = useState(initialPlant);
  let id = localStorage.getItem('userId')

  const editPlant = plant => {
    setEditing(true);
    setPlantToEdit(plant);
  };


  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`https://lambda-sprout.herokuapp.com/plants/${plantToEdit.id}`, plantToEdit)
    .then(response => {
      console.log(response)
      axiosWithAuth().get(`https://lambda-sprout.herokuapp.com/users/${id}/plants`)
      .then(response => {
        updatePlants(response.data)
        setEditing(false)
      })
      .catch(error => console.log(error))
    })
  };

  const deletePlant = plant => {
    axiosWithAuth().delete(`https://lambda-sprout.herokuapp.com/plants/${plant.id}`)
    .then(response => {
      updatePlants(plants.filter(plantId => plantId.id !== plant.id ))
    })
    .catch(error => console.log(error))
  };

  const submitNewPlant = event => {
    event.preventDefault();
    axiosWithAuth().post(`https://lambda-sprout.herokuapp.com/users/${id}/plants`, newPlant)
    .then(response => {
      const updatedPlants = [...plants, response.data]
      updatePlants(updatedPlants)
      setNewPlant(initialPlant);
    })
    .catch(error => console.log(error))
  }
  console.log(plants)

  return (
    <div>
      <p>Your Plants</p>
      <ul>
        {plants.length < 1 ? (<div>Please add a plant!</div>) : (plants.map(plant => (
          <li key={plant.id} onClick={() => editPlant(plant)}>
            <span>
              <span className="delete" onClick={e => {
                    //e.stopPropagation();
                    deletePlant(plant)
                  }
                }>
                  x
              </span>{" "}
              {plant.nickname}
            </span>
          </li>
        )))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit plant</legend>
          <label>
            plant nickname:
            <input
              onChange={e =>
                setPlantToEdit({ ...plantToEdit, nickname: e.target.value })
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
            h2oFrequency:
            <input
              onChange={e =>
                setPlantToEdit({
                  ...plantToEdit,
                  h2oFrequency: e.target.value }
                )
              }
              value={plantToEdit.h2oFrequency}
            />
          </label>
          <div>
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      
      <form onSubmit={submitNewPlant}>
        <label htmlFor='nickname'>Plant Nickname: </label>
        <input type='text' name='nickname' id='nickname' value={newPlant.nickname} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            nickname: event.target.value
          })
        }} />
        <label htmlFor='species'>Species: </label>
        <input type='text' name='species' id='species' value={newPlant.species} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            species: event.target.value}
          )
        }} />
        <label htmlFor='h2ofrequency'>h2oFrequency: </label>
        <input type='text' name='h2ofrequency' id='h2ofrequency' value={newPlant.h2oFrequency} onChange={(event) => {
          setNewPlant({
            ...newPlant,
            h2oFrequency: event.target.value}
          )
        }} />
        <button type='submit'>Add a new plant!</button>
      </form>
    </div>
  );
};

export default PlantList;