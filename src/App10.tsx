// src/App10.tsx

import { JSX } from "react";

function App10() {

    // jsx 객체는 JSX.Element type 이다.
    const a:JSX.Element = <li>One</li>;
    const b:JSX.Element = <button>Click</button>;

    // JSX.Element 배열 type
    const list:JSX.Element[] = [
        <li>kimgura</li>,
        <li>skeleton</li>,
        <li>monkey</li>
    ];

    const list2:Array<JSX.Element>= [
        <li>kimgura</li>,
        <li>skeleton</li>,
        <li>monkey</li>
    ];


    return (
        <div>
            <ul>
                {a}
            </ul>
            {b}

            <h2>Friends List</h2>
            <ul>
                {list}
            </ul>
        </div>
    );
}

export default App10;