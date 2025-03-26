import { useState } from "react";

function App() {
    // 기본 type 익히기

    // 1. number, string, boolean ; 

    const age:number = 25;
    const name:string = 'choi';
    const isMan:boolean = false;

    // type 이 맞지 않아 들어가지 않는다. 
    //let age2:number = name; 

    // data type 을 선언하지 않으면 type 을 infer(추론) 한다.
    const myName = "mangu";
    let yourName:string = myName;
    // myName 은 string type 으로 이미 추론되어서 결정되어 있다.
    // let myNnu:number = myName;

    // useState 에서 사용하는 type 을 강제할 수 있다.
    const [msg, setMsg] = useState<string>("hi"); 
    // useState 사용 시 type 을 직접 선언해줄 수 있다. (generic 선언 하듯이)
    // type 에 맞는 것만 msg 에 넣을 수 있다.

    const [count, setCount] = useState<number>(0);

    const aaa = ()=>{
        setCount(count+1)
    }

    return (
        <div>
            <h1>Index Page.</h1>
            
            <button onClick={()=>{
                setMsg("bye");
                // setMsg(111); // 불가
                // 잘못된 데이터를 전달할 가능성이 줄어든다.
            }}>{msg}</button>

            {/* <button onClick={()=>{setCount(count+1)}}>{count}</button> */}
            <button onClick={aaa}>{count}</button>
        </div>
    )
}

export default App
