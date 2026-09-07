import { useEffect, useState } from "react";
import {
    Bell,
    CheckCircle,
    Trash2,
    RefreshCcw
} from "lucide-react";

import notificationService from "../../services/notificationService";
import AuthService from "../../services/AuthService";

import "./Notification.css";


const Notification = () => {


    const [notifications, setNotifications] =
        useState([]);


    const [loading, setLoading] =
        useState(true);



    const user =
        AuthService.getUser();



    const userId =
        user?.id;





    useEffect(() => {

        if(userId){

            loadNotifications();

        }

    }, [userId]);







    const loadNotifications = async () => {


        try {


            setLoading(true);



            const data =
                await notificationService
                .getUserNotifications(userId);



            setNotifications(data);



        }
        catch(error){


            console.error(
                "Notification loading error:",
                error
            );


        }
        finally{


            setLoading(false);


        }


    };









    const readNotification = async(id)=>{


        try{


            await notificationService
            .markAsRead(id);



            loadNotifications();


        }
        catch(error){

            console.error(error);

        }


    };









    const deleteNotification = async(id)=>{


        try{


            await notificationService
            .deleteNotification(id);



            loadNotifications();


        }
        catch(error){

            console.error(error);

        }


    };









    if(loading){


        return (

            <div className="notification-loading">


                <RefreshCcw
                    className="animate-spin"
                />


            </div>

        );


    }







    return (


        <div className="notification-container">



            <div className="notification-header">


                <div>


                    <h1>
                        Notifications
                    </h1>


                    <p>
                        Manage your alerts and updates
                    </p>


                </div>




                <button

                    onClick={loadNotifications}

                    className="refresh-btn"

                >

                    <RefreshCcw size={18}/>

                    Refresh

                </button>



            </div>








            <div className="notification-card">


            {
                notifications.length === 0 ?


                (

                    <div className="empty">


                        <Bell size={40}/>


                        <p>
                            No notifications available
                        </p>


                    </div>


                )


                :


                notifications.map(
                    (notification)=>(


                        <div

                            key={notification.id}

                            className={
                                notification.read
                                ?
                                "notification-item read"
                                :
                                "notification-item"
                            }

                        >



                            <div className="notification-icon">

                                <Bell size={22}/>

                            </div>





                            <div className="notification-content">


                                <h3>
                                    {notification.title}
                                </h3>



                                <p>
                                    {notification.message}
                                </p>




                                <span>


                                    {notification.type}


                                    {" | "}


                                    {
                                        new Date(
                                            notification.createdAt
                                        )
                                        .toLocaleString()
                                    }


                                </span>



                            </div>







                            <div className="notification-actions">



                                {
                                    !notification.read &&


                                    <button

                                        onClick={
                                            () =>
                                            readNotification(
                                                notification.id
                                            )
                                        }

                                    >

                                        <CheckCircle size={20}/>

                                    </button>


                                }





                                <button

                                    onClick={
                                        () =>
                                        deleteNotification(
                                            notification.id
                                        )
                                    }

                                >

                                    <Trash2 size={20}/>

                                </button>



                            </div>




                        </div>


                    )

                )

            }



            </div>




        </div>


    );


};


export default Notification;