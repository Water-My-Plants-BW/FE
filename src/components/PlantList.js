import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";
import Input from "./Input";

const initialPlant = {
  id: Date.now(),
  nickname: "",
  species: "",
  h2oFrequency: ""
};



const PlantList = ({ plants, updatePlants }) => {
  const [editing, setEditing] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(initialPlant);
  const [newPlant, setNewPlant] = useState(initialPlant);
  const [errors, setErrors] = useState({...initialPlant})
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();
  let id = localStorage.getItem('userId')

   //Schema for validation
   const formSchema = yup.object().shape({
    nickname: yup
    .string()
    .required("Please Enter Plant's Nickname"),
    species: yup
    .string()
    .required("Please Enter Your Plant Species"),
    h2oFrequency: yup
    .string()
    .required("Please Enter Plant's Water Frequency"),
   })

   //Side effect hook to disable or enable add button based on validation with current formState synced
   useEffect(() => {
    formSchema.isValid(newPlant).then(valid => { setButtonDisabled(!valid);
    });
 }, [newPlant])

   //Validating the change in value, based on formSchema described above
   const validation = (e) => {
     
    e.persist()

    yup.reach(formSchema, e.target.name)

    .validate(e.target.value)

    .then(valid => {
      setErrors({...errors, 
      [e.target.name]: "" 
   
       });
    })
    .catch(err => {
      setErrors({...errors, 
        [e.target.name]: err.errors[0] 
      })
        console.log(err.errors[0])
    })  
   }


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

  //Recording user's Input & Call back for validation while user meets the requirements to fill
  const handleInputChange = (e) => {
    
    setNewPlant({...newPlant,
       [e.target.name]: e.target.value
    })

    validation(e);
   }


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
      <ListWrapper>
      <h1 className="plantsdisplay">Your Plants</h1>
      <ul>
      {plants.length < 1 ? (<div>LOADING</div>) : (plants.map(plant => (
          <li key={plant.id} onClick={() => editPlant(plant)}>
            <span>
              <span className="delete" onClick={e => {
                    // e.stopPropagation();
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
        <form className="editform" onSubmit={saveEdit}>
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
      </ListWrapper>
      
      <form onSubmit={submitNewPlant}>
      <AddWrapper>
        <div className="innerWrapper">
        <label htmlFor='nickname'>Plant Nickname: </label>
        <Input className="input" type='text' name='nickname' id='nickname' value={newPlant.nickname} onChange={handleInputChange} errors={errors.nickname}/>
        <label htmlFor='species'>Species: </label>
        <Input className="input" type='text' name='species' id='species' value={newPlant.species} onChange={handleInputChange} errors={errors.species}/>
        <label htmlFor='h2oFrequency'>H2OFrequency: </label>
        <Input className="input" type='text' name='h2oFrequency' id='h2oFrequency' value={newPlant.h2oFrequency}  onChange={handleInputChange} errors={errors.h2oFrequency}/>
        <button type='submit'  className="btn btn-primary list-button" disabled={buttonDisabled}>Add a new plant!</button>
        </div>
        </AddWrapper>
      </form>
     
    </div>
  );
};

const ListWrapper = styled.div`

   width: 100%;
   height: 250px;
   display: flex;
   font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
   justify-content: center;
   border-radius: 10px;
   font-family: "Karma", sans-serif;
   @media(max-width: 600px){
    width: 100%;
}
h1{
  margin-top: 50px;
}

`;

const AddWrapper = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   font-family: "Karma", sans-serif;
   @media(max-width: 600px){
    width: 100%;
}
   .innerWrapper{
    width: 40%;
    margin-bottom: 40px;
    padding: 4rem;
    background: gray;
    color: lightgray;
    box-sizing: border-box;
    @media(max-width: 800px){
     width: 100%;
  }
   }

   .input{
     border: 0;
     width: 90%;
     background: lightgray;
     margin: 5px 0 10px 0;
     color: #282828;
     font-size: 16px;
     padding: 10px 14px;
     outline: none;
     line-height: normal;
     box-shadow: none;
     @media(max-width: 800px){
      width: 100%;
  }
     :focus{
       border-bottom: 1px solid cyan;
     }
   }
  
   button{
     width: 97%;
     margin-top: 10px;
     padding: 10px;
     outline: none;
     transition-duration: 0.4s;
     font-size: 16px;
     outline: none;
     border: 0;
     :hover{
      
       background-color: #4CAF50;
       cursor: pointer;

     }
   }
`;

export default PlantList;