import {
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Activity,
    ArrowRight,
    BarChart3,
    Bell,
    Boxes,
    Briefcase,
    Building2,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    ClipboardList,
    Code2,
    FileText,
    FolderKanban,
    Globe,
    LayoutDashboard,
    ListTodo,
    Megaphone,
    Monitor,
    Palette,
    Plus,
    RefreshCw,
    Search,
    Settings,
    ShieldCheck,
    Sparkles,
    Tag,
    Truck,
    UserCog,
    Users,
    Clock3
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import DesigningService
    from "../../services/DesigningService";

import DigitalMarketingService
    from "../../services/DigitalMarketingService";

import webDevelopmentService
    from "../../services/WebDevelopmentService";

import {
    getTasks
} from "../../services/TaskService";

import "./Dashboard.css";




/*
============================================================
HELPERS
============================================================
*/

const normalizeRole = (value) => {

    return String(value || "")
        .replace(/^ROLE_/i, "")
        .trim()
        .toUpperCase();

};


const formatPosition = (value) => {

    const position = normalizeRole(value);

    const labels = {
        WEB_DEVELOPMENT: "Web Development",
        DESIGN: "Design",
        MARKETING: "Marketing",
        MRP_PRINTING: "MRP Printing",
        LABOUR: "Labour"
    };

    return labels[position] || position || "Employee";

};


const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    }

    if (hour < 17) {
        return "Good afternoon";
    }

    return "Good evening";

};


/*
============================================================
MODULE DEFINITIONS

These definitions intentionally follow the existing
role/position-based Sidebar access so the Home dashboard
shows the same modules that the user is already allowed
to see in the ERP navigation.
============================================================
*/

const createModule = (
    id,
    name,
    description,
    path,
    icon,
    category
) => ({

    id,
    name,
    description,
    path,
    icon,
    category

});


const getAttendanceModule = (isAdmin) => {

    return createModule(
        "attendance",
        "Attendance",
        isAdmin
            ? "Manage employee attendance"
            : "Check in and view attendance",
        isAdmin
            ? "/attendance/admin"
            : "/hr/attendance",
        <CalendarDays size={22} strokeWidth={2} />,
        "HR"
    );

};


const getAllModules = (isAdmin) => {

    return [

        createModule(
            "tasks",
            "Tasks",
            "Manage work and task assignments",
            "/tasks",
            <ListTodo size={22} strokeWidth={2} />,
            "Work"
        ),

        createModule(
            "job-openings",
            "Job Openings",
            "View and create current openings",
            "/openings",
            <Briefcase size={22} strokeWidth={2} />,
            "HR"
        ),

        createModule(
            "company",
            "Company",
            "Manage company information",
            "/company",
            <Building2 size={22} strokeWidth={2} />,
            "Management"
        ),

        createModule(
            "box-dimensions",
            "Box Dimensions",
            "Manage box dimension records",
            "/box-dimensions",
            <Boxes size={22} strokeWidth={2} />,
            "Design"
        ),

        createModule(
            "mrp",
            "MRP Master",
            "Manage MRP master information",
            "/mrp",
            <Tag size={22} strokeWidth={2} />,
            "Production"
        ),

        createModule(
            "production",
            "Production Plan",
            "Manage production planning",
            "/production",
            <Settings size={22} strokeWidth={2} />,
            "Production"
        ),

        createModule(
            "inventory",
            "Inventory",
            "Manage inventory and stock",
            "/inventory",
            <Boxes size={22} strokeWidth={2} />,
            "Inventory"
        ),

        createModule(
            "receiving-material",
            "Receiving Material",
            "Manage incoming materials",
            "/procurement/receiving-material",
            <Truck size={22} strokeWidth={2} />,
            "Procurement"
        ),

        createModule(
            "delivery",
            "Delivery",
            "Manage delivery records",
            "/sales/delivery",
            <Truck size={22} strokeWidth={2} />,
            "Sales"
        ),

        createModule(
            "vendor",
            "Vendor",
            "Manage vendors",
            "/procurement/vendors",
            <Users size={22} strokeWidth={2} />,
            "Procurement"
        ),

        createModule(
            "purchase-requisition",
            "Purchase Requisition",
            "Create and manage purchase requests",
            "/procurement/purchase-requisition",
            <FileText size={22} strokeWidth={2} />,
            "Procurement"
        ),

        createModule(
            "approval",
            "Approval",
            "Review and process approvals",
            "/approval",
            <CheckCircle2 size={22} strokeWidth={2} />,
            "Procurement"
        ),

        createModule(
            "purchase-order",
            "Purchase Order",
            "Manage purchase orders",
            "/procurement/purchase-order",
            <ClipboardList size={22} strokeWidth={2} />,
            "Procurement"
        ),

        createModule(
            "sales",
            "Sales",
            "Manage sales records",
            "/sales",
            <BarChart3 size={22} strokeWidth={2} />,
            "Sales"
        ),

        createModule(
            "users",
            "User Management",
            "Manage ERP users",
            "/users",
            <Users size={22} strokeWidth={2} />,
            "Administration"
        ),

        createModule(
            "sales-dashboard",
            "Sales Dashboard",
            "View sales insights",
            "/sales/dashboard",
            <BarChart3 size={22} strokeWidth={2} />,
            "Sales"
        ),

        createModule(
            "design-projects",
            "Design Projects",
            "Manage design projects",
            "/design/projects",
            <Palette size={22} strokeWidth={2} />,
            "Design"
        ),

        createModule(
            "design-dashboard",
            "Design Dashboard",
            "View design activity",
            "/design/dashboard",
            <Palette size={22} strokeWidth={2} />,
            "Design"
        ),

        createModule(
            "digital-marketing",
            "Digital Marketing",
            "Manage digital marketing work",
            "/digital/marketing",
            <Megaphone size={22} strokeWidth={2} />,
            "Marketing"
        ),

        createModule(
            "digital-dashboard",
            "Digital Dashboard",
            "View digital marketing insights",
            "/digital/dashboard",
            <Monitor size={22} strokeWidth={2} />,
            "Marketing"
        ),

        createModule(
            "web-development",
            "Web Development",
            "Manage web development work",
            "/web/development",
            <Globe size={22} strokeWidth={2} />,
            "Web"
        ),

        createModule(
            "web-dashboard",
            "Web Dashboard",
            "View web development activity",
            "/web/dashboard",
            <Globe size={22} strokeWidth={2} />,
            "Web"
        ),

        getAttendanceModule(isAdmin),

        createModule(
            "employee",
            "Employee",
            "Manage employee records",
            "/hr/employee",
            <UserCog size={22} strokeWidth={2} />,
            "HR"
        ),

        createModule(
            "notifications",
            "Notifications",
            "Review ERP notifications",
            "/notifications",
            <Bell size={22} strokeWidth={2} />,
            "Administration"
        )

    ];

};


