import React, { useEffect, useState } from 'react';

function useDebounce(value: string){
    let [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
        let timeoutId = setTimeout(() => {
          console.log("setting value");
          setDebouncedValue(value)
        }, 500)
      
        return () => {
          console.log("clearing value");
          clearTimeout(timeoutId)
        }
      }, [value, 500]);

      return debouncedValue;
}

export default useDebounce;