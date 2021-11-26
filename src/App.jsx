import { useState, useEffect, useMemo } from "react";
import "./app.css";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";
import {data} from "././data"

function App() {

  const [userName, setUsername] = useState(null);
  const [queNumber , setQueNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned ] = useState("₹ 0");





  const moneyPyramid = useMemo(()=>
    [
      {id:1, amount:"₹ 1000"},
      {id:2, amount:"₹ 2000"},
      {id:3, amount:"₹ 5000"},
      {id:4, amount:"₹ 10,000"},
      {id:5, amount:"₹ 50,000"},
      {id:6, amount:"₹ 75,000"},
      {id:7, amount:"₹ 1,00,000"},
      {id:8, amount:"₹ 3,00,000"},
      {id:9, amount:"₹ 5,00,000"},
      {id:10, amount:"₹ 10,00,000"},
      {id:11, amount:"₹ 25,00,000"},
      {id:12, amount:"₹ 50,00,000"},
      {id:13, amount:"₹ 1 crore"},
      {id:14, amount:"₹ 3 crore"},
      {id:15, amount:"₹ 5 crore"},
    ].reverse(),
  []
  ); 
  

  useEffect(() => {
    queNumber > 1  && setEarned(moneyPyramid.find(m => m.id === queNumber-1).amount)
  }, [moneyPyramid, queNumber])


  return (
    <div className="app">
      
      {userName ? (
        <>
          <div className="main">
       {stop ? <h1 className="endText">You Earned: {earned} </h1> : (
<>
       <div className="top">
         <div className="timer">
           <Timer setStop={setStop} queNumber={queNumber} />
         </div>
       </div>
       <div className="bottom">
         <Quiz 
            data={data} 
            setStop={setStop}
            queNumber={queNumber}
            setQueNumber={setQueNumber} 
          />
       </div>
       </>
      ) } 
     </div>
     <div className="pyramid">
       <ul className="moneyList">
         {moneyPyramid.map(m => (
          <li className={queNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
              <span className="moneyListItemNumber"> {m.id} </span>
              <span className="moneyListItemAmount"> {m.amount}</span>
          </li>
         ))}



       </ul>
     </div>
        </>
      ) : <Start setUsername={setUsername} /> }
     
     
    </div>
  );
}

export default App;
