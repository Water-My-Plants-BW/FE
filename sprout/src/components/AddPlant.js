import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Input from "./Input"

const defaultState = {
  id: "",
  nickname: "",
  species: "",
  h2Ofrequency: "",
}


function AddPlantForm(props) {

   const [formState, setFormState] = useState(defaultState)
   const [errors, setErrors] = useState({...defaultState})
   const [buttonDisabled, setButtonDisabled] = useState(true);
   const history = useHistory();
   
   //Schema for validation
   const formSchema = yup.object().shape({
    id: yup
     .number()
     .typeError('You must specify a number for your id')
     .required()
     .positive()
     .integer(),
    nickname: yup
    .string()
    .required("Please Enter Plant's Nickname"),
    species: yup
    .string()
    .required("Please Enter Your Plant Species"),
    h2Ofrequency: yup
    .string()
    .required("Please Enter Plant's Water Frequency"),
   })


//Side effect hook to disable or enable add button based on validation with current formState synced
    useEffect(() => {
     formSchema.isValid(formState).then(valid => { setButtonDisabled(!valid);
     });
  }, [formState])


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


//Recording user's Input & Call back for validation while user meets the requirements to fill
   const handleInputChange = (e) => {
    
    setFormState({...formState,
       [e.target.name]: e.target.value
    })

    validation(e);
   }
    
   
    

//This will be triggered after the submit button is clicked and will post the data on specified url
   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
    .then(res => {
      props.setAddPlant(res.data)
    })
    .catch(err => {
      console.log(err)
   })
   setFormState({...formState,
    [e.target.name]: " "
 })
   }


  return (
    
    <div>

      <AddWrapper>
     <form onSubmit={handleSubmit}>
       <div className="innerWrapper">


       {console.log(errors[0])}
       <Input className="input" name="id" type="String" value={formState.id} onChange={handleInputChange} placeholder="ENTER PLANT ID" errors={errors.id}></Input>

       <Input className="input" name="nickname" type="text" value={formState.nickname} onChange={handleInputChange} placeholder="ENTER NAME" errors={errors.nickname}></Input>


         
       <Input className="input" name="species" type="text" value={formState.species} onChange={handleInputChange} placeholder="ENTER SPECIES" errors={errors.species}></Input>
       

       
       <Input className="input" name="h2Ofrequency" type="text" value={formState.h2Ofrequency} onChange={handleInputChange} placeholder="ENTER H2OFREQUENCY" errors={errors.h2Ofrequency}></Input>
       
      <button type="submit" className="btn btn-primary list-button" onClick={() => history.goBack()} disabled={buttonDisabled}> Add Plant</button>

       </div>

     </form>
     </AddWrapper>
   
    </div>
   
  );
}

const AddWrapper = styled.div`
   width: 100%;
   height: 500px;
   display: flex;
   font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
   justify-content: center;
   align-items: center;
   
   
   .innerWrapper{
    width: 100%;
    margin-top: 2rem;
    padding: 4rem;
    background: green;
    display: flex;
    flex-direction: column;
    color:red;
    box-sizing: border-box;
    
   }
   .input{
     width: 100%;
     background: lightgray;
     margin: 5px 0 10px 0;
     border: none;
     color: #282828;
     font-size: 16px;
     padding: 10px 10px;
     outline: none;
     line-height: normal;
   }
  
   button{
     border: none;
     margin-top: 10px;
     padding: 1rem;
     transition-duration: 0.4s;
     :hover{
      
       background-color: #4CAF50;
       cursor: pointer;
     }
   }
`;

export default AddPlantForm;