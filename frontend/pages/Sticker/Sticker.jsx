import {
    useEffect,
    useState
} from "react";

import {
    Eye,
    ImagePlus,
    Trash2,
    Upload,
    X
} from "lucide-react";

import StickerService, {
    resolveStickerImageUrl
} from "../../services/StickerService";

import "./Sticker.css";

const EMPTY_FORM = {
    weight: "",
    stickerCount: "",
    note: ""
};

const formatDateTime = (value) => {

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
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    ).format(date);
};

export default function Sticker() {

    const [form, setForm] =
        useState(EMPTY_FORM);

    const [selectedFiles, setSelectedFiles] =
        useState([]);

    const [previews, setPreviews] =
        useState([]);

    const [stickers, setStickers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [viewerSticker, setViewerSticker] =
        useState(null);

    const [viewerIndex, setViewerIndex] =
        useState(0);

    const loadStickers = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await StickerService.getAllStickers();

            setStickers(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (loadError) {

            console.error(
                "Sticker Load Error:",
                loadError
            );

            setError(
                loadError?.response?.data?.message
                ||
                loadError?.response?.data
                ||
                "Unable to load sticker records."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStickers();
    }, []);

    useEffect(() => {

        return () => {

            previews.forEach(
                preview =>
                    URL.revokeObjectURL(
                        preview.url
                    )
            );
        };

    }, [previews]);

    const handleInputChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(
            previous => ({
                ...previous,
                [name]: value
            })
        );
    };

    const rebuildPreviews = (files) => {

        setPreviews(
            files.map(
                file => ({
                    file,
                    url: URL.createObjectURL(file)
                })
            )
        );
    };

    const handleImageChange = (event) => {

        const files =
            Array.from(
                event.target.files || []
            ).filter(
                file =>
                    file.type.startsWith("image/")
            );

        if (files.length === 0) {
            return;
        }

        setError("");
        setSuccess("");

        const nextFiles = [
            ...selectedFiles,
            ...files
        ];

        setSelectedFiles(nextFiles);
        rebuildPreviews(nextFiles);

        event.target.value = "";
    };

    const removeSelectedFile = (index) => {

        const nextFiles =
            selectedFiles.filter(
                (_, fileIndex) =>
                    fileIndex !== index
            );

        setSelectedFiles(nextFiles);
        rebuildPreviews(nextFiles);
    };

    const resetForm = () => {

        setForm(EMPTY_FORM);
        setSelectedFiles([]);
        setPreviews([]);
    };

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this sticker record? The saved sticker images will also be deleted."
            );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await StickerService.deleteSticker(id);

            if (viewerSticker?.id === id) {
                closeViewer();
            }

            setSuccess(
                "Sticker record deleted successfully."
            );

            await loadStickers();

        } catch (deleteError) {

            console.error(
                "Sticker Delete Error:",
                deleteError
            );

            setError(
                deleteError?.response?.data?.message
                ||
                deleteError?.response?.data
                ||
                "Unable to delete sticker record."
            );
        }
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (selectedFiles.length < 1) {
            setError(
                "Please select at least 1 image."
            );
            return;
        }

        if (!form.weight.trim()) {
            setError(
                "Please enter the weight."
            );
            return;
        }

        const count =
            Number(form.stickerCount);

        if (
            !Number.isInteger(count)
            || count <= 0
        ) {
            setError(
                "Please enter a valid number of stickers to print."
            );
            return;
        }

        try {

            setSaving(true);

            const formData =
                new FormData();

            formData.append(
                "weight",
                form.weight.trim()
            );

            formData.append(
                "stickerCount",
                String(count)
            );

            formData.append(
                "note",
                form.note.trim()
            );

            selectedFiles.forEach(file => {
                formData.append(
                    "images",
                    file
                );
            });

            await StickerService.createSticker(
                formData
            );

            resetForm();

            setSuccess(
                "Sticker record saved successfully."
            );

            await loadStickers();

        } catch (saveError) {

            console.error(
                "Sticker Save Error:",
                saveError
            );

            setError(
                saveError?.response?.data?.message
                ||
                saveError?.response?.data
                ||
                "Unable to save sticker record."
            );

        } finally {
            setSaving(false);
        }
    };

    const openViewer = (sticker) => {

        setViewerSticker(sticker);
        setViewerIndex(0);
    };

    const closeViewer = () => {

        setViewerSticker(null);
        setViewerIndex(0);
    };

    return (

        <div className="sticker-page">

            <section className="sticker-page-header">

                <div>

                    <span className="sticker-eyebrow">
                        POSHAN ERP
                    </span>

                    <h1>
                        Sticker
                    </h1>

                    <p>
                        Upload sticker references,
                        store print quantity and
                        keep notes together.
                    </p>

                </div>

                <div className="sticker-header-icon">
                    <ImagePlus size={26} />
                </div>

            </section>

            {error && (
                <div className="sticker-alert sticker-alert-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="sticker-alert sticker-alert-success">
                    {success}
                </div>
            )}

            <section className="sticker-card">

                <div className="sticker-card-heading">

                    <div>
                        <span className="sticker-section-kicker">
                            NEW RECORD
                        </span>

                        <h2>
                            Add Sticker
                        </h2>
                    </div>

                    <span className="sticker-image-rule">
                        One or more images
                    </span>

                </div>

                <form
                    className="sticker-form"
                    onSubmit={handleSubmit}
                >

                    <div className="sticker-form-grid">

                        <label className="sticker-field">
                            <span>Weight</span>

                            <input
                                type="text"
                                name="weight"
                                value={form.weight}
                                onChange={handleInputChange}
                                placeholder="e.g. 100g"
                                required
                            />
                        </label>

                        <label className="sticker-field">

                            <span>
                                Number of Stickers to Print
                            </span>

                            <input
                                type="number"
                                name="stickerCount"
                                min="1"
                                step="1"
                                value={form.stickerCount}
                                onChange={handleInputChange}
                                placeholder="e.g. 500"
                                required
                            />

                        </label>

                    </div>

                    <label className="sticker-field">

                        <span>Note</span>

                        <textarea
                            name="note"
                            value={form.note}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Add any printing note..."
                        />

                    </label>

                    <div className="sticker-upload-section">

                        <div className="sticker-upload-heading">

                            <div>
                                <strong>
                                    Sticker Images
                                </strong>

                                <span>
                                    Upload one or more images.
                                    They are previewed immediately.
                                </span>
                            </div>

                            <label className="sticker-upload-button">

                                <Upload size={17} />

                                <span>
                                    Add Images
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />

                            </label>

                        </div>

                        {previews.length > 0 ? (

                            <div className="sticker-preview-grid">

                                {previews.map(
                                    (preview, index) => (

                                        <div
                                            className="sticker-preview-card"
                                            key={`${preview.file.name}-${index}`}
                                        >

                                            <img
                                                src={preview.url}
                                                alt={`Sticker preview ${index + 1}`}
                                            />

                                            <div className="sticker-preview-meta">

                                                <span>
                                                    {preview.file.name}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSelectedFile(index)
                                                    }
                                                    title="Remove image"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        ) : (

                            <label className="sticker-upload-dropzone">

                                <ImagePlus size={34} />

                                <strong>
                                    Select sticker images
                                </strong>

                                <span>
                                    You can select one or more images at once.
                                </span>

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />

                            </label>
                        )}

                    </div>

                    <div className="sticker-form-actions">

                        <button
                            type="button"
                            className="sticker-reset-button"
                            onClick={resetForm}
                            disabled={saving}
                        >
                            Clear
                        </button>

                        <button
                            type="submit"
                            className="sticker-save-button"
                            disabled={
                                saving
                                || selectedFiles.length < 1
                            }
                        >

                            <Upload size={15} />

                            {saving
                                ? "Saving..."
                                : "Save Sticker"
                            }

                        </button>

                    </div>

                </form>

            </section>

            <section className="sticker-card">

                <div className="sticker-card-heading">

                    <div>

                        <span className="sticker-section-kicker">
                            SAVED RECORDS
                        </span>

                        <h2>
                            Sticker Records
                        </h2>

                    </div>

                    <span className="sticker-record-count">
                        {stickers.length} records
                    </span>

                </div>

                {loading ? (

                    <div className="sticker-empty-state">
                        Loading sticker records...
                    </div>

                ) : stickers.length === 0 ? (

                    <div className="sticker-empty-state">
                        No sticker records yet.
                    </div>

                ) : (

                    <div className="sticker-table-wrapper">

                        <table className="sticker-table">

                            <thead>
                                <tr>
                                    <th>Images</th>
                                    <th>Weight</th>
                                    <th>Stickers to Print</th>
                                    <th>Note</th>
                                    <th>Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {stickers.map(
                                    sticker => (

                                        <tr key={sticker.id}>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="sticker-image-strip"
                                                    onClick={() =>
                                                        openViewer(sticker)
                                                    }
                                                    title="View images"
                                                >

                                                    {(sticker.imageUrls || [])
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                imageUrl,
                                                                index
                                                            ) => (

                                                                <img
                                                                    key={`${imageUrl}-${index}`}
                                                                    src={resolveStickerImageUrl(imageUrl)}
                                                                    alt={`Sticker ${index + 1}`}
                                                                />
                                                            )
                                                        )}

                                                    {(sticker.imageUrls || [])
                                                        .length > 2 && (
                                                        <span>
                                                            +{
                                                                sticker.imageUrls.length - 2
                                                            }
                                                        </span>
                                                    )}

                                                </button>

                                            </td>

                                            <td>
                                                <strong>
                                                    {sticker.weight}
                                                </strong>
                                            </td>

                                            <td>
                                                {sticker.stickerCount}
                                            </td>

                                            <td className="sticker-note-cell">
                                                {sticker.note || "-"}
                                            </td>

                                            <td>
                                                {formatDateTime(
                                                    sticker.createdAt
                                                )}
                                            </td>

                                            <td>

                                                <div className="sticker-action-buttons">

                                                    <button
                                                        type="button"
                                                        className="sticker-view-button"
                                                        onClick={() =>
                                                            openViewer(sticker)
                                                        }
                                                    >

                                                        <Eye size={16} />
                                                        View Images

                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="sticker-delete-button"
                                                        onClick={() =>
                                                            handleDelete(sticker.id)
                                                        }
                                                        title="Delete sticker record"
                                                    >

                                                        <Trash2 size={16} />
                                                        Delete

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            </section>

            {viewerSticker && (

                <div
                    className="sticker-viewer-backdrop"
                    onClick={closeViewer}
                >

                    <div
                        className="sticker-viewer"
                        onClick={event =>
                            event.stopPropagation()
                        }
                    >

                        <div className="sticker-viewer-header">

                            <div>

                                <span>
                                    Sticker Images
                                </span>

                                <strong>
                                    {viewerSticker.weight}
                                    {" · "}
                                    {viewerSticker.stickerCount}
                                    {" stickers"}
                                </strong>

                            </div>

                            <button
                                type="button"
                                onClick={closeViewer}
                                title="Close"
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="sticker-viewer-main">

                            <img
                                src={resolveStickerImageUrl(
                                    viewerSticker.imageUrls[
                                        viewerIndex
                                    ]
                                )}
                                alt={`Sticker ${viewerIndex + 1}`}
                            />

                        </div>

                        <div className="sticker-viewer-thumbnails">

                            {(viewerSticker.imageUrls || [])
                                .map(
                                    (
                                        imageUrl,
                                        index
                                    ) => (

                                        <button
                                            type="button"
                                            key={`${imageUrl}-${index}`}
                                            className={
                                                viewerIndex === index
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setViewerIndex(index)
                                            }
                                        >

                                            <img
                                                src={resolveStickerImageUrl(
                                                    imageUrl
                                                )}
                                                alt={`Thumbnail ${index + 1}`}
                                            />

                                        </button>
                                    )
                                )}

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}
