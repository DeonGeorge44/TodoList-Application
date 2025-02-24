import { useEffect, useRef} from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";

function View(props){
    
    let title = useRef();
    let description = useRef();
    let priority =  useRef();

    let location = useLocation();
    const navigate = useNavigate();

    console.log('#LOCATION :',location);

    function loadTodoListItemDetails(){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
      
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        
        fetch(`http://localhost:5001/todos/${location.state}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {

            title.current.value = result.title;
            description.current.value = result.description;
            priority.current.value = result.priority;
            
        })
          .catch((error) => console.error(error));
    }



   function updateTodo(){
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                const raw = JSON.stringify({
                "title": title.current.value,
                "description":  description.current.value,
                "status": priority.current.value,
                "priority": "Normal"
                });
                
                const requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
                };
                
                fetch(`http://localhost:5001/todos/${location.state}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    alert("Task-UPDATED-Successfully");

                })
                .catch((error) => console.error(error));
        }

    
    function deleteTodo(){
          
           const raw = "";

           const requestOptions = {
           method: "DELETE",
           body: raw,
           redirect: "follow"
            };
         
            fetch(`http://localhost:5001/todos/${location.state}`, requestOptions)
           .then((response) => response.json())
           .then((result) => {
            alert("Deleted Your Task Successully");
            
           })
           .catch((error) => console.error(error));
    }

    function backToHome(){
        navigate('/');
    }

        
        useEffect(()=>{
            loadTodoListItemDetails();
        },[])
    
    
    
    return(
        <>
        <h1 className="fw-bold fs-10">TODO DETAILS</h1>
        <hr />
        <form>
            <div className="m-3">
                    <label className="form-label fw-bold fs-5">TITLE</label>
                    <input ref={title} className="form-control" type="text" />
            </div>
            <div className="m-3">
                    <label className="form-label fw-bold fs-5">DESCRIPTION</label>
                    <input ref={description} className="form-control" type="text" />
            </div>
            <div className="m-3">
                    <label className="form-label fw-bold fs-5">PRIORITY</label>
                    <input ref={priority} className="form-control" type="text" />
            </div>
            
        </form>

       
        <button onClick={updateTodo} className="btn btn-success btn-lg rounded-pill px-4 py-2 shadow me-5 mb-2">
            UPDATE
        </button>
        <button onClick={deleteTodo} className="btn btn-danger btn-lg rounded-pill px-4 py-2 shadow mb-2">
            DELETE
        </button>

        <div className="d-flex flex-column align-items-center m-6 ">
        <button onClick={backToHome} className="btn btn-warning btn-lg rounded-pill px-8 py-1 shadow align-items-start mb-2">
        {`<<---- BACK TO HOME`}
        </button>
        </div>

      
        </>
    )
}

export default View;