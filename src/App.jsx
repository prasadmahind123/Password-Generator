import { useState } from 'react'
import './App.css'
import { lowerCaseOption, numbersOption, symbolOptions, upperCaseOption } from './data/condtions'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  let[getLength,setLength] = useState(6)
  let[getPassword,setPassword] = useState('')
  let[getUppercase,setUppercase] = useState(false)
  let[getLowercase,setLowercase] = useState(false)
  let[getNumber,setNumber] = useState(false)
  let[getSymbol,setSymbol] = useState(false)

   let generatePass = () => {
      let str = '';
      let password = '';
      if(getUppercase || getLowercase || getNumber || getSymbol){
        if(getUppercase) str += upperCaseOption;
        if(getLowercase) str += lowerCaseOption;
        if(getNumber) str += numbersOption;
        if(getSymbol) str += symbolOptions;
        if(getLength < 6 || getLength > 20) {
          toast.warn('Password length should be between 6 and 20')
          return
        }
        for(let i=0; i<getLength; i++){
          password += str.charAt(Math.floor(Math.random() * str.length));
        }
        setPassword(password);
      }
      else{
        toast.error("please select at least one condition!");
         return
      }
   }
   let copyPass = () => {
      if(getPassword !== ''){
        navigator.clipboard.writeText(getPassword)
        toast.success('Password copied successfully')
      }
      else{
        toast.error('No password generated yet!')
      }
   }
  return (
    <>
    <ToastContainer />
      <div className="passGenerator">
        <h2>Random Password Generator</h2>
        <div className="show-pass">
          <input value={getPassword}  className='pass' type="text" readOnly /> <button onClick={copyPass}>COPY</button>
        </div>
        <div className="length">
          <label htmlFor="passlength">Enter the Length of Password</label>
          <input onChange={(event) =>setLength(event.target.value)} value={getLength} className='setLength' id='passlength' type="number" max={20} />
        </div>
        <p>(Password Length should be between 6 and 20)</p>
        <div className="upper">
          <label htmlFor="uppercase">Include uppercase letters</label>
          <input checked = {getUppercase} onChange={() => setUppercase(!getUppercase)} type="checkbox" id="uppercase" />
        </div>
        <div className="lower">
          <label htmlFor="lowercase">Include lowercase letters</label>
          <input checked = {getLowercase}  onChange={() => setLowercase(!getLowercase)} type="checkbox" id="lowercase" />
        </div>
        <div className="number">
          <label htmlFor="numbers">Include numbers</label>
          <input checked = {getNumber}  onChange={() => setNumber(!getNumber)} type="checkbox" id="numbers" />
        </div>
        <div className="symbol">
          <label htmlFor="symbols">Include symbols</label>
          <input checked = {getSymbol}  onChange={() => setSymbol(!getSymbol)} type="checkbox" id="symbols" />
        </div>
        <div  onClick={generatePass} className="Btn">
          <h3>Generate Password</h3>
        </div>
      </div>
    </>
  )
}

export default App
