
            import { useEffect, useState } from "react";
            import { Link,useNavigate } from "react-router-dom";
            

            function Todo(){
                const [todoList,setTodoList] = useState([]);

                const navigate = useNavigate();

            function loadTodoList(){
                    const requestOptions = {
                        method: "GET",
                        redirect: "follow"
                    };
                    
                    fetch("http://localhost:5001/todos", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log(result);

                            let items = result.map((item)=>{
                                return <li key={item._id}>
                                    <Link to='/view' state={item._id}>{item.title}</Link>
                                </li>
                            })
                            setTodoList(items);
                            
                        })
                        .catch((error) => console.error(error));
                }

                function addTodoList(){
                    navigate('/add')
                }
                useEffect(()=>{
                    loadTodoList()
                },[])


            return(
                    <>
                    
                    <h1>TODO APP</h1>
                    <ul className="list-group list-unstyled"> 
                        <div className="list-group-item flex-fill fs-6 fw-bold text-start">{todoList}</div>
                    </ul>
                    <hr />
                
                    <button onClick={addTodoList} className="btn btn-success btn-lg rounded-pill px-4 py-2 shadow me-5">
                        ADD YOUR NEW LIST
                    </button>
                    </>
                )
            }

            export default Todo;