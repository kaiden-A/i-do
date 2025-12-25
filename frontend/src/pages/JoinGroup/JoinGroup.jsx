import axios from "axios";
import { useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";


function JoinGroup(){

    const navigate = useNavigate();
    const {groupId , tokenId} = useParams();

    useEffect(() => {

        const joinGroup = async() => {

            try{

                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/invite/join` , 
                    {groupId , tokenId},
                    {withCredentials : true}
                );

                if(res.data.success){
                    navigate('/dashboard');
                }


            }catch(err){
                console.error(err.response.data.message || err.message);

                if(err.response?.status === 401){
                    navigate('/login' , {
                        state : {redirectTo : `/join/${groupId}/${tokenId}`}
                    })
                }

                if(err.response?.status === 410){
                    navigate('/signup' , {
                        state : {redirectTo : `/join/${groupId}/${tokenId}` }
                    })
                }

                if(err.response?.status ===  409){
                    navigate('/dashboard');
                }

            }

        }

        joinGroup();

    }, [])

    return(
        <>
            <p>Joining a group...</p>
        </>
    )
}

export default JoinGroup;
