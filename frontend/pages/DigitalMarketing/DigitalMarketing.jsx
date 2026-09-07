import { useEffect, useState } from "react";

import "./DigitalMarketing.css";

import DigitalMarketingService
    from "../../services/DigitalMarketingService";

import DigitalMarketingForm
    from "./DigitalMarketingForm";

import DigitalMarketingTable
    from "./DigitalMarketingTable";

import DepartmentTasks
    from "../../components/DepartmentTasks";


const DigitalMarketing = () => {

    const [
        projects,
        setProjects
    ] = useState([]);


    const [
        editingProject,
        setEditingProject
    ] = useState(null);


    /*
     ==========================================
     LOAD PROJECTS
     ==========================================
     */

    useEffect(() => {

        loadProjects();

    }, []);


    const loadProjects = async () => {

        try {

            const response =
                await DigitalMarketingService
                    .getAllProjects();


            setProjects(
                Array.isArray(
                    response?.data
                )
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Error loading digital marketing projects:",
                error
            );


            setProjects([]);

        }

    };


    /*
     ==========================================
     CREATE PROJECT
     ==========================================
     */

    const handleCreate = async (
        project
    ) => {

        try {

            await DigitalMarketingService
                .createProject(
                    project
                );


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Error creating digital marketing project:",
                error
            );

        }

    };


    /*
     ==========================================
     UPDATE PROJECT
     ==========================================
     */

    const handleUpdate = async (
        project
    ) => {

        try {

            await DigitalMarketingService
                .updateProject(
                    project.id,
                    project
                );


            setEditingProject(
                null
            );


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Error updating digital marketing project:",
                error
            );

        }

    };


    /*
     ==========================================
     DELETE PROJECT
     ==========================================
     */

    const handleDelete = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this project?"
            )
        ) {

            return;

        }


        try {

            await DigitalMarketingService
                .deleteProject(
                    id
                );


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Error deleting digital marketing project:",
                error
            );

        }

    };


    /*
     ==========================================
     UI
     ==========================================
     */

    return (

        <div className="digital-page">


            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <h2 className="page-title">

                Digital Marketing

            </h2>


            {/* =================================================
                DIGITAL MARKETING PROJECT FORM
            ================================================= */}

            <DigitalMarketingForm

                editingProject={
                    editingProject
                }

                onCreate={
                    handleCreate
                }

                onUpdate={
                    handleUpdate
                }

            />


            {/* =================================================
                DIGITAL MARKETING PROJECT TABLE
            ================================================= */}

            <DigitalMarketingTable

                projects={
                    projects
                }

                onEdit={
                    setEditingProject
                }

                onDelete={
                    handleDelete
                }

            />


            {/* =================================================
                ASSIGNED TASKS
            =================================================

                This section reads from the CENTRAL
                TASK MODULE.

                Only tasks where:

                    department = MARKETING

                will appear here.

                The task is NOT duplicated.

                "View Task" opens the same task record
                used by the main Task module.
            ================================================= */}

            <DepartmentTasks

                department="MARKETING"

                title="Assigned Digital Marketing Tasks"

            />

        </div>

    );

};


export default DigitalMarketing;