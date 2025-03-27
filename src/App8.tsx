// src/App8.tsx

import { FC, JSX } from "react";

function App8() {
    // FortuneComponent 에서 사용하는 props 의 type 을 미리 정의의
    interface FortuneProps{
        fortune:string
    }

    // 함수형 컴포넌트 정의
    const FortuneComponent:FC<FortuneProps> = (props)=>{    // FC: 함수형 component type
        return (
            <p>오늘의 운세 : {props.fortune}</p>
        );
    }

    // FC<FortuneProps> 는 (a:FortuneProps) => JSX.Element type 이기도 하다.
    const FortuneComponent2:(a:FortuneProps) => JSX.Element = (props)=>{
        return (
            <p>오늘의 운세 : {props.fortune}</p>
        )
    }

    return (
        <div>
            <h1>함수형 component 를 불러서 사용하기</h1>
            <FortuneComponent fortune="곽래희" />
            <FortuneComponent2 fortune="곽래희2" />
        </div>
    );
}



export default App8;