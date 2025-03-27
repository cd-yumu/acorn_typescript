//src/App12.tsx

// fetch() 함수 대신에 axios 사용해 보기
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

function App12(){

    // Post 객체 type 정의
    interface Post {
        id:number
        title:string
        author:string
    }

    // 글 목록을 상태값으로 관리하기 위해 (초기값은 빈 배열)
    const [posts, setPosts] = useState<Post[]>([]);

    // 글 목록 데이터를 받아오는 함수 
    const refresh = ()=>{
        axios.get("/v1/posts")
        .then(res=>{
            console.log(res.data);
            // 전달된 결과를 Post[] 타입으로 바꿔서 저장하기 or axios.get<Post[]>("/v1/posts") 도 가능
            setPosts(res.data as Post[]);
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        refresh();
    },[]);

    return (
        <div className="container">
            <h1>새 글 작성 폼</h1>
            <form action="/v1/posts" onSubmit={(e:FormEvent<HTMLFormElement>)=>{
                e.preventDefault(); // 폼 전송 막기
                
                // 요청 url
                const url = e.currentTarget.action;
                // current 로 사용 시 포함 관계에 따라서 다른 것을 가르킬 수 있기 때문에 currentTarget 을 사용한다.
                
                // FormData 객체
                const formData = new FormData(e.currentTarget);

                // 폼에 입력한 내용을 object 변환
                const obj = Object.fromEntries(formData);
                
                // object 에 있는 내용을 이용해서 JSON 문자열 만들어내기
                const json = JSON.stringify(obj);

                // fetch() 함수를 이용해서 페이지 전환 없이 post 방식 요청하면서 json 문자열 전송하기
                axios.post("/v1/posts",obj)
                /*
                    - post(요청경로,object)
                    - object 에 담긴 내용이 자동으로 json 문자열로 변경되어서 서버에 전달된다다
                */
                .then(res =>{
                    // 서버가 응답한 json 문자열이 object 혹은 array 로 변환되어서 res.data 라는 방에 들어 있다.
                    console.log(res.data);
                    refresh();
                })
                .catch(error=>{
                    console.log(error);
                });
            }}>
                <input type="text" name="title" placeholder="제목 입력..."/>
                <input type="text" name="author" placeholder="작성자 입력..."/>
                <button type="submit">저장</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td><button onClick={()=>{
                                // 수정할 제목을 입력 받는다.
                                const title = prompt(item.id + " 번글의 수정할 제목 입력");
                                // 수정할 정보를 이용해서 object 를 만든다.
                                const obj = {
                                    title: title,
                                    author: item.author
                                };
                                // fetch 함수를 이용해 PUT 방식으로 변경 정보를 json으로 요청한다.
                                axios.put("/v1/posts/"+item.id,obj)
                                .then(res=>{
                                    console.log(res.data);
                                    refresh();
                                })
                                .catch(err=>{
                                    console.log(err);
                                })
                            }}>수정</button></td>
                            <td><button onClick={()=>{
                                axios.delete("/v1/posts/"+item.id)
                                .then(res=>{
                                    alert(res.data.id + " 번 글을 삭제했습니다.");
                                    refresh();
                                })
                                .catch(err=>console.log(err));
                            }}>X</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default App12;