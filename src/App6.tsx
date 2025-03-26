// src/App6.tsx
import { ChangeEvent, useRef, useState } from "react";

function App6() {
    // 열거형 type (상태값을 미리 정해주고 싶을 때 사용한다.)
    enum Weapon {
        SWORD,      
        GUN,
        ARROW
    }
    // 상수처럼 사용하기 때문에 대문자로 표기
    // 참조 방법: Weapon.SWORD, Weapon.USER, Weapon.GUEST 
    // 참조 값은 순서대로 0, 1, 2 이다.
    // 숫자가 아닌 문자열로 바꾸고 싶다면 직접 명시해준다.


    const [weaponState, setWeaponState] = useState<Weapon>(Weapon.SWORD);

    const handleChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        // Select 요소에서 일어난 ChangeEvent type 
        // 이렇게 정확히 명시하면 이 이벤트를 다른 요소의 change 이벤트로 사용할 수 없다.
        /*
            select 요소에 change 이벤트가 발생했을 때 발생하는 이벤트 객체의 type 은
            ChangeEvent<HTMLSelectElement> 이다.
        */
        
        // e.target.value 가 0 or 1 or 2 이지만 type 은 문자열이다(value)
        // 따라서 Number 함수 필요 : Number(e.target.value)
        // 추가로, 갑자기 숫자로 바꾸면 이상해 보일 수도 있으니까(?) as Weapon 을 붙인다.
        // 문자를 숫자로 바꾸어서 Weapon type 으로 만든다.
        setWeaponState(Number(e.target.value) as Weapon);
    };

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        // click 이벤트는 MouseEvent 이다.
        console.log(e)
        if(weaponState === Weapon.SWORD){
            /*
                pRef.current 는 null 일 가능성이 있기 때문에 확인을 해서 .innerText 를 참조해야 한다.
            */
            if(pRef.current != null){
                pRef.current.innerText = "칼로 공격해요";
            }
            // ! 는 null 일 가능성이 전혀 없다는 단언, 즉 그냥 강제로 참조해! 라는 의미
            // ? 는 null 이 아닐때 참조를 하겠다는 의미 (null safe)
        } else if(weaponState === Weapon.GUN){
            pRef.current!.innerText = "총으로 공격해요";
        } else if(weaponState === Weapon.ARROW){
            pRef.current!.innerText = "활로 공격해요";
        }
    };

    // p 요소의 참조값을 useRef() 를 이용해서 관리하고 싶으면 generic 을 HTMLParagraphElement 로 선언
    const pRef = useRef<HTMLParagraphElement>(null);

    return (
        <div>
            <select onChange={handleChange} value={weaponState}>
                <option value={Weapon.SWORD}>칼</option>
                <option value={Weapon.GUN}>총</option>
                <option value={Weapon.ARROW}>활</option>
            </select>
            <button onClick={handleClick}>공격하기</button>
            <p ref={pRef}></p>
        </div>
    );
}

export default App6;