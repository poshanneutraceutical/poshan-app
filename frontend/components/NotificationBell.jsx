import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import notificationService from "../services/notificationService";
import AuthService from "../services/AuthService";



const NotificationBell = () => {


    const navigate =
        useNavigate();



    const [count,setCount] =
        useState(0);




    const user =
        AuthService.getUser();



    const userId =
        user?.id;







    useEffect(()=>{


        if(userId){

            loadNotificationCount();


            const interval =
                setInterval(
                    loadNotificationCount,
                    30000
                );


            return ()=>{

                clearInterval(interval);

            };


        }


    },[userId]);









    const loadNotificationCount =
        async()=>{


            try{


                const data =
                    await notificationService
                    .getUnreadCount(userId);



                setCount(data);



            }
            catch(error){


                console.error(
                    "Notification count error:",
                    error
                );


            }


        };









    return (


        <button


            onClick={()=>
                navigate("/notifications")
            }


            className="relative flex items-center"


        >



            <Bell size={26}/>




            {

                count > 0 &&


                <span


                    className="
                    absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    text-xs
                    font-bold
                    text-white
                    "


                >


                    {
                        count > 99
                        ?
                        "99+"
                        :
                        count
                    }


                </span>


            }



        </button>


    );


};


export default NotificationBell;