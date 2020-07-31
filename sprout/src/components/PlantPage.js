import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import PlantList from "./PlantList";

const PlantPage = () => {
  const [plantList, setPlantList] = useState([]);
  let id = localStorage.getItem('userId')
  useEffect(() => {
    axiosWithAuth().get(`https://lambda-sprout.herokuapp.com/users/${id}/plants`)
    .then(res => {
      setPlantList(res.data)
    })
    .catch(err => console.log(err))
  }, [id])

  return (
    <>
      <PlantList plants={plantList} updatePlants={setPlantList} />
    </>
  );
};

export default PlantPage;