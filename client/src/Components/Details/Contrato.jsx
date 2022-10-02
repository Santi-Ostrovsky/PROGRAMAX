import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setearContrato } from "../../Redux/Actions/Contracts";
import s from "./Details.module.css";
import { useNavigate } from "react-router-dom";
import { emailer } from "../../Redux/Actions/Emailer";


export default function Contrato({
  userByEmail,
  userDetail,
  id,
  contratoDetail,
  SetContratoDetail,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [errors, setErrors] = useState({})
  
  const [propuesta, setPropuesta] = useState({
    employer: userByEmail,
    developer: id,
    description:"",
    date:"",
    expiration_date:"",
    status:"Pendiente", //"Activo", "Inactivo", "Completado", "Cancelado", "Pendiente"
    price:"",
    aceptado:false
  });


  const today = new Date().toLocaleDateString({year:"numeric", month:"short", day: "numeric"})

  const setOrderDate = (today) => {
    let division = today.split("/")
    let dia = division[0]
    let mes = division[1]
    let año = division[2]
    division[0] = año
    division[2]= dia
  
      if(mes.length === 1) {
      mes =  "0" + mes
    }
    let fechaExacta = año + "-" + mes + "-" + dia
  return fechaExacta
}

const validate = (propuesta) => {
  let errors = {};
  if(propuesta.description === "") errors.description = "El campo 'descripción' es obligatorio"
  if(propuesta.description.length < 5 ) errors.description = "Mínimo cinco caracteres"
  if(propuesta.description.length > 200) errors.description = "Máximo doscientos caracteres"
  if (/[^\w\s]/.test(propuesta.description)) errors.description = "Solo se permiten letras"
  if (propuesta.price <= 0) errors.price = "El número tiene que ser positivo"
  if (propuesta.price > 1000000) errors.price = "El precio máximo es un millón de pesos"
  return errors;
}

  const handleChangePropuesta = (e) => {
    setPropuesta({
      ...propuesta,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
      ...propuesta,
      [e.target.name]: e.target.value,
    }))
  };

  const handlerSendPropuesta = (e) => {
    if(!propuesta.date || !propuesta.expiration_date || !propuesta.description || !propuesta.price) alert("Los campos no pueden estar vacíos.")
    else if (errors.description) alert(errors.description)
    else if (errors.price) alert(errors.price)
    else {
      dispatch(setearContrato(propuesta));
      // DESCOMENTAR PARA QUE FUNCIONE EL EMAILER.
      //  dispatch(
      //     emailer({
      //       nombreContratista: userByEmail?.name,
      //       mailContrado: userDetail.email,
      //       IDContratado: userDetail.id
      //     })
      //  );
      alert("Tu propuesta fue enviada correctamente!");
      navigate("/work");
    }
  };

  return (
    <div className={s.bodyPropuesta}>
      <div className={s.conteiner}>
          <h1>Propuesta</h1>
        <h2>
          Contacta a {userDetail?.name} {userDetail?.lastName} y hazle una
          propuesta!
        </h2>
        
        <br />
        <div className={s.divForm}>
        <form className={s.inputForm}>
          <div className={s.divFormGen}>
          <div className={s.divDataForm}>
          <label>Fecha de inicio: </label>
          <input
          type={"date"} 
          name="date" 
          // value={today}
          min={setOrderDate(today)}
          //min="2022-10-22"
          classname={s.todosInput}
          required
          onChange={handleChangePropuesta} 
          />
          <label>Fecha de finalizacion: </label>
          <input
            classname={s.todosInput}
            type={"date"}
            name="expiration_date"
            onChange={handleChangePropuesta}
            max="2023-09-30"
          />
          <label>Presupuesto total en pesos: $</label>
          <input 
          classname={s.todosInput}
          type="number"
          min="1" 
          max="1000000"
          name="price"
          placeholder="0"
          onChange={handleChangePropuesta} />
          </div>
          <div className={s.divDescription}>
          <label>Descripcion: </label>
          <input
            classname={s.textDescription}
            type="text"
            minlength="4"
            maxlength="100"
            name="description"
            placeholder="Ingrese una descripción"
            onChange={handleChangePropuesta}
          />
        </div>
        </div>
        </form>
        </div>
        <div className={s.divButtons}>
          <button
            className={s.buttonVolver}
            onClick={() => SetContratoDetail(!contratoDetail)}
          >
            VOLVER
          </button>

          <button className={s.buttonPago} onClick={handlerSendPropuesta}>
            ENVIAR PROPUESTA
          </button>
        </div>
      </div>
    </div>
  );
}