const getAllowedModules = (user) => {

    if (!user) {
        return [];
    }

    const roles = Array.isArray(user.roles)
        ? user.roles
        : [];

    const normalizedRoles = roles
        .map((role) => {

            if (
                typeof role === "object"
                && role !== null
            ) {

                return normalizeRole(
                    role.name ||
                    role.role ||
                    ""
                );

            }

            return normalizeRole(role);

        })
        .filter(Boolean);


    const isAdmin =
        normalizeRole(user.role) === "ADMIN"
        ||
        normalizedRoles.includes("ADMIN");


    if (isAdmin) {
        return getAllModules(true);
    }


    const position =
        normalizeRole(user.position);


    const commonModules = {

        WEB_DEVELOPMENT: [

            createModule(
                "job-openings",
                "Job Openings",
                "View and create current openings",
                "/openings",
                <Briefcase size={22} strokeWidth={2} />,
                "HR"
            ),

            createModule(
                "web-development",
                "Web Development",
                "Manage web development work",
                "/web/development",
                <Globe size={22} strokeWidth={2} />,
                "Web"
            ),

            createModule(
                "web-dashboard",
                "Web Dashboard",
                "View web development activity",
                "/web/dashboard",
                <Globe size={22} strokeWidth={2} />,
                "Web"
            ),

            getAttendanceModule(false)

        ],

        DESIGN: [

            createModule(
                "job-openings",
                "Job Openings",
                "View and create current openings",
                "/openings",
                <Briefcase size={22} strokeWidth={2} />,
                "HR"
            ),

            createModule(
                "design-projects",
                "Design Projects",
                "Manage design projects",
                "/design/projects",
                <Palette size={22} strokeWidth={2} />,
                "Design"
            ),

            createModule(
                "design-dashboard",
                "Design Dashboard",
                "View design activity",
                "/design/dashboard",
                <Palette size={22} strokeWidth={2} />,
                "Design"
            ),

            createModule(
                "box-dimensions",
                "Box Dimensions",
                "Manage box dimension records",
                "/box-dimensions",
                <Boxes size={22} strokeWidth={2} />,
                "Design"
            ),

            getAttendanceModule(false)

        ],

        MARKETING: [

            createModule(
                "job-openings",
                "Job Openings",
                "View and create current openings",
                "/openings",
                <Briefcase size={22} strokeWidth={2} />,
                "HR"
            ),

            createModule(
                "digital-marketing",
                "Digital Marketing",
                "Manage digital marketing work",
                "/digital/marketing",
                <Megaphone size={22} strokeWidth={2} />,
                "Marketing"
            ),

            createModule(
                "digital-dashboard",
                "Digital Dashboard",
                "View digital marketing insights",
                "/digital/dashboard",
                <Monitor size={22} strokeWidth={2} />,
                "Marketing"
            ),

            getAttendanceModule(false)

        ],

        MRP_PRINTING: [

            createModule(
                "mrp",
                "MRP Master",
                "Manage MRP master information",
                "/mrp",
                <Tag size={22} strokeWidth={2} />,
                "Production"
            ),

            getAttendanceModule(false)

        ],

        LABOUR: [

            getAttendanceModule(false)

        ]

    };


    return commonModules[position] || [];

};


