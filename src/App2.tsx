import { useState } from "react";


function App2() {
    // 배열 타입 선언
    //const num:number[] = [10, 20, 30, 'kim']; // 불가 (type 을 섞을 수 없다.)
    const nums:number[] = [10, 20, 30];
    const names:string[] = ['kim', 'lee', 'park'];

    // 친구 이름 목록을 상태값으로 관리
    const [friends, setFriends] = useState<string[]>(["맹구", "건강이", "메롱이"]);

    // 미리 type 을 선언해 높고 사용할 수도 있다.
    type MemberDto = {
        num:number;
        name:string;
        addr:string;
    };

    let m1 = {num:1, name:'김구라', addr:'노량진'}
    //m1 = {num:2};   // 불가 - object 의 모양이 달라서서

    // 대입할 object 의 type 을 명시적으로 선언한다면 아래와 같다.
    let m2:{num:number; name:string; addr:string} = {num:2, name:'해골', addr:'행신동'}

    let m3:MemberDto = {num:3, name:'원숭이', addr:'분당'};

    // members 는 MemberDto[] type 이다.
    const members:MemberDto[] = [m1, m2, m3];
    // java - List<MemberDto> or MemberDto[]


    return (
        <div>
            <h1>친구 목록</h1>
            <ul>
                {friends.map(item=><li>{item}</li>)}
            </ul>

            <h3>회원 목록</h3>        
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(item => <tr>
                        <td>{item.num}</td>
                        <td>{item.name}</td>
                        <td>{item.addr}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default App2;