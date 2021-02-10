import React, { useState } from 'react';




function RunButton() {

    const [destination, setCount] = useState(false);


    function RunProgram(){
        //Gjørra no greier
    }
    
    return (<div>
        <button onClick={RunProgram}> Submit </button>
     </div>);
}
export default RunButton