const getRecentModules = () => {

    try {

        const stored =
            localStorage.getItem(
                "poshan_recent_modules"
            );

        const parsed =
            stored
                ? JSON.parse(stored)
                : [];

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch (error) {

        return [];

    }

};


/*
============================================================
DASHBOARD
============================================================
*/




/*
============================================================
ADMIN-ONLY RECENT PROJECT HISTORY
============================================================

This history is intentionally scoped to the logged-in admin.
No employee/department dashboard uses or writes this data.
*/

const getAdminRecentProjectStorageKey = (user) => {

    const identifier =
        user?.id ||
        user?.username ||
        "admin";

    return `poshan_admin_recent_projects_${identifier}`;

};

const getAdminRecentProjectHistory = (user) => {

    if (!user) {
        return [];
    }

    try {

        const raw =
            localStorage.getItem(
                getAdminRecentProjectStorageKey(user)
            );

        const parsed = raw
            ? JSON.parse(raw)
            : [];

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch {

        return [];

    }

};

const rememberAdminRecentProject = (user, project) => {

    if (!user || !project) {
        return;
    }

    const current =
        getAdminRecentProjectHistory(user);

    const next = [
        {
            key: project.key,
            timestamp: Date.now()
        },
        ...current.filter(
            item => item?.key !== project.key
        )
    ].slice(0, 12);

    try {

        localStorage.setItem(
            getAdminRecentProjectStorageKey(user),
            JSON.stringify(next)
        );

    } catch {

        // Ignore browser storage errors.

    }

};




const PROJECT_CONFIG = {

    designing: {
        label: "Designing",
        icon: Palette,
        className: "designing",
        route: project =>
            "/design/projects"
    },

    digital: {
        label: "Digital Marketing",
        icon: Megaphone,
        className: "digital",
        route: project =>
            "/digital/marketing"
    },

    web: {
        label: "Web Development",
        icon: Code2,
        className: "web",
        route: project =>
            `/web/development/${project.id}`
    }

};


const normalizeProjects = (source, response) => {

    const rawProjects =
        source === "web"
            ? response
            : response?.data;

    const projects = Array.isArray(rawProjects)
        ? rawProjects
        : [];

    return projects.map(project => ({
        ...project,
        source,
        key: `${source}:${project.id}`,
        displayName:
            project.projectname ||
            project.projectName ||
            "Untitled Project",
        company:
            project.companyname ||
            project.companyName ||
            "",
        projectType:
            project.designtype ||
            project.projecttype ||
            project.type ||
            ""
    }));

};


const getProjectDate = project => {

    const candidates = [
        project.createdAt,
        project.created_at,
        project.createdDate,
        project.created_date,
        project.assigndate,
        project.assignDate
    ];

    for (const value of candidates) {

        if (!value) {
            continue;
        }

        const timestamp =
            new Date(value).getTime();

        if (!Number.isNaN(timestamp)) {
            return timestamp;
        }

    }

    return 0;

};


const sortProjectsByDateAndId = projects => {

    return [...projects].sort(
        (a, b) => {

            const dateDifference =
                getProjectDate(b) -
                getProjectDate(a);

            if (dateDifference !== 0) {
                return dateDifference;
            }

            return Number(b.id || 0) -
                Number(a.id || 0);

        }
    );

};


const formatDate = value => {

    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).format(date);

};


const formatTaskDate = value => {

    if (!value) {
        return "No date";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "No date";
    }

    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short"
        }
    ).format(date);

};



