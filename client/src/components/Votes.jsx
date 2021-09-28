import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/actions/counter'

function Votes() {
  const counter = useSelector((state) => state.counter)
  const [disable, setDisable] = useState(false)
  const dispatch = useDispatch();

  return (
    <div>
      <button disabled={disable} onClick={() => {
        dispatch(increment())
        setDisable(true)
        }}>
          Up Vote
      </button>
      <p>{counter}</p>
      <button disabled={disable} onClick={() => {
        dispatch(decrement())
        setDisable(true)
        }}>
          Down Vote
      </button>
    </div>
  )
}

export default Votes

// disable when one of the buttons is clicked - onclick will setState to true ??
// can only pick either or ?

