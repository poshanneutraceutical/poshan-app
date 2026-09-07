const AttendanceButtons = ({
    todayAttendance,
    onCheckIn,
    onCheckOut,
    loading = false
}) => {

    const hasCheckedIn =
        todayAttendance?.checkIn != null;


    const hasCheckedOut =
        todayAttendance?.checkOut != null;


    return (

        <div className="attendance-buttons">


            {/* =================================================
                CHECK IN
            ================================================= */}

            <button
                type="button"
                className="checkin-btn"
                onClick={onCheckIn}
                disabled={
                    hasCheckedIn ||
                    loading
                }
            >

                {
                    loading
                        ? "Processing..."
                        : hasCheckedIn
                            ? "Checked In"
                            : "Check In"
                }

            </button>


            {/* =================================================
                CHECK OUT
            ================================================= */}

            <button
                type="button"
                className="checkout-btn"
                onClick={onCheckOut}
                disabled={
                    !hasCheckedIn ||
                    hasCheckedOut ||
                    loading
                }
            >

                {
                    loading
                        ? "Processing..."
                        : hasCheckedOut
                            ? "Checked Out"
                            : "Check Out"
                }

            </button>

        </div>

    );

};


export default AttendanceButtons;