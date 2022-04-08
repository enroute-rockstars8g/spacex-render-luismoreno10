import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import {useEffect, useState} from 'react';
import axios from 'axios';


function App() {
  
const [missions, setMissions] = useState([]); //datos dinamicos
const [tablaMissions, setTablaMissions] = useState([]); //datos estatico
const [busqueda, setBusqueda] = useState("");


  const petitionGet=async() => {
    await axios.get("https://api.spacex.land/rest/missions")
    .then(response=>{
      setMissions(response.data);
      setTablaMissions(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange= e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    console.log("Busqueda: "+e.target.value);
  }

  const filtrar=(terminoBusqueda) => {
    var resultadosBusqueda = tablaMissions.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    });
    setMissions(resultadosBusqueda);
  }

  useEffect(()=>{
    petitionGet();
  },[])

  return (
    <div className="App">

      <div className="containerInput">
        <input className="form-control inputBuscar"
          value={busqueda}
          placeholder="Buscar nombre de la misión..."
          onChange={handleChange}
        />
        <button className="btn btn-success">Buscar</button>
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Id</th>
              <th>Name</th>
              <th>Twitter Site</th>
              <th>Website</th>
            </tr>
          </thead>

          <tbody>
            {missions && missions.map((mission)=>(
              <tr key={mission.id}>
                <td>{mission.description}</td>
                <td>{mission.id}</td>
                <td>{mission.name}</td>
                <td>{mission.twitter}</td>
                <td>{mission.website}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}



export default App;
