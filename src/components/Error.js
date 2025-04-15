import { useRouteError } from "react-router-dom";




const Error =()=>{
    const err = useRouteError();

    return(
        <div>
            <h1>Oops!!</h1>
            <h1>Something went wrong!Something went wrong1 </h1>
            <h1>{err.states} 
                {err.statesText}</h1>
        </div>
    )
}
export default Error;