const AdminDashboard = () => {

    const navigate = useNavigate();

    const {
        user
    } = useAuth();

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);

    const [error, setError] = useState("");

    const [showAllProjects, setShowAllProjects] =
        useState(false);

    const [showNewProjectMenu, setShowNewProjectMenu] =
        useState(false);

    const [projectQuery, setProjectQuery] = useState("");


    const loadHomeData = useCallback(
        async ({ silent = false } = {}) => {

            try {

                if (silent) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }

                setError("");

                const [
                    designingResponse,
                    digitalResponse,
                    webResponse,
                    taskResponse
                ] = await Promise.all([
                    DesigningService.getAllProjects(),
                    DigitalMarketingService.getAllProjects(),
                    webDevelopmentService.getAll(),
                    getTasks()
                ]);

                const allProjects = [
                    ...normalizeProjects(
                        "designing",
                        designingResponse
                    ),
                    ...normalizeProjects(
                        "digital",
                        digitalResponse
                    ),
                    ...normalizeProjects(
                        "web",
                        webResponse
                    )
                ];

                setProjects(allProjects);

                setTasks(
                    Array.isArray(taskResponse)
                        ? taskResponse
                        : []
                );

            }
            catch (loadError) {

                console.error(
                    "Admin Dashboard Error:",
                    loadError
                );

                setError(
                    loadError?.response?.data?.message ||
                    loadError?.response?.data ||
                    "Some dashboard data could not be loaded."
                );

            }
            finally {

                setLoading(false);
                setRefreshing(false);

            }

        },
        []
    );


    useEffect(() => {

        loadHomeData();

    }, [loadHomeData]);


    const recentHistory = useMemo(
        () => getAdminRecentProjectHistory(user),
        [user, projects]
    );


    const projectByKey = useMemo(
        () => {

            const map = new Map();

            projects.forEach(project => {
                map.set(project.key, project);
            });

            return map;

        },
        [projects]
    );


    const recentProjects = useMemo(
        () => {

            const openedProjects = recentHistory
                .map(item => {
                    const project =
                        projectByKey.get(item.key);

                    if (!project) {
                        return null;
                    }

                    return {
                        ...project,
                        recentOpenedAt:
                            Number(item.timestamp) || 0
                    };
                })
                .filter(Boolean);

            const openedKeys = new Set(
                openedProjects.map(
                    project => project.key
                )
            );

            const recentlyAddedCandidates =
                sortProjectsByDateAndId(
                    projects
                );

            const merged = [
                ...openedProjects,
                ...recentlyAddedCandidates.filter(
                    project =>
                        !openedKeys.has(project.key)
                )
            ];

            return merged
                .sort(
                    (a, b) => {

                        const aOpen =
                            Number(
                                a.recentOpenedAt || 0
                            );

                        const bOpen =
                            Number(
                                b.recentOpenedAt || 0
                            );

                        if (
                            aOpen !== 0 ||
                            bOpen !== 0
                        ) {

                            return (
                                Math.max(
                                    bOpen,
                                    getProjectDate(b)
                                ) -
                                Math.max(
                                    aOpen,
                                    getProjectDate(a)
                                )
                            );

                        }

                        return (
                            getProjectDate(b) -
                            getProjectDate(a)
                        );

                    }
                )
                .slice(0, 6);

        },
        [recentHistory, projectByKey, projects]
    );


    const projectGroups = useMemo(
        () => ({

            all: sortProjectsByDateAndId(
                projects
            ),

            designing: sortProjectsByDateAndId(
                projects.filter(
                    project =>
                        project.source === "designing"
                )
            ),

            digital: sortProjectsByDateAndId(
                projects.filter(
                    project =>
                        project.source === "digital"
                )
            ),

            web: sortProjectsByDateAndId(
                projects.filter(
                    project =>
                        project.source === "web"
                )
            )

        }),
        [projects]
    );


    const filteredProjects = useMemo(
        () => {

            const query =
                projectQuery
                    .trim()
                    .toLowerCase();

            if (!query) {
                return projectGroups.all;
            }

            return projectGroups.all.filter(
                project =>
                    [
                        project.displayName,
                        project.company,
                        project.projectType,
                        PROJECT_CONFIG[
                            project.source
                        ]?.label
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase()
                        .includes(query)
            );

        },
        [projectGroups.all, projectQuery]
    );


    const visibleProjects = showAllProjects
        ? filteredProjects
        : filteredProjects.slice(0, 9);


    const recentTasks = useMemo(
        () => {

            return [...tasks]
                .sort(
                    (a, b) => {

                        const aDate =
                            new Date(
                                a.assignDate ||
                                a.assign_date ||
                                a.dueDate ||
                                a.due_date ||
                                0
                            ).getTime();

                        const bDate =
                            new Date(
                                b.assignDate ||
                                b.assign_date ||
                                b.dueDate ||
                                b.due_date ||
                                0
                            ).getTime();

                        if (
                            !Number.isNaN(bDate) &&
                            !Number.isNaN(aDate) &&
                            bDate !== aDate
                        ) {
                            return bDate - aDate;
                        }

                        return Number(b.id || 0) -
                            Number(a.id || 0);

                    }
                )
                .slice(0, 5);

        },
        [tasks]
    );


    const displayName =
        user?.name ||
        user?.username ||
        "Admin";


    const openProject = project => {

        rememberAdminRecentProject(user, project);

        const config =
            PROJECT_CONFIG[
                project.source
            ];

        if (!config) {
            return;
        }

        navigate(
            config.route(project)
        );

    };


    const openAllProjects = () => {

        setShowAllProjects(true);

        window.setTimeout(() => {

            document
                .querySelector(
                    ".admin-dashboard-projects"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        }, 50);

    };


    const renderProjectCard = project => {

        const config =
            PROJECT_CONFIG[
                project.source
            ] || {
                label: "Project",
                icon: FolderKanban,
                className: "default",
                route: () => "/dashboard"
            };

        const Icon = config.icon;

        return (

            <button
                key={project.key}
                type="button"
                className={`admin-project-card ${config.className}`}
                onClick={() =>
                    openProject(project)
                }
            >

                <span className="admin-project-card-icon">

                    <Icon size={22} />

                </span>

                <span className="admin-project-card-body">

                    <strong>
                        {project.displayName}
                    </strong>

                    <small>
                        {config.label}
                    </small>

                    {
                        project.company && (
                            <small className="admin-project-company">
                                {project.company}
                            </small>
                        )
                    }

                </span>

                <ChevronRight
                    size={18}
                    className="admin-project-card-arrow"
                />

            </button>

        );

    };


    if (loading) {

        return (

            <div className="admin-dashboard-page">

                <div className="admin-dashboard-loading">

                    <div className="admin-dashboard-loading-icon">
                        <Sparkles size={22} />
                    </div>

                    <strong>
                        Preparing your dashboard...
                    </strong>

                </div>

            </div>

        );

    }


    return (

        <div className="admin-dashboard-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="admin-dashboard-hero">

                <div>

                    <span className="admin-dashboard-eyebrow">
                        Poshan ERP
                    </span>

                    <h1>
                        {getGreeting()}, {displayName}
                    </h1>

                    <p>
                        Keep your projects and tasks moving from one place.
                    </p>

                </div>

                <div className="admin-dashboard-date">

                    <CalendarDays size={18} />

                    <span>
                        {formatDate(new Date())}
                    </span>

                </div>

            </section>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="admin-dashboard-error">

                    <span>{error}</span>

                    <button
                        type="button"
                        onClick={() =>
                            loadHomeData({ silent: true })
                        }
                    >
                        Try again
                    </button>

                </div>

            )}


            {/* =================================================
                RECENTS
            ================================================= */}

            <section className="admin-dashboard-section admin-dashboard-recents">

                <div className="admin-dashboard-section-heading">

                    <div>

                        <span className="admin-dashboard-section-kicker">
                            Recent work
                        </span>

                        <h2>
                            Recents
                        </h2>

                    </div>

                    <button
                        type="button"
                        className="admin-dashboard-refresh"
                        onClick={() =>
                            loadHomeData({ silent: true })
                        }
                        disabled={refreshing}
                    >

                        <RefreshCw
                            size={16}
                            className={
                                refreshing
                                    ? "spin"
                                    : ""
                            }
                        />

                        Refresh

                    </button>

                </div>

                {
                    recentProjects.length === 0

                        ? (

                            <div className="admin-dashboard-empty admin-dashboard-empty-horizontal">

                                <FolderKanban size={22} />

                                <div>
                                    <strong>
                                        No recent projects yet
                                    </strong>
                                    <p>
                                        Open a project or create a new one and it will appear here.
                                    </p>
                                </div>

                            </div>

                        )

                        : (

                            <div className="admin-dashboard-recents-grid">

                                {recentProjects.map(
                                    renderProjectCard
                                )}

                            </div>

                        )
                }

            </section>


            {/* =================================================
                PROJECTS
            ================================================= */}

            <section
                className="admin-dashboard-section admin-dashboard-projects"
            >

                <div className="admin-dashboard-section-heading">

                    <div>

                        <span className="admin-dashboard-section-kicker">
                            Workspace
                        </span>

                        <h2>
                            Projects
                        </h2>

                    </div>

                    <div className="admin-dashboard-heading-actions">

                        <div className="admin-dashboard-new-project-wrap">

                            <button
                                type="button"
                                className="admin-dashboard-primary-btn"
                                onClick={() =>
                                    setShowNewProjectMenu(
                                        previous => !previous
                                    )
                                }
                            >

                                <Plus size={17} />

                                New project

                                <ChevronDown size={16} />

                            </button>

                            {
                                showNewProjectMenu && (

                                    <div className="admin-dashboard-project-menu">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    "/design/projects"
                                                )
                                            }
                                        >
                                            <Palette size={18} />
                                            <span>
                                                Designing project
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    "/digital/marketing"
                                                )
                                            }
                                        >
                                            <Megaphone size={18} />
                                            <span>
                                                Digital Marketing project
                                            </span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    "/web/development/add"
                                                )
                                            }
                                        >
                                            <Code2 size={18} />
                                            <span>
                                                Web Development project
                                            </span>
                                        </button>

                                    </div>

                                )
                            }

                        </div>

                        <button
                            type="button"
                            className="admin-dashboard-link-btn"
                            onClick={() =>
                                setShowAllProjects(
                                    previous => !previous
                                )
                            }
                        >
                            {
                                showAllProjects
                                    ? "Show less"
                                    : "See all projects"
                            }
                            <ArrowRight size={16} />
                        </button>

                    </div>

                </div>


                <div className="admin-dashboard-project-toolbar">

                    <div className="admin-dashboard-search">

                        <Search size={17} />

                        <input
                            type="search"
                            value={projectQuery}
                            onChange={event =>
                                setProjectQuery(
                                    event.target.value
                                )
                            }
                            placeholder="Search projects"
                            aria-label="Search projects"
                        />

                    </div>

                    <span className="admin-dashboard-project-count">
                        {projects.length} project
                        {projects.length === 1 ? "" : "s"}
                    </span>

                </div>


                {
                    visibleProjects.length === 0

                        ? (

                            <div className="admin-dashboard-empty">

                                <FolderKanban size={38} />

                                <strong>
                                    No projects found
                                </strong>

                                <p>
                                    Create a project to start building your workspace.
                                </p>

                            </div>

                        )

                        : (

                            <div className="admin-dashboard-project-grid">

                                {visibleProjects.map(
                                    renderProjectCard
                                )}

                            </div>

                        )
                }

            </section>


            {/* =================================================
                TASKS
            ================================================= */}

            <section className="admin-dashboard-section admin-dashboard-tasks">

                <div className="admin-dashboard-section-heading">

                    <div>

                        <span className="admin-dashboard-section-kicker">
                            Work to track
                        </span>

                        <h2>
                            Tasks
                        </h2>

                    </div>

                    <button
                        type="button"
                        className="admin-dashboard-primary-btn"
                        onClick={() =>
                            navigate("/tasks/add")
                        }
                    >

                        <Plus size={17} />

                        Create task

                    </button>

                </div>


                <div className="admin-dashboard-task-heading-row">

                    <h3>
                        Recent tasks
                    </h3>

                    <button
                        type="button"
                        className="admin-dashboard-link-btn"
                        onClick={() =>
                            navigate("/tasks")
                        }
                    >
                        See all tasks
                        <ArrowRight size={16} />
                    </button>

                </div>


                {
                    recentTasks.length === 0

                        ? (

                            <div className="admin-dashboard-empty admin-dashboard-empty-horizontal">

                                <ListTodo size={24} />

                                <div>
                                    <strong>
                                        No recent tasks
                                    </strong>
                                    <p>
                                        Create a task and it will appear in this section.
                                    </p>
                                </div>

                            </div>

                        )

                        : (

                            <div className="admin-dashboard-task-list">

                                {
                                    recentTasks.map(task => (

                                        <button
                                            type="button"
                                            key={task.id}
                                            className="admin-dashboard-task-row"
                                            onClick={() =>
                                                navigate(
                                                    `/tasks/${task.id}`
                                                )
                                            }
                                        >

                                            <span className="admin-dashboard-task-icon">

                                                <ListTodo size={18} />

                                            </span>

                                            <span className="admin-dashboard-task-main">

                                                <strong>
                                                    {task.title || "Untitled Task"}
                                                </strong>

                                                <small>
                                                    {
                                                        task.department ||
                                                        "General"
                                                    }

                                                </small>

                                            </span>

                                            <span className="admin-dashboard-task-meta">

                                                <span
                                                    className={
                                                        `admin-task-status ${String(
                                                            task.status || ""
                                                        ).toLowerCase()}`
                                                    }
                                                >
                                                    {task.status || "PENDING"}
                                                </span>

                                                <small>
                                                    {formatTaskDate(
                                                        task.dueDate ||
                                                        task.due_date
                                                    )}
                                                </small>

                                            </span>

                                            <ChevronRight
                                                size={18}
                                                className="admin-dashboard-task-arrow"
                                            />

                                        </button>

                                    ))
                                }

                            </div>

                        )
                }

            </section>


            {/* =================================================
                QUICK NAVIGATION
            ================================================= */}

            <section className="admin-dashboard-quick-links">

                <div className="admin-dashboard-quick-link-intro">

                    <CheckCircle2 size={20} />

                    <div>
                        <strong>
                            Everything stays connected
                        </strong>
                        <span>
                            Use the existing ERP modules for the detailed work.
                        </span>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/tasks")
                    }
                >
                    Open task management
                    <ArrowRight size={16} />
                </button>

            </section>

        </div>

    );

};



const NonAdminDashboard = () => {

    const {
        user
    } = useAuth();


    const navigate =
        useNavigate();


    const [
        recentModuleIds,
        setRecentModuleIds
    ] = useState(
        getRecentModules
    );


    const allowedModules =
        useMemo(
            () =>
                getAllowedModules(user),
            [user]
        );


    const isAdmin =
        normalizeRole(user?.role) === "ADMIN"
        ||
        (Array.isArray(user?.roles)
            &&
            user.roles.some(
                role =>
                    normalizeRole(
                        typeof role === "object"
                            ? role?.name || role?.role
                            : role
                    ) === "ADMIN"
            )
        );


    const displayName =
        user?.name ||
        user?.username ||
        "User";


    const displayPosition =
        isAdmin
            ? "Administrator"
            : formatPosition(
                user?.position
            );


    const recentModules =
        recentModuleIds
            .map(
                id =>
                    allowedModules.find(
                        module =>
                            module.id === id
                    )
            )
            .filter(Boolean);


    const handleModuleOpen = (
        module
    ) => {

        const updatedIds = [

            module.id,

            ...recentModuleIds.filter(
                id =>
                    id !== module.id
            )

        ].slice(
            0,
            6
        );


        setRecentModuleIds(
            updatedIds
        );


        localStorage.setItem(
            "poshan_recent_modules",
            JSON.stringify(
                updatedIds
            )
        );


        navigate(
            module.path
        );

    };


    const handleOpenProfile = () => {

        navigate(
            "/profile"
        );

    };


    const handleOpenRecent = (
        module
    ) => {

        handleModuleOpen(
            module
        );

    };


    return (

        <div className="poshan-home">


            {/* =================================================
                HERO / GREETING
            ================================================= */}

            <section className="poshan-home-hero">

                <div className="poshan-home-hero-content">

                    <div className="poshan-home-eyebrow">

                        <Activity size={16} />

                        <span>
                            POSHAN ERP
                        </span>

                    </div>


                    <h1>

                        {getGreeting()}, {displayName}

                    </h1>


                    <p>

                        Here is your workspace.
                        Open the modules available
                        for your account and continue
                        where you left off.

                    </p>


                    <div className="poshan-home-user-meta">

                        <span className="poshan-home-role">

                            <ShieldCheck size={15} />

                            {displayPosition}

                        </span>


                        <span className="poshan-home-access">

                            {allowedModules.length} modules available

                        </span>

                    </div>

                </div>


                <div className="poshan-home-hero-side">

                    <div className="poshan-home-date-card">

                        <Clock3 size={19} />

                        <div>

                            <span>
                                Today
                            </span>

                            <strong>

                                {
                                    new Intl.DateTimeFormat(
                                        "en-IN",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    ).format(
                                        new Date()
                                    )
                                }

                            </strong>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="poshan-home-profile-btn"
                        onClick={
                            handleOpenProfile
                        }
                    >

                        View Profile

                        <ArrowRight
                            size={17}
                        />

                    </button>

                </div>

            </section>


            {/* =================================================
                RECENTLY OPENED
            ================================================= */}

            {
                recentModules.length > 0
                    ? (

                        <section className="poshan-home-section">

                            <div className="poshan-home-section-header">

                                <div>

                                    <span className="poshan-home-section-kicker">
                                        QUICK ACCESS
                                    </span>

                                    <h2>
                                        Recently opened
                                    </h2>

                                    <p>
                                        Pick up where you left off.
                                    </p>

                                </div>

                            </div>


                            <div className="poshan-home-recent-grid">

                                {
                                    recentModules.map(
                                        module => (

                                            <button
                                                type="button"
                                                className="poshan-home-recent-card"
                                                key={
                                                    module.id
                                                }
                                                onClick={() =>
                                                    handleOpenRecent(
                                                        module
                                                    )
                                                }
                                            >

                                                <span className="poshan-home-recent-icon">

                                                    {
                                                        module.icon
                                                    }

                                                </span>


                                                <span className="poshan-home-recent-text">

                                                    <strong>
                                                        {
                                                            module.name
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            module.category
                                                        }
                                                    </small>

                                                </span>


                                                <ArrowRight
                                                    size={17}
                                                />

                                            </button>

                                        )
                                    )
                                }

                            </div>

                        </section>

                    )
                    : null
            }


            {/* =================================================
                MODULES
            ================================================= */}

            <section className="poshan-home-section">

                <div className="poshan-home-section-header">

                    <div>

                        <span className="poshan-home-section-kicker">
                            YOUR WORKSPACE
                        </span>

                        <h2>
                            Modules
                        </h2>

                        <p>
                            Everything available to your
                            account is shown here.
                        </p>

                    </div>


                    <div className="poshan-home-module-count">

                        <strong>
                            {allowedModules.length}
                        </strong>

                        <span>
                            Available
                        </span>

                    </div>

                </div>


                {
                    allowedModules.length > 0
                        ? (

                            <div className="poshan-home-module-grid">

                                {
                                    allowedModules.map(
                                        module => (

                                            <button
                                                type="button"
                                                className={`poshan-home-module-card category-${String(
                                                    module.category
                                                )
                                                    .toLowerCase()
                                                    .replace(
                                                        /[^a-z0-9]+/g,
                                                        "-"
                                                    )}`}
                                                key={
                                                    module.id
                                                }
                                                onClick={() =>
                                                    handleModuleOpen(
                                                        module
                                                    )
                                                }
                                            >

                                                <span className="poshan-home-module-icon">

                                                    {
                                                        module.icon
                                                    }

                                                </span>


                                                <span className="poshan-home-module-body">

                                                    <strong>
                                                        {
                                                            module.name
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            module.description
                                                        }
                                                    </span>

                                                </span>


                                                <span className="poshan-home-module-arrow">

                                                    <ArrowRight
                                                        size={18}
                                                    />

                                                </span>

                                            </button>

                                        )
                                    )
                                }

                            </div>

                        )
                        : (

                            <div className="poshan-home-empty">

                                <div className="poshan-home-empty-icon">

                                    <LayoutDashboard
                                        size={28}
                                    />

                                </div>

                                <h3>
                                    No modules assigned
                                </h3>

                                <p>
                                    Your account does not currently
                                    have a position with any ERP
                                    modules assigned.
                                </p>

                            </div>

                        )
                }

            </section>


            {/* =================================================
                ACCESS SUMMARY
            ================================================= */}

            <section className="poshan-home-summary">

                <div className="poshan-home-summary-card">

                    <div className="poshan-home-summary-icon">

                        <ShieldCheck
                            size={22}
                        />

                    </div>


                    <div>

                        <span>
                            Your access
                        </span>

                        <strong>
                            {displayPosition}
                        </strong>

                    </div>

                </div>


                <div className="poshan-home-summary-card">

                    <div className="poshan-home-summary-icon">

                        <LayoutDashboard
                            size={22}
                        />

                    </div>


                    <div>

                        <span>
                            Workspace modules
                        </span>

                        <strong>
                            {allowedModules.length}
                        </strong>

                    </div>

                </div>


                <div className="poshan-home-summary-card">

                    <div className="poshan-home-summary-icon">

                        <Users
                            size={22}
                        />

                    </div>


                    <div>

                        <span>
                            Signed in as
                        </span>

                        <strong>
                            {user?.username || "-"}
                        </strong>

                    </div>

                </div>

            </section>

        </div>

    );

};




/*
============================================================
DASHBOARD ROUTING
============================================================

Only ADMIN receives the Asana-style Projects/Tasks Home.
Every non-admin user keeps the existing personalized
role/position dashboard unchanged.
============================================================
*/

const Dashboard = () => {

    const { user } = useAuth();

    const roles = Array.isArray(user?.roles)
        ? user.roles
        : [];

    const normalizedRoles = roles.map(
        role => {

            if (
                typeof role === "object" &&
                role !== null
            ) {

                return normalizeRole(
                    role.name ||
                    role.role ||
                    role.authority ||
                    ""
                );

            }

            return normalizeRole(role);

        }
    );

    const isAdmin =
        normalizeRole(user?.role) === "ADMIN" ||
        normalizedRoles.includes("ADMIN");

    if (isAdmin) {
        return <AdminDashboard />;
    }

    return <NonAdminDashboard />;

};

export default Dashboard;
