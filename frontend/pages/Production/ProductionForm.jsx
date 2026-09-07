import React, { useEffect, useState } from "react";
import ProductionService from "../../services/ProductionService";
import "./Production.css";

const BOX_TYPES = [
    "BOX_2KG",
    "PET_JAR_5_LBS_R",
    "PET_JAR_5_LBS_BS",
    "PET_JAR_2_LBS_J",
    "PET_1100ML_JAR",
    "PET_88MM_850ML_JAR",
    "PET_JAR_5_LBS_M",
    "PET_JAR_2_LBS_B",
    "PLASTIC_535ML_L_CART_BOTTLE",
    "I_SEAL_372MM_HDPE_ONE",
    "PLASTIC_325ML_CYLINDRICAL_JAR_WO_CAP",
    "PLASTIC_MET_60MM_GOLDEN_CAP",
    "PET_275CC_R_TAB_JAR_WITH_PEAL_CAP",
    "I_SEAL_877MM_PET_ONE",
    "PLASTIC_55_KGS_JAR_300",
    "I_SEAL_118MM_PET_ONE",
    "I_SEAL_118MM_HDPE_ONE",
    "I_SEAL_436MM_PET_ONE",
    "PET_46_240ML_SQ_TAB_JAR_H_LOCK",
    "PLASTIC_6_KG_JAR",
    "PLASTIC_275_KG_JAR",
    "PLASTIC_12_KG_JAR_SQ_520",
    "PLASTIC_6_KG_JAR_WO_CAP",
    "PLASTIC_275_KG_JAR_WO_CAP",
    "PLASTIC_88MM_975ML_JAR_WO_CAP",
    "PLASTIC_88MM_700ML_HDPE_JAR_WO_CAP",
    "PLASTIC_MET_120MM_GOLDEN_CAP",
    "PLASTIC_MET_88MM_GOLDEN_CAP",
    "PLASTIC_88MM_975ML_JAR"
];

const formatBoxType = (value) =>
    value
        ? value.replaceAll("_", " ").replace(/\s+/g, " ").trim()
        : "";

const ProductionForm = ({ plan, onClose }) => {

    const [formData, setFormData] = useState({
        plandate: plan?.plandate || "",
        tittle: plan?.tittle || "",
        description: plan?.description || "",
        assignby: plan?.assignby || "",
        executedate: plan?.executedate || "",
        status: plan?.status || "IN_PROGRESS",
        scoope: plan?.scoope || "",
        boxtype: plan?.boxtype || "",
        weight: plan?.weight || "",
        neckseal: plan?.neckseal || "",
        companyname: plan?.companyname || "",
        necksealtype: plan?.necksealtype || ""
    });

    const [customBoxType, setCustomBoxType] = useState(false);

    const statusList = [
        "PENDING",
        "IN_PROGRESS",
        "COMPLETE",
        "ON_HOLD",
        "CANCEL"
    ];

    useEffect(() => {
        setCustomBoxType(
            Boolean(
                plan?.boxtype &&
                !BOX_TYPES.includes(plan.boxtype)
            )
        );
    }, [plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleBoxTypeChange = (e) => {
        const value = e.target.value;

        if (value === "__CUSTOM__") {
            setCustomBoxType(true);

            setFormData((previous) => ({
                ...previous,
                boxtype: ""
            }));

            return;
        }

        setCustomBoxType(false);

        setFormData((previous) => ({
            ...previous,
            boxtype: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.boxtype?.trim()) {
            alert("Please select or enter Box Type.");
            return;
        }

        try {
            if (plan) {
                await ProductionService.updatePlan(
                    plan.id,
                    formData
                );
            } else {
                await ProductionService.createPlan(
                    formData
                );
            }

            onClose();

        } catch (error) {
            console.error(
                "Production plan save failed",
                error
            );

            alert(
                error.response?.data?.message ||
                error.response?.data ||
                "Production plan save failed."
            );
        }
    };

    return (
        <div className="production-form-container">

            <h3>
                {plan
                    ? "Update Production Plan"
                    : "Create Production Plan"}
            </h3>

            <form onSubmit={handleSubmit}>

                {/* Production Information */}

                <h4 className="production-section-title">
                    Production Information
                </h4>

                <input
                    type="text"
                    name="plandate"
                    placeholder="Plan Date"
                    value={formData.plandate}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="tittle"
                    placeholder="Production Title"
                    value={formData.tittle}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="assignby"
                    placeholder="Assigned By"
                    value={formData.assignby}
                    onChange={handleChange}
                />

                {/* Product Details */}

                <h4 className="production-section-title">
                    Product Details
                </h4>

                <div className="production-form-grid">

                    <div>
                        <label>Scope</label>

                        <input
                            type="text"
                            name="scoope"
                            placeholder="Enter Scope"
                            value={formData.scoope}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Box Type</label>

                        <select
                            value={
                                customBoxType
                                    ? "__CUSTOM__"
                                    : formData.boxtype
                            }
                            onChange={handleBoxTypeChange}
                        >
                            <option value="">
                                Select Box Type
                            </option>

                            {BOX_TYPES.map((box) => (
                                <option
                                    key={box}
                                    value={box}
                                >
                                    {formatBoxType(box)}
                                </option>
                            ))}

                            <option value="__CUSTOM__">
                                Other / Custom
                            </option>
                        </select>

                        {customBoxType && (
                            <input
                                type="text"
                                name="boxtype"
                                placeholder="Enter custom box type"
                                value={formData.boxtype}
                                onChange={handleChange}
                                style={{ marginTop: "10px" }}
                                required
                            />
                        )}
                    </div>

                    <div>
                        <label>Weight</label>

                        <input
                            type="text"
                            name="weight"
                            placeholder="Enter Weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Neck Seal</label>

                        <input
                            type="text"
                            name="neckseal"
                            placeholder="Enter Neck Seal"
                            value={formData.neckseal}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Company Name</label>

                        <input
                            type="text"
                            name="companyname"
                            placeholder="Enter Company Name"
                            value={formData.companyname}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Neck Seal Type</label>

                        <input
                            type="text"
                            name="necksealtype"
                            placeholder="Enter Neck Seal Type"
                            value={formData.necksealtype}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                {/* Execution Information */}

                <h4 className="production-section-title">
                    Execution Information
                </h4>

                <label>Execute Date</label>

                <input
                    type="datetime-local"
                    name="executedate"
                    value={
                        formData.executedate
                            ? formData.executedate.substring(0, 16)
                            : ""
                    }
                    onChange={handleChange}
                />

                <label>Status</label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    {statusList.map((status) => (
                        <option
                            key={status}
                            value={status}
                        >
                            {status}
                        </option>
                    ))}
                </select>

                {/* Actions */}

                <div className="form-buttons">

                    <button
                        type="submit"
                        className="save-btn"
                    >
                        {plan ? "Update" : "Save"}
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    );
};

export default ProductionForm;