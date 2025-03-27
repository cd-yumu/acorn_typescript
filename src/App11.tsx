// src/App11.tsx

import { useReducer, useRef, useState } from 'react';
import {v4 as uuid} from "uuid";

// 액션을 발행할 때 해당 액션의 Type 정의하기
interface Action{                               // type 이 아닌 interface 로 정의
    type:ActionType,
    payload?:string          // RESET 할 때는 payload 가 없음으로 optional 로 정의
}

// 액션을 발행할 때 해당 액션의 type 정의하기
enum ActionType {
    ADD,                                        // 값을 string 이 아닌 index 로 사용
    RESET,
    REMOVE 
}


const action1:Action = {type:ActionType.ADD, payload:"xxx"};

const action2:Action = {type:ActionType.REMOVE}

const result1 = action1.payload // xxx
/*  타입을 구지 적지 않아도 추론된다 (:string|undefined)
    근데 타입을 구지 적어버리면 undefined 로 추론되지 않기 때문에 오류 발생
    const result1:string = action1.payload -> error!

    이 때, 아래의 개념을 사용해보자.

    let a = xxx && yyy 
    xxx 에 값이 있으면 (true, not null, not undefined) yyy 를 이 위치에 남겨라

    let b = xxx || yyy
    xxx 에 값이 없으면 (false, null, undefined) yyy 를 이 위치에 남겨라

    그럼, const result1:string = action1.payload 이 코드를
    const result1:string = action1.payload || "" 로 바꿔 쓸 수 있다.
*/

action2.payload // undifined



const reducer = (state:State, action:Action):State =>{
    let newState:State;
    if(action.type === ActionType.ADD){
        newState = {
            ...state,
            friends:[...state.friends, {id: uuid(), name: action.payload || ""}]
        };
    } else if(action.type === ActionType.RESET) {
        newState = {
            ...state,
            friends:[]
        }
    } else if(action.type === ActionType.REMOVE){
        newState = {
            ...state,
            friends: state.friends.filter(item => item.id !== action.payload) 
        }
    } else {
        newState = state;
    }
    return newState;
};


interface Friend{
    id:string
    name:string
}

interface State{
    userName:string
    friends:Friend[]
}

// 초기 상태값
const initState:State = {
    userName:"kimgura", 
    friends:[]
}

function App11() {
    // useReducer(리듀서 함수, 초기상태값)
    const [state, dispatch] = useReducer(reducer, initState);

    // 특정 요소의 참조값을 관리하기 위한 hook
    const inputName = useRef<HTMLInputElement>(null);

    return (
        <div>
            <pre>{JSON.stringify(state,null,4)}</pre>

            <p>Logined UserName: <strong>{state.userName}</strong></p>
            <input ref={inputName} type="text" placeholder="Friend's Name"/> 

            <button onClick={()=>{
                if(inputName.current!.value){
                    // 입력한 이름을 추가하는 action 을 dispatch 한다. (동작을 발행)
                    const name = inputName.current!.value;
                    // 발생할 action 을 object 로 만든다.
                    const action:Action = {type:ActionType.ADD, payload:name}
                    // action 발행하기
                    dispatch(action);
                }
                
            }}>Add</button>  

            <button onClick={()=>{
                // Action 객체의 payload 는 optional 이기 때문에 payload 를 담지 않아도 된다.
                const action:Action = {type:ActionType.RESET}
                dispatch(action);
            }}>Reset</button>

            <ul>
                {state.friends.map(item=>
                    <li key={item.id}>
                        {item.name}<button onClick={()=>{
                            const action:Action = {type:ActionType.REMOVE, payload: item.id};
                            dispatch(action);
                        }}>X</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App11; 