import { useRef} from "react";
import { useNavigate } from "react-router-dom";

function Add(){
    
    let title = useRef();
    let description = useRef();
    let priority =  useRef();

    const navigate = useNavigate();

   function addTodoList(){

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                "title": title.current.value,
                "description": description.current.value,
                "status": "In-Progress",
                "priority": priority.current.value
                });

                const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
                };

                fetch("http://localhost:5001/todos", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result);
                    alert("Task Added Successfully");
                })
                .catch((error) => console.error(error));
        }
        
        
        function backToHome(){
            navigate('/');
        }

        function updatePage(){
            navigate('/view');
        }


return(
        <>
        <h1 className="fw-bold fs-10">PLEASE TYPE YOUR TASK</h1>
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

        <button onClick={addTodoList} className="btn btn-primary btn-lg rounded-pill px-4 py-1 shadow me-3 mb-4">
            SAVE LIST
        </button>
        
        <button onClick={updatePage} className="btn btn-primary btn-lg rounded-pill px-4 py-1 shadow me-3 mb-4">
            UPDATE CHANGES
        </button>

        <div className="d-flex flex-column align-items-center m-6 ">
        <button onClick={backToHome} className="btn btn-warning btn-lg rounded-pill px-8 py-1 shadow align-items-start mb-2">
            {`<<---- BACK TO HOME`}
        </button>
        </div>

        </>
    )
}

export default Add;