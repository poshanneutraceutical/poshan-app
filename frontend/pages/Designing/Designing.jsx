import { useEffect, useState } from "react";

import DesigningService from "../../services/DesigningService";

import DesigningForm from "./DesigningForm";
import DesigningTable from "./DesigningTable";

import DepartmentTasks from "../../components/DepartmentTasks";

import "./Designing.css";


const Designing = () => {

    const [
        projects,
        setProjects
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        showForm,
        setShowForm
    ] = useState(false);


    const [
        selectedProject,
        setSelectedProject
    ] = useState(null);


    /*
     ==========================================
     LOAD DESIGN PROJECTS
     ==========================================
     */

    useEffect(() => {

        loadProjects();

    }, []);


    const loadProjects = async () => {

        try {

            setLoading(true);


            const response =
                await DesigningService.getAllProjects();


            setProjects(

                Array.isArray(response?.data)

                    ? response.data

                    : []

            );

        }
        catch (error) {

            console.error(
                "Error loading design projects:",
                error
            );


            setProjects([]);

        }
        finally {

            setLoading(false);

        }

    };


    /*
     ==========================================
     ADD PROJECT
     ==========================================
     */

    const handleAdd = () => {

        setSelectedProject(null);

        setShowForm(true);

    };


    /*
     ==========================================
     EDIT PROJECT
     ==========================================
     */

    const handleEdit = (
        project
    ) => {

        setSelectedProject(
            project
        );

        setShowForm(true);

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
                "Delete this design project?"
            )
        ) {

            return;

        }


        try {

            await DesigningService
                .deleteProject(
                    id
                );


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Error deleting design project:",
                error
            );

        }

    };


    /*
     ==========================================
     SAVE PROJECT
     ==========================================
     */

    const handleSave = async (
        project
    ) => {

        try {

            if (
                selectedProject
            ) {

                await DesigningService
                    .updateProject(
                        selectedProject.id,
                        project
                    );

            }

            else {

                await DesigningService
                    .createProject(
                        project
                    );

            }


            setShowForm(
                false
            );


            setSelectedProject(
                null
            );


            await loadProjects();

        }
        catch (error) {

            console.error(
                "Error saving design project:",
                error
            );

        }

    };


    /*
     ==========================================
     CANCEL FORM
     ==========================================
     */

    const handleCancel = () => {

        setShowForm(
            false
        );


        setSelectedProject(
            null
        );

    };


    /*
     ==========================================
     UI
     ==========================================
     */

    return (

        <div className="designing-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div>

                    <h1>
                        Designing Projects
                    </h1>


                    <p>
                        Manage all designing projects
                    </p>

                </div>


                <button
                    type="button"
                    className="add-btn"
                    onClick={
                        handleAdd
                    }
                >

                    + Add Project

                </button>

            </div>


            {/* =================================================
                DESIGN PROJECT FORM
            ================================================= */}

            {
                showForm && (

                    <DesigningForm

                        project={
                            selectedProject
                        }

                        onSave={
                            handleSave
                        }

                        onCancel={
                            handleCancel
                        }

                    />

                )
            }


            {/* =================================================
                DESIGN PROJECT TABLE
            ================================================= */}

            <DesigningTable

                projects={
                    projects
                }

                loading={
                    loading
                }

                onEdit={
                    handleEdit
                }

                onDelete={
                    handleDelete
                }

            />


            {/* =================================================
                ASSIGNED TASKS
                =================================================

                This reads from the CENTRAL TASK MODULE.

                Only tasks where:

                    department = DESIGN

                will appear here.

                Clicking "View Task" opens the same
                task record from the main Task module.
            ================================================= */}

            <DepartmentTasks

                department="DESIGN"

                title="Assigned Designing Tasks"

            />

        </div>

    );

};


export default Designing;