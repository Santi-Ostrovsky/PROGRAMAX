import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { putContrato } from '../../Redux/Actions/Contracts';
import { useNavigate } from 'react-router-dom';
import s from "./Reviews.module.css"



export default function ReviewRender({id, puntuacion, comentario}) {

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const [currentValue, setCurrentValue] = useState(0);
const [hoverValue, setHoverValue] = useState(undefined);
const [ input, setInput ] = useState({
    puntuacion: 0,
    comentario: ""
})
  const stars = Array(5).fill(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = value => {
    setCurrentValue(value)
    setInput({
        ...input,
        puntuacion: value
    })
    //dispatch(setReputacion(value))
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  const handleTeaxArea = (e)=>{
    setInput({
    ...input,
    comentario: e.target.value

 })
  }
 

  return (
    <div className={ s.divReviews}>
    <div style={styles.container}>
      <h2>Puntuación</h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <textarea 
      className={s.textarea}
        placeholder="Cómo fue tu experiencia?"
        // style={styles.textarea}
        onChange={(e)=>handleTeaxArea(e)}
      />

    </div>
    </div>
  );
};

const styles = {}