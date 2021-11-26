import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/01.wav";
import right from "../assets/02.wav";
import wrong from "../assets/05.mp3";
import clap from "../assets/04.wav";


export default function Quiz({data,setStop,queNumber,setQueNumber}) {

    const [que , setQue] = useState(null);
    const [selectAnswer , setSelectAnswer] = useState(null);
    const [className , setClassName] = useState("answer");
    const [letsPlay] = useSound(right)
    const [rightAns] = useSound(play)
    const [wrongAns] = useSound(wrong)
    const [clapSound] = useSound(clap)


    useEffect(()=>{
      wrongAns();
      wrongAns();
    },[wrongAns])



    useEffect(() => {
        setQue(data[queNumber - 1])
    }, [data,queNumber]);

    const delay = (duration, callback) =>{
        setTimeout(() =>{
            callback();
        },duration);
    };

    const handleClick = (a) => {
        setSelectAnswer(a);
        setClassName("answer active");
        delay(3000, () => 
            setClassName(a.correct ? "answer correct" : "answer wrong")
            );
        delay(5000, () => 
            {
                if(a.correct){
                    rightAns();
                    delay(1000,() =>{
                        setQueNumber((prev) => prev+1);
                        setSelectAnswer(null);
                    });

                } else {
                    clapSound();
                    delay(1000,() =>{
                        setStop(true);
                    });
                }
            }
        );    
    };

    return (
        <div className="quiz">
            <div className="question">{que?.question}</div>
            <div className="answers">
                {que?.answers.map((a) => (
                        <div className={selectAnswer === a ? className : "answer"} onClick={ () =>handleClick(a)}>
                            {a.text}
                        </div>
                ))}
            </div>
            
        </div>
    )
}
