import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import PlantList from "./PlantList";
import Navbar from './Navbar'

const PlantPage = () => {
  const [plantList, setPlantList] = useState([]);
  let id = localStorage.getItem('userId')
  useEffect(() => {
    axiosWithAuth().get(`https://lambda-sprout.herokuapp.com/users/${id}/plants`)
    .then(res => {
      setPlantList(res.data)
    })
  }, [id])

  return (
    <>
      <Navbar />
      <PlantList plants={plantList} updatePlants={setPlantList} />
    </>
  );
};

export default PlantPage;