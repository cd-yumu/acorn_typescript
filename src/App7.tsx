// src/App7.tsx

import { ChangeEvent, useState } from "react";

function App7() {
    // type 과 비슷하지만만
    // interface 는 확장을 염두할 때 사용한다. (상속)
    interface Product{
        readonly id?:number;     // ? 는 optional - id 는 없어도 된다. 또한, readonly 는 읽기 전용
        name:string;
        price:number;
    }

    // Product type
    const item1:Product = {id:1, name:'iphone', price:1000};
    const item2:Product = {id:2, name:'androidphone', price:2000};
    const phoneList:Product[] = [item1, item2];

    const [state, setState] = useState<Product>({
        name:"",
        price:0
    });

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        // name 과 value 를 미리 얻어낸다. 
        // <input name="xxx" value="yyy" ... />
        const {name, value} = e.target

        // 만약 price 에 문자열을 입력하면 NaN 발생 (Not a Number)
        // 따라서, 아래 코드를 추가한다.

        // 만일 가격을 숫자가 아닌 값을 입력한다면 isNaN() 함수 사용
        if(name === "price" == isNaN(Number(value))){
            alert('가격은 숫자만 입력하세요');
            setState({...state, price:0})
            return;
        }
        
        setState({
            ...state,
            [e.target.name]:name === "price" ? Number(value) : value
        });
        
    }

    return (
        <div>
            <pre>{JSON.stringify(state, null, 4)}</pre>
            <input type="text" name="name" onChange={handleChange} value={state.name} placeholder="Product's Name..." />
            <input type="text" name="price" onChange={handleChange} value={state.price} placeholder="Price..." />
            <button>Add</button>

            <h1>Phone List.</h1>
            <ul>
                {/* type 이 확정되어 있어 코딩이 편하다. */}
                {phoneList.map(item=><li key={item.id}>{`(${item.id}) ${item.name} 의 가격은 ${item.price} 원 입니다.`}</li>)}
            </ul>
        </div>
    );
}

export default App7;