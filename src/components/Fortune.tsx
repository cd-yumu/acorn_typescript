// src/components/Fortune.tsx

import { FC } from "react";

export interface FortuneProps {
    fortune:string
}

const Fortune:FC<FortuneProps> = (props)=>{
    // FC 타입은 FortuneProps 이다.
    // FortuneProps 는  props 의 타입을 결정한다.
    return (
        <p> Today's Fortune : <strong>{props.fortune}</strong> </p>
    );
}

export default Fortune;