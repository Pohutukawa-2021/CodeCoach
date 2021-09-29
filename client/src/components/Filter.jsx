import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

function Filter() {
  const history = useHistory()
  const [checkbox, setCheckbox] = useState("/app")
  const [value, setValue] = useState('unchecked')

  function handleClick(e) {
    const { id } = e.target
    if (checkbox.includes(id)) {
      setCheckbox("/app")
      setValue('checked')
    } else {
    setCheckbox(`/app/${id}`)
    }

}

  useEffect(() => {
    history.push(`${checkbox}`)
  }, [checkbox])

  return (
    <div>
      <p>Filters</p>

<div key="value">
    <input type="checkbox" name="filters" id="answered" 
          onClick={handleClick} defaultValue={value}/>
    <label for="answered">Answered</label>
    </div>
    <div>
      <input type="checkbox" name="filters" id="unanswered" onClick={handleClick}/>
      <label for="unanswered">Unanswered</label>
    </div>
    <div>
      <input type="checkbox" name="filters" id="myquestions" onClick={handleClick}/>
      <label for="myquestions">My Questions</label>
    </div>
  </div>
  )
}

export default Filter
