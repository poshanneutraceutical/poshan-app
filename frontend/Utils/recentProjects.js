/*
==================================================
ADMIN RECENT PROJECT TRACKER
==================================================

This helper is intentionally client-side.
It stores recent project opens/creations per logged-in
admin so other users do not inherit the admin's history.
*/

const STORAGE_PREFIX = "poshan_admin_recent_projects";

const getUserKey = (user) => {

    if (!user) {
        return "admin";
    }

    const rawKey =
        user.id ??
        user.userId ??
        user.username ??
        user.email ??
        user.name ??
        "admin";

    return String(rawKey)
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]/g, "_");

};

const getStorageKey = (user) =>
    `${STORAGE_PREFIX}:${getUserKey(user)}`;

const getRoleName = (user) => {

    if (!user) {
        return "";
    }

    if (typeof user.role === "string") {
        return user.role
            .replace("ROLE_", "")
            .toUpperCase();
    }

    if (Array.isArray(user.roles)) {

        const role = user.roles[0];

        if (typeof role === "string") {
            return role
                .replace("ROLE_", "")
                .toUpperCase();
        }

        if (
            role &&
            typeof role === "object" &&
            typeof role.name === "string"
        ) {
            return role.name
                .replace("ROLE_", "")
                .toUpperCase();
        }

    }

    if (Array.isArray(user.authorities)) {

        const authority = user.authorities[0];

        if (typeof authority === "string") {
            return authority
                .replace("ROLE_", "")
                .toUpperCase();
        }

        if (
            authority &&
            typeof authority === "object" &&
            typeof authority.authority === "string"
        ) {
            return authority.authority
                .replace("ROLE_", "")
                .toUpperCase();
        }

    }

    return "";

};

export const isAdminUser = (user) =>
    getRoleName(user) === "ADMIN";

export const rememberRecentProject = ({
    user,
    source,
    project
}) => {

    if (
        !isAdminUser(user) ||
        !source ||
        !project?.id
    ) {
        return;
    }

    const key = `${source}:${project.id}`;

    const item = {
        key,
        source,
        id: project.id,
        name:
            project.projectname ||
            project.projectName ||
            "Untitled Project",
        company:
            project.companyname ||
            project.companyName ||
            "",
        timestamp: Date.now()
    };

    let existing = [];

    try {
        const stored = localStorage.getItem(
            getStorageKey(user)
        );

        const parsed = stored
            ? JSON.parse(stored)
            : [];

        existing = Array.isArray(parsed)
            ? parsed
            : [];

    } catch {
        existing = [];
    }

    const updated = [
        item,
        ...existing.filter(
            entry => entry?.key !== key
        )
    ].slice(0, 20);

    try {
        localStorage.setItem(
            getStorageKey(user),
            JSON.stringify(updated)
        );
    } catch {
        // Ignore localStorage errors so the ERP flow is unaffected.
    }

};

export const getRecentProjectHistory = (user) => {

    if (!isAdminUser(user)) {
        return [];
    }

    try {

        const stored = localStorage.getItem(
            getStorageKey(user)
        );

        const parsed = stored
            ? JSON.parse(stored)
            : [];

        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch {
        return [];
    }

};

export default {
    isAdminUser,
    rememberRecentProject,
    getRecentProjectHistory
};
