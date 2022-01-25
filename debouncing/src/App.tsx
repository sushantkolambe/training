import React, { useEffect, useState } from 'react';
import './App.css';
import useDebounce from './useDebounce';

function App() {
  const [value, setValue] = useState("");
  // let [debouncedValue, setDebouncedValue] = useState(value);
  

  // useEffect(() => {
  //   let timeoutId = setTimeout(() => {
  //     console.log("setting value");
  //     setDebouncedValue(value)
  //   }, 500)
  
  //   return () => {
  //     console.log("clearing value");
  //     clearTimeout(timeoutId)
  //   }
  // }, [value, 500]);

  const debounce = useDebounce(value);

  console.log({value});
  console.log({debounce});

  return (
    <div className="App">
      <input onChange={(event)=>setValue(event.target.value)} value={value} type="text" />
    </div>
  );
}



export default App;
