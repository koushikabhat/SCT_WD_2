import React, { useEffect } from 'react'
import { useState } from 'react';
import '../Style/index.css'

const Stopwatch = () => {

    const [hours, sethours] = useState(0);
    const [min, setmin] = useState(0);
    const [sec, setsec] = useState(0);
    const [msec, setmsec] = useState(0);

    const [isrunning, setisrunning] = useState(false)

    //for time lapse record 
    const [laps, setlaps] = useState([]);



    const startSw = ()=>{
        setisrunning(true) 
    }

    const stopSw = ()=>{
        setisrunning(false)
    }
    
    const pauseSw = ()=>{
        setisrunning(false)
        
    }
    const  lapRecord = ()=>{
        const laptime = `${hours}:${min}:${sec}:${msec}`
        
        setlaps((prevlap) =>[...prevlap , laptime])
        console.log(laps)
    }

    const  resetSw = ()=>{
        setisrunning(false)
        sethours(0);
        setmin(0);
        setsec(0);
        setmsec(0);
        setlaps([])
    }

    let timer;
    useEffect(() => {
        if(isrunning)
        {
            timer  = setInterval(()=>{
                setmsec((prevmsec)=>{
                    if(prevmsec >= 99)
                    {
                        setsec((prevsec)=>{
                            if(prevsec >= 59)
                            {
                                setmin((prevmin)=>
                                {
                                    if(prevmin >= 59)
                                    {
                                        sethours((prevhour)=>{ prevhour + 1} ) 
                                        return 0;
                                    }
                                    return prevmin + 1;
                                });  
                                return 0; 
                            }
                            return prevsec + 1;
                        });
                        return 0;
                    }
                    return prevmsec + 1;
                });
            },10);
        }
        return () => clearInterval(timer); //it is used to remove multiple interval  
    }, [isrunning])
    
   






  return (
    <>
            <div className="container">
                <h1>StopWatch Application</h1>
                <span>This is a stopwatch application using reactjs</span>
            </div>


            <div className="stopwatch">
                <div className="display">
                   {hours.toString().padStart(2, '0')}:
                   {min.toString().padStart(2,'0')}:
                   {sec.toString().padStart(2, '0')}:
                   {msec.toString().padStart(2, '0')}
                </div>
            </div>
            
            <div className='controls'>
                <button className="start" onClick={startSw}>Start</button>
                <button className="stop" onClick={stopSw}>Stop</button>
                <button className="pause" onClick={pauseSw}>Pause</button>
                <button className="laps" onClick={lapRecord}>Lap Record</button>
                <button className="reset" onClick={resetSw}>Reset</button>
            </div>
            <div className="disflex">
                <div className="lapsdisplay">
                    <h2>Recorded Lapse</h2>
                    <ul>
                        
                        {laps.map((lap, index)=>{
                            return <li key={index}>{lap}</li>
                        })}
                    </ul>
                </div>
            </div>
        
    </>
  )
}

export default Stopwatch
