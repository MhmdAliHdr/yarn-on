import { useState } from 'react'
import './App.css'
import Section from "./components/Section"
import type { Row_Type } from './types/row'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Section name="Front Panel" rows={[{row_number:1}]}/>
    </>
  )
}

export default App
