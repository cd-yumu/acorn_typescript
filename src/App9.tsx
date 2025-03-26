// src/App9.tsx

import { useState } from "react";
import Fortune from "./components/Fortune";
import Friends from "./components/Friends";


function App9() {


    const [friends, setFriends] = useState<string[]>(["맹구", "건강이", "메롱이"]);

    // Friends 컴포넌트에 전달한 함수 
    const handleDelete = (idx:number)=>{
        setFriends(friends.filter((item, index) => index !== idx))
    } 


    return (
        <div>
            <h1>외부 Component 사용하기</h1>
            <Fortune fortune="곽래희"/>
            <Fortune fortune="희주언니"/>

            <Friends list={friends} onDelete={handleDelete}/>
        </div>
        
    );
}

export default App9;