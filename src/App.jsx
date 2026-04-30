import { useCallback, useState , useRef, useEffect } from "react";
import './App.css';

function App() {

  const [length, setLength] = useState(10);
  const [isNumberPresent , setIsNumberPresent] = useState(false)
  const [isSymbolPressent , setIsSymbolPressent] = useState(false)
  const [password , setPassword] = useState("");
  const [status , setStatus] = useState("Copy")
  const [notification, setNotification] = useState("");


  const my_ref = useRef(null)


  const Copy_password =()=>{
    my_ref.current.focus()
    my_ref.current.style.color = 'red'
    my_ref.current?.select();
    
    
    if (status === "Copy"){
      setStatus("Copied");
      
    }
    else{
      setStatus("Copy");
    }

    window.navigator.clipboard.writeText(password);
    
    
    setNotification("Password copied to clipboard!");
    
    
    setTimeout(() => {
        setNotification("");
    }, 2500);




  }

  



  const password_generator = useCallback(()=>{

    let pass = "";
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(isNumberPresent) string += '123467890'
    if(isSymbolPressent) string += '`~(){]{&^*%$#@!><?/|++=-_'

    for (let i = 1 ; i < length ; i++){
      let character  =  Math.floor(Math.random() * string.length)
      pass += string.charAt(character)
    }

    setPassword(pass)

  },[length , isNumberPresent , isSymbolPressent])


  useEffect(()=>{
    password_generator();
  },[length , isNumberPresent , isSymbolPressent , password_generator])
    

  return (
    <div className="container">
      
      <div className="box">
        <p>PASSWORD GENERATOR</p>
        
        <div className="upper_side">
          <input className="input_holder" value={password} placeholder="1hsgytewxf" readOnly ref={my_ref} />
          <button className="copy_btn" onClick={Copy_password}>{status}</button>
        </div>

        
        <div className="components">
          <div className="length_control">
            <p className="length_color">Length: {length}</p>
            
            <input type="range" min={6} max={50} value={length} onChange={(e) => setLength(e.target.value)} />
          </div>

          <div className="options_row">
            <div className="checkbox_group">
              <input  type='checkbox' id='checkbox1' defaultChecked = {isNumberPresent} onChange={() => setIsNumberPresent((prev) => !prev)}/>

              <label htmlFor="checkbox1">Number</label>
            </div>

            <div className="checkbox_group">
              <input  type='checkbox' id='checkbox2'  onChange={() => setIsSymbolPressent((prev) => !prev)}/>

              <label htmlFor="checkbox2">Symbol</label>
            </div>
          </div>
        </div>
      
      </div>

      {notification && (
        <div className="popup-notification">
          {notification}
        </div>
      )}
    </div>
  );
}

export default App;