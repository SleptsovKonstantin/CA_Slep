import React from 'react'
import Dropdown from './Dropdown'

const  ButtonList: React.FC = () => {
  return (
    <div>
      <Dropdown options={['тест тест тест', 'тест1 тест тест', 'тест2 тест тест']}/>
    </div>
  )
}

export default ButtonList
