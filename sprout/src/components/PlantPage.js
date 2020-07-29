import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import PlantList from "./PlantList";

const PlantPage = () => {
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('http://backendhere/api/plants')
    .then(res => {
      setPlantList(res.data)
    })
  }, [])

  return (
    <>
      <PlantList plants={plantList} updatePlants={setPlantList} />
    </>
  );
};

export default PlantPage;