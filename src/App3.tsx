// src/App3.tsx

// 미리 정의된 type.ts 에서 MemberDto 를 import 해서 사용하기
import { MemberDto, PostDto } from "./types/type";


function App3() {
    /*
        외부에 미리 정의된 type 을 import 해서 사용해보기기
    */

    const members:MemberDto[] = [];
    members.push({num:1, name:'mangu', addr:'anyang'});
    members.push({num:2, name:'gungang', addr:'sungnam'});

    // PostDto[] 배열을 만들고 아이템을 추가해보세요.
    const posts:PostDto[] = [];
    posts.push({id:1, title:'hi', content:'nice to meet you'});
    posts.push({id:2, title:'bye', content:'see you again'});

    // json 문자열
    const json1 = `
        {"num":1, "name":"kim", "addr":"noryangin"}
    `;

    // json 을 파싱한 결과를 MemberDto type 으로 받기
    let m1 = JSON.parse(json1) as MemberDto;
    
    const json2 = `
        ["kim", "lee", "park"]
    `;
    // 위의 json 문자열을 파싱해서 적절한 type 변수에 담아 보세yo
    let names = JSON.parse(json2) as string[];
    names = ["xxx", "yyy"];
    // names = [10, 20];   // error

    const json3 = `
        [
            {"num":1, "name":"kim", "addr":"noryangin"},
            {"num":1, "name":"skeleton", "addr":"hanshindong"}
        ]
    `;
    // 위의 json 문자열을 파싱해서 적절한 type 변수에 담아 보세yo
    let memberList = JSON.parse(json3) as MemberDto[];
    // string[] 은 Array<string> 과 같다
    // MemberDto[] 은 Array<MemberDto> 로 쓸 수 있다.
    let memberList2:Array<MemberDto> = JSON.parse(json3);

    return (
        <div>
            
        </div>
    );
}

export default App3;