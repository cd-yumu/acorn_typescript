// src/components/Friedns.tsx

import { FC } from "react";
import { v4 as uuid } from "uuid";

// 
interface FriendsProps{
    list:string[]                 // list 라는 키값으로 string 타입 배열 전달 예정일 때
    onDelete:(idx:number)=>void   // 함수의 모양마저 type 으로 정해버리는... TypeScript 다
}


// props 에 전달 되는 값으로 Friends List 만들기
const Friends:FC<FriendsProps> = ({list, onDelete}) => {
    return (
        <>
            <h2>Friends List</h2>
            <ul>
                {list.map((item, index)=>
                    <li key={uuid()}>
                        {item}
                        <button onClick={()=>{onDelete(index)}}>X</button>
                        {/* 버튼을 누르면 부모 component 가 전달한 함수를 호출하면서 클릭한 index 를 전달달 */}

                        {/* {()=>onDelete(index)} 로 해야 한다.
                            {onDelete(index)} 불가
                            () 여기에는 Event 객체가 전달되기 때문에
                        */}
                    </li>
                )}
            </ul>
        </>
    );
}

export default Friends;