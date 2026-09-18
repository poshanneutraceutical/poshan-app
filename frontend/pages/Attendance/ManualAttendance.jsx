import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    CalendarDays,
    Check,
    Clock3,
    Edit3,
    History,
    Loader2,
    Plus,
    UserCheck,
    Users,
    X,
    UserRoundPlus
} from "lucide-react";

import ManualAttendanceService
    from "../../services/ManualAttendanceService";

import { useAuth } from "../../context/AuthContext";

import "./ManualAttendance.css";


const STATUS_OPTIONS = [
    {
        value: "PRESENT",
        label: "Present",
        short: "P",
        className: "present"
    },
    {
        value: "ABSENT",
        label: "Absent",
        short: "A",
        className: "absent"
    },
    {
        value: "HALF_DAY",
        label: "Half Day",
        short: "H",
        className: "half-day"
    },
    {
        value: "LATE",
        label: "Late",
        short: "L",
        className: "late"
    }
];


const todayIndia = () => {
    const formatter = new Intl.DateTimeFormat(
        "en-CA",
        {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }
    );

    return formatter.format(new Date());
};


const monthStart = () => {
    const today = todayIndia();
    return `${today.substring(0, 7)}-01`;
};


const ManualAttendance = () => {

    const { user } = useAuth();


    const normalizedRoles =
        Array.isArray(user?.roles)
            ? user.roles.map(role =>
                typeof role === "object" && role !== null
                    ? String(
                        role.name ||
                        role.role ||
                        ""
                    )
                        .replace(/^ROLE_/, "")
                        .toUpperCase()
                    : String(role)
                        .replace(/^ROLE_/, "")
                        .toUpperCase()
            )
            : [];

    const normalizedRole =
        String(user?.role || "")
            .replace(/^ROLE_/, "")
            .toUpperCase();

    const isAdmin =
        normalizedRole === "ADMIN" ||
        normalizedRoles.includes("ADMIN");


    const [selectedDate, setSelectedDate] =
        useState(todayIndia());

    const [people, setPeople] = useState([]);

    const [loadingPeople, setLoadingPeople] =
        useState(true);

    const [savingPerson, setSavingPerson] =
        useState("");

    const [selectedPerson, setSelectedPerson] =
        useState(null);

    const [history, setHistory] = useState([]);

    const [loadingHistory, setLoadingHistory] =
        useState(false);

    const [editingAttendance, setEditingAttendance] =
        useState(null);

    const [showWorkerForm, setShowWorkerForm] =
        useState(false);

    const [editingWorker, setEditingWorker] =
        useState(null);

    const [workerForm, setWorkerForm] = useState({
        name: "",
        mobile: "",
        email: "",
        department: "",
        note: ""
    });

    const [savingWorker, setSavingWorker] =
        useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    useEffect(() => {
        loadPeople();
    }, [selectedDate]);


    const loadPeople = async () => {
        try {
            setLoadingPeople(true);
            setError("");

            const response =
                await ManualAttendanceService.getPeople(
                    selectedDate
                );

            setPeople(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            );
        }
        catch (err) {
            console.error(
                "Unable to load manual attendance people:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to load employees and workers."
            );
        }
        finally {
            setLoadingPeople(false);
        }
    };


    const handleStatusChange = async (
        person,
        status
    ) => {
        const personKey =
            `${person.personType}-${person.personId}`;

        try {
            setSavingPerson(personKey);
            setError("");
            setSuccess("");

            await ManualAttendanceService.markAttendance({
                personType: person.personType,
                personId: person.personId,
                attendanceDate: selectedDate,
                status
            });

            setPeople(previous =>
                previous.map(item =>
                    item.personType === person.personType &&
                    String(item.personId) ===
                        String(person.personId)
                        ? {
                            ...item,
                            status
                        }
                        : item
                )
            );

            setSuccess(
                `${person.name} attendance marked as ${formatStatus(status)}.`
            );

            if (
                selectedPerson &&
                selectedPerson.personType === person.personType &&
                String(selectedPerson.personId) ===
                    String(person.personId)
            ) {
                loadHistory(
                    person.personType,
                    person.personId,
                    false
                );
            }
        }
        catch (err) {
            console.error(
                "Unable to mark manual attendance:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to save attendance."
            );
        }
        finally {
            setSavingPerson("");
        }
    };


    const clearAttendance = async person => {
        const personKey =
            `${person.personType}-${person.personId}`;

        try {
            setSavingPerson(personKey);
            setError("");
            setSuccess("");

            await ManualAttendanceService.removeAttendance(
                person.personType,
                person.personId,
                selectedDate
            );

            setPeople(previous =>
                previous.map(item =>
                    item.personType === person.personType &&
                    String(item.personId) ===
                        String(person.personId)
                        ? {
                            ...item,
                            status: null,
                            attendanceId: null
                        }
                        : item
                )
            );

            setSuccess(
                `${person.name} attendance selection was cleared.`
            );
        }
        catch (err) {
            console.error(
                "Unable to clear attendance:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to clear attendance."
            );
        }
        finally {
            setSavingPerson("");
        }
    };


    const openHistory = person => {
        setSelectedPerson(person);
        loadHistory(
            person.personType,
            person.personId,
            true
        );
    };


    const loadHistory = async (
        personType,
        personId,
        showLoader = true
    ) => {
        try {
            if (showLoader) {
                setLoadingHistory(true);
            }

            setError("");

            const response =
                await ManualAttendanceService.getHistory(
                    personType,
                    personId
                );

            setHistory(
                Array.isArray(response?.data)
                    ? response.data
                    : []
            );
        }
        catch (err) {
            console.error(
                "Unable to load attendance history:",
                err
            );

            setHistory([]);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to load attendance history."
            );
        }
        finally {
            if (showLoader) {
                setLoadingHistory(false);
            }
        }
    };


    const openWorkerForm = worker => {
        setError("");
        setSuccess("");

        if (worker) {
            setEditingWorker(worker);
            setWorkerForm({
                name: worker.name || "",
                mobile: worker.mobile || "",
                email: worker.email || "",
                department: worker.department || "",
                note: worker.note || ""
            });
        }
        else {
            setEditingWorker(null);
            setWorkerForm({
                name: "",
                mobile: "",
                email: "",
                department: "",
                note: ""
            });
        }

        setShowWorkerForm(true);
    };


    const closeWorkerForm = () => {
        if (savingWorker) {
            return;
        }

        setShowWorkerForm(false);
        setEditingWorker(null);
    };


    const handleWorkerSubmit = async event => {
        event.preventDefault();

        try {
            setSavingWorker(true);
            setError("");
            setSuccess("");

            if (editingWorker) {
                await ManualAttendanceService.updateWorker(
                    editingWorker.id,
                    workerForm
                );

                setSuccess(
                    "Worker details updated successfully."
                );
            }
            else {
                await ManualAttendanceService.createWorker(
                    workerForm
                );

                setSuccess(
                    "Worker added successfully."
                );
            }

            setShowWorkerForm(false);
            setEditingWorker(null);
            await loadPeople();
        }
        catch (err) {
            console.error(
                "Unable to save worker:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to save worker."
            );
        }
        finally {
            setSavingWorker(false);
        }
    };


    const handleAttendanceEditSave = async event => {
        event.preventDefault();

        if (!editingAttendance) {
            return;
        }

        try {
            setSavingPerson(
                `history-${editingAttendance.id}`
            );
            setError("");
            setSuccess("");

            await ManualAttendanceService.updateAttendance(
                editingAttendance.id,
                {
                    status: editingAttendance.status,
                    attendanceDate:
                        editingAttendance.attendanceDate
                }
            );

            setSuccess(
                "Attendance record updated successfully."
            );

            setEditingAttendance(null);

            await loadPeople();

            if (selectedPerson) {
                await loadHistory(
                    selectedPerson.personType,
                    selectedPerson.personId,
                    false
                );
            }
        }
        catch (err) {
            console.error(
                "Unable to edit attendance:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Unable to update attendance."
            );
        }
        finally {
            setSavingPerson("");
        }
    };


    const counts = useMemo(() => {
        return people.reduce(
            (summary, person) => {
                if (person.status) {
                    summary[person.status] += 1;
                }

                return summary;
            },
            {
                PRESENT: 0,
                ABSENT: 0,
                HALF_DAY: 0,
                LATE: 0
            }
        );
    }, [people]);


    if (!isAdmin) {
        return (
            <div className="manual-attendance-page">
                <div className="manual-attendance-no-access">
                    <UserCheck size={30} />
                    <h2>Access Restricted</h2>
                    <p>
                        Manual Attendance is available only to administrators.
                    </p>
                </div>
            </div>
        );
    }


    return (
        <div className="manual-attendance-page">

            <div className="manual-attendance-header">
                <div>
                    <div className="manual-attendance-kicker">
                        <UserCheck size={16} />
                        ADMIN ONLY
                    </div>

                    <h1>
                        Manual Attendance
                    </h1>

                    <p>
                        Mark attendance for employees and workers who do not use self check-in.
                    </p>
                </div>

                <div className="manual-attendance-header-actions">
                    <button
                        type="button"
                        className="manual-attendance-secondary-btn"
                        onClick={() => openWorkerForm(null)}
                    >
                        <UserRoundPlus size={18} />
                        Add Worker
                    </button>
                </div>
            </div>

            {error && (
                <div className="manual-attendance-alert error">
                    <X size={17} />
                    <span>{String(error)}</span>
                </div>
            )}

            {success && (
                <div className="manual-attendance-alert success">
                    <Check size={17} />
                    <span>{success}</span>
                </div>
            )}

            <div className="manual-attendance-toolbar">
                <div className="manual-attendance-date-field">
                    <CalendarDays size={18} />
                    <label htmlFor="manual-attendance-date">
                        Attendance Date
                    </label>
                    <input
                        id="manual-attendance-date"
                        type="date"
                        value={selectedDate}
                        onChange={event =>
                            setSelectedDate(event.target.value)
                        }
                    />
                </div>

                <div className="manual-attendance-quick-stats">
                    <span>
                        <strong>{people.length}</strong> People
                    </span>
                    <span className="stat-present">
                        <strong>{counts.PRESENT}</strong> Present
                    </span>
                    <span className="stat-absent">
                        <strong>{counts.ABSENT}</strong> Absent
                    </span>
                    <span className="stat-half">
                        <strong>{counts.HALF_DAY}</strong> Half Day
                    </span>
                    <span className="stat-late">
                        <strong>{counts.LATE}</strong> Late
                    </span>
                </div>
            </div>

            <div className="manual-attendance-main-grid">

                <section className="manual-attendance-card manual-attendance-mark-card">
                    <div className="manual-attendance-card-header">
                        <div>
                            <h2>Mark Attendance</h2>
                            <p>
                                Select one status for each person. Changes are saved immediately.
                            </p>
                        </div>
                    </div>

                    <div className="manual-attendance-legend">
                        {STATUS_OPTIONS.map(status => (
                            <span
                                key={status.value}
                                className={`legend-item ${status.className}`}
                            >
                                <span className="legend-dot">
                                    {status.short}
                                </span>
                                {status.label}
                            </span>
                        ))}
                    </div>

                    {loadingPeople ? (
                        <div className="manual-attendance-loading">
                            <Loader2
                                size={22}
                                className="spin"
                            />
                            Loading employees and workers...
                        </div>
                    ) : people.length === 0 ? (
                        <div className="manual-attendance-empty">
                            <Users size={26} />
                            <h3>No people found</h3>
                            <p>
                                Add an employee through Employee Management or add a worker here.
                            </p>
                            <button
                                type="button"
                                onClick={() => openWorkerForm(null)}
                                className="manual-attendance-primary-btn"
                            >
                                <Plus size={17} />
                                Add Worker
                            </button>
                        </div>
                    ) : (
                        <div className="manual-attendance-table-wrap">
                            <table className="manual-attendance-table">
                                <thead>
                                    <tr>
                                        <th className="person-column">
                                            Person
                                        </th>
                                        {STATUS_OPTIONS.map(status => (
                                            <th
                                                key={status.value}
                                                className={`status-heading ${status.className}`}
                                            >
                                                {status.label}
                                            </th>
                                        ))}
                                        <th>
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {people.map(person => {
                                        const personKey =
                                            `${person.personType}-${person.personId}`;

                                        const isSaving =
                                            savingPerson === personKey;

                                        return (
                                            <tr
                                                key={personKey}
                                                className={
                                                    person.status
                                                        ? "has-status"
                                                        : ""
                                                }
                                            >
                                                <td className="person-column">
                                                    <div className="person-cell">
                                                        <div className="person-avatar">
                                                            {getInitials(person.name)}
                                                        </div>

                                                        <div className="person-info">
                                                            <strong>
                                                                {person.name || "Unnamed"}
                                                            </strong>

                                                            <span>
                                                                {person.worker
                                                                    ? "Worker"
                                                                    : person.employeeCode || "Employee"}
                                                            </span>

                                                            {person.email && (
                                                                <small>
                                                                    {person.email}
                                                                </small>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {STATUS_OPTIONS.map(status => (
                                                    <td
                                                        key={status.value}
                                                        className={`status-cell ${status.className}`}
                                                    >
                                                        <button
                                                            type="button"
                                                            className={
                                                                `attendance-status-button ${
                                                                    person.status === status.value
                                                                        ? "selected"
                                                                        : ""
                                                                }`
                                                            }
                                                            title={`${person.name}: ${status.label}`}
                                                            aria-label={`${person.name}: ${status.label}`}
                                                            disabled={isSaving}
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    person,
                                                                    status.value
                                                                )
                                                            }
                                                        >
                                                            {isSaving &&
                                                            person.status !== status.value ? (
                                                                <Loader2
                                                                    size={15}
                                                                    className="spin"
                                                                />
                                                            ) : person.status === status.value ? (
                                                                <Check size={16} />
                                                            ) : (
                                                                status.short
                                                            )}
                                                        </button>
                                                    </td>
                                                ))}

                                                <td>
                                                    <div className="row-actions">
                                                        <button
                                                            type="button"
                                                            className="row-action history"
                                                            onClick={() => openHistory(person)}
                                                        >
                                                            <History size={15} />
                                                            History
                                                        </button>

                                                        {person.worker && (
                                                            <button
                                                                type="button"
                                                                className="row-action edit"
                                                                onClick={() => {
                                                                    const worker = {
                                                                        id: person.personId,
                                                                        name: person.name,
                                                                        email: person.email,
                                                                        mobile: person.mobile,
                                                                        department: person.department,
                                                                        note: person.note || ""
                                                                    };

                                                                    openWorkerForm(worker);
                                                                }}
                                                            >
                                                                <Edit3 size={15} />
                                                                Edit
                                                            </button>
                                                        )}

                                                        {person.status && (
                                                            <button
                                                                type="button"
                                                                className="row-action clear"
                                                                disabled={isSaving}
                                                                onClick={() => clearAttendance(person)}
                                                            >
                                                                Clear
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>

                <section className="manual-attendance-card manual-attendance-history-card">
                    <div className="manual-attendance-card-header history-header">
                        <div>
                            <h2>Attendance History</h2>
                            <p>
                                Select a person to see their complete manual attendance history.
                            </p>
                        </div>

                        <div className="history-header-actions">
                            <select
                                className="history-person-select"
                                value={
                                    selectedPerson
                                        ? `${selectedPerson.personType}-${selectedPerson.personId}`
                                        : ""
                                }
                                onChange={event => {
                                    const value = event.target.value;

                                    if (!value) {
                                        setSelectedPerson(null);
                                        setHistory([]);
                                        return;
                                    }

                                    const person = people.find(item =>
                                        `${item.personType}-${item.personId}` === value
                                    );

                                    if (person) {
                                        openHistory(person);
                                    }
                                }}
                            >
                                <option value="">
                                    Select Person
                                </option>
                                {people.map(person => (
                                    <option
                                        key={`${person.personType}-${person.personId}`}
                                        value={`${person.personType}-${person.personId}`}
                                    >
                                        {person.name}
                                    </option>
                                ))}
                            </select>

                            {selectedPerson && (
                                <button
                                    type="button"
                                    className="history-clear-btn"
                                    onClick={() => {
                                        setSelectedPerson(null);
                                        setHistory([]);
                                    }}
                                >
                                    <X size={16} />
                                    Close
                                </button>
                            )}
                        </div>
                    </div>

                    {!selectedPerson ? (
                        <div className="history-select-empty">
                            <History size={30} />
                            <h3>Select a person</h3>
                            <p>
                                Use the History button from the attendance table to view records.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="selected-person-card">
                                <div className="person-avatar large">
                                    {getInitials(selectedPerson.name)}
                                </div>
                                <div>
                                    <strong>{selectedPerson.name}</strong>
                                    <span>
                                        {selectedPerson.worker
                                            ? "Worker"
                                            : selectedPerson.employeeCode || "Employee"}
                                    </span>
                                </div>
                            </div>

                            {loadingHistory ? (
                                <div className="manual-attendance-loading compact">
                                    <Loader2
                                        size={20}
                                        className="spin"
                                    />
                                    Loading history...
                                </div>
                            ) : history.length === 0 ? (
                                <div className="history-select-empty compact-empty">
                                    <Clock3 size={25} />
                                    <p>No manual attendance history found.</p>
                                </div>
                            ) : (
                                <div className="history-table-wrap">
                                    <table className="history-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map(record => (
                                                <tr key={record.id}>
                                                    <td>
                                                        {formatDateForDisplay(
                                                            record.attendanceDate
                                                        )}
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={
                                                                `history-status ${getStatusClass(record.status)}`
                                                            }
                                                        >
                                                            {formatStatus(record.status)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="row-action edit"
                                                            onClick={() =>
                                                                setEditingAttendance({
                                                                    id: record.id,
                                                                    attendanceDate:
                                                                        record.attendanceDate,
                                                                    status:
                                                                        record.status
                                                                })
                                                            }
                                                        >
                                                            <Edit3 size={15} />
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>

            {showWorkerForm && (
                <div className="manual-attendance-modal-backdrop">
                    <div className="manual-attendance-modal">
                        <div className="manual-attendance-modal-header">
                            <div>
                                <h2>
                                    {editingWorker
                                        ? "Edit Worker"
                                        : "Add Worker"}
                                </h2>
                                <p>
                                    Workers added here automatically appear in Manual Attendance.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={closeWorkerForm}
                                disabled={savingWorker}
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleWorkerSubmit}>
                            <div className="worker-form-grid">
                                <div className="worker-form-group full">
                                    <label htmlFor="worker-name">
                                        Name <span>*</span>
                                    </label>
                                    <input
                                        id="worker-name"
                                        value={workerForm.name}
                                        onChange={event =>
                                            setWorkerForm(previous => ({
                                                ...previous,
                                                name: event.target.value
                                            }))
                                        }
                                        placeholder="Enter worker name"
                                        required
                                    />
                                </div>

                                <div className="worker-form-group">
                                    <label htmlFor="worker-mobile">
                                        Mobile
                                    </label>
                                    <input
                                        id="worker-mobile"
                                        value={workerForm.mobile}
                                        onChange={event =>
                                            setWorkerForm(previous => ({
                                                ...previous,
                                                mobile: event.target.value
                                            }))
                                        }
                                        placeholder="Mobile number"
                                    />
                                </div>

                                <div className="worker-form-group">
                                    <label htmlFor="worker-email">
                                        Email
                                    </label>
                                    <input
                                        id="worker-email"
                                        type="email"
                                        value={workerForm.email}
                                        onChange={event =>
                                            setWorkerForm(previous => ({
                                                ...previous,
                                                email: event.target.value
                                            }))
                                        }
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className="worker-form-group">
                                    <label htmlFor="worker-department">
                                        Department
                                    </label>
                                    <input
                                        id="worker-department"
                                        value={workerForm.department}
                                        onChange={event =>
                                            setWorkerForm(previous => ({
                                                ...previous,
                                                department: event.target.value
                                            }))
                                        }
                                        placeholder="Production / Packing / etc."
                                    />
                                </div>

                                <div className="worker-form-group full">
                                    <label htmlFor="worker-note">
                                        Note
                                    </label>
                                    <textarea
                                        id="worker-note"
                                        rows="3"
                                        value={workerForm.note}
                                        onChange={event =>
                                            setWorkerForm(previous => ({
                                                ...previous,
                                                note: event.target.value
                                            }))
                                        }
                                        placeholder="Optional note"
                                    />
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="manual-attendance-secondary-btn"
                                    onClick={closeWorkerForm}
                                    disabled={savingWorker}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="manual-attendance-primary-btn"
                                    disabled={savingWorker}
                                >
                                    {savingWorker ? (
                                        <>
                                            <Loader2
                                                size={17}
                                                className="spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={17} />
                                            {editingWorker
                                                ? "Update Worker"
                                                : "Add Worker"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingAttendance && (
                <div className="manual-attendance-modal-backdrop">
                    <div className="manual-attendance-modal small">
                        <div className="manual-attendance-modal-header">
                            <div>
                                <h2>Edit Attendance</h2>
                                <p>
                                    Change the saved attendance status.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setEditingAttendance(null)}
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <form onSubmit={handleAttendanceEditSave}>
                            <div className="edit-attendance-fields">
                                <div className="worker-form-group">
                                    <label htmlFor="edit-attendance-date">
                                        Date
                                    </label>
                                    <input
                                        id="edit-attendance-date"
                                        type="date"
                                        value={
                                            editingAttendance.attendanceDate ||
                                            ""
                                        }
                                        onChange={event =>
                                            setEditingAttendance(previous => ({
                                                ...previous,
                                                attendanceDate:
                                                    event.target.value
                                            }))
                                        }
                                        required
                                    />
                                </div>

                                <div className="worker-form-group">
                                    <label htmlFor="edit-attendance-status">
                                        Status
                                    </label>
                                    <select
                                        id="edit-attendance-status"
                                        value={
                                            editingAttendance.status ||
                                            ""
                                        }
                                        onChange={event =>
                                            setEditingAttendance(previous => ({
                                                ...previous,
                                                status: event.target.value
                                            }))
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Status
                                        </option>
                                        {STATUS_OPTIONS.map(status => (
                                            <option
                                                key={status.value}
                                                value={status.value}
                                            >
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="manual-attendance-secondary-btn"
                                    onClick={() => setEditingAttendance(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="manual-attendance-primary-btn"
                                    disabled={savingPerson.startsWith("history-")}
                                >
                                    {savingPerson.startsWith("history-") ? (
                                        <>
                                            <Loader2
                                                size={17}
                                                className="spin"
                                            />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={17} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


function getInitials(name) {
    const value = String(name || "").trim();

    if (!value) {
        return "?";
    }

    const parts = value.split(/\s+/).filter(Boolean);

    return parts.length === 1
        ? parts[0].substring(0, 2).toUpperCase()
        : `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}


function formatStatus(status) {
    return String(status || "")
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}


function getStatusClass(status) {
    return String(status || "")
        .toLowerCase()
        .replaceAll("_", "-");
}


function formatDateForDisplay(value) {
    if (!value) {
        return "-";
    }

    const [year, month, day] = String(value).split("-");

    if (!year || !month || !day) {
        return value;
    }

    return `${day}-${month}-${year}`;
}


export default ManualAttendance;
