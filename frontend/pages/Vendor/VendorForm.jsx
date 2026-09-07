import { useEffect, useState } from "react";
import {
    Save,
    ArrowLeft,
    UserRound,
    Building2,
    Mail,
    Phone,
    MessageCircle,
    Tag,
    MapPin
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import VendorService from "../../services/VendorService";


const VendorForm = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);


    const [form, setForm] = useState({

        vendorName: "",

        vendorCompanyName: "",

        vendorEmail: "",

        contactNumber: "",

        whatsappNumber: "",

        category: "",

        address: ""

    });


    /* =====================================================
       LOAD VENDOR
    ===================================================== */

    useEffect(() => {

        if (isEdit) {

            loadVendor();

        }

    }, [id]);


    const loadVendor = async () => {

        try {

            setLoading(true);

            const data =
                await VendorService.getById(id);

            setForm({

                vendorName:
                    data.vendorName || "",

                vendorCompanyName:
                    data.vendorCompanyName || "",

                vendorEmail:
                    data.vendorEmail || "",

                contactNumber:
                    data.contactNumber || "",

                whatsappNumber:
                    data.whatsappNumber || "",

                category:
                    data.category || "",

                address:
                    data.address || ""

            });

        }
        catch (error) {

            console.error(error);

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       INPUT CHANGE
    ===================================================== */

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({

            ...previous,

            [name]: value

        }));

    };


    /* =====================================================
       SUBMIT
    ===================================================== */

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setLoading(true);

            if (isEdit) {

                await VendorService.update(
                    id,
                    form
                );

            }
            else {

                await VendorService.create(
                    form
                );

            }

            navigate("/procurement/vendors");

        }
        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to save vendor."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="vendor-form-container">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="vendor-form-header">

                <div className="vendor-form-title">

                    <div className="vendor-form-title-icon">

                        <Building2 size={22} />

                    </div>

                    <div>

                        <h1>

                            {

                                isEdit

                                    ?

                                    "Edit Vendor"

                                    :

                                    "Create Vendor"

                            }

                        </h1>

                        <p>
                            Vendor Information
                        </p>

                    </div>

                </div>


                <Link
                    to="/procurement/vendors"
                    className="back-btn"
                >

                    <ArrowLeft size={17} />

                    Back

                </Link>

            </div>


            {/* =================================================
                FORM CARD
            ================================================= */}

            <form
                onSubmit={handleSubmit}
                className="vendor-form-card"
            >


                {/* =================================================
                    FORM SECTION HEADER
                ================================================= */}

                <div className="vendor-form-section-header">

                    <div className="vendor-form-section-icon">

                        <UserRound size={18} />

                    </div>

                    <div>

                        <h2>
                            Vendor Details
                        </h2>

                        <p>
                            Enter the vendor's basic information
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FORM GRID
                ================================================= */}

                <div className="vendor-form-grid">


                    {/* VENDOR NAME */}

                    <div className="vendor-form-group">

                        <label htmlFor="vendorName">

                            Vendor Name

                            <span>
                                *
                            </span>

                        </label>

                        <div className="vendor-input-wrapper">

                            <UserRound size={17} />

                            <input
                                id="vendorName"
                                name="vendorName"
                                value={form.vendorName}
                                onChange={handleChange}
                                placeholder="Enter vendor name"
                                required
                            />

                        </div>

                    </div>


                    {/* COMPANY */}

                    <div className="vendor-form-group">

                        <label htmlFor="vendorCompanyName">

                            Company Name

                            <span>
                                *
                            </span>

                        </label>

                        <div className="vendor-input-wrapper">

                            <Building2 size={17} />

                            <input
                                id="vendorCompanyName"
                                name="vendorCompanyName"
                                value={form.vendorCompanyName}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                required
                            />

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="vendor-form-group">

                        <label htmlFor="vendorEmail">

                            Vendor Email

                            <span>
                                *
                            </span>

                        </label>

                        <div className="vendor-input-wrapper">

                            <Mail size={17} />

                            <input
                                id="vendorEmail"
                                type="email"
                                name="vendorEmail"
                                value={form.vendorEmail}
                                onChange={handleChange}
                                placeholder="Enter vendor email"
                                required
                            />

                        </div>

                    </div>


                    {/* CONTACT */}

                    <div className="vendor-form-group">

                        <label htmlFor="contactNumber">

                            Contact Number

                            <span>
                                *
                            </span>

                        </label>

                        <div className="vendor-input-wrapper">

                            <Phone size={17} />

                            <input
                                id="contactNumber"
                                name="contactNumber"
                                value={form.contactNumber}
                                onChange={handleChange}
                                placeholder="Enter contact number"
                                required
                            />

                        </div>

                    </div>


                    {/* WHATSAPP */}

                    <div className="vendor-form-group">

                        <label htmlFor="whatsappNumber">

                            WhatsApp Number

                        </label>

                        <div className="vendor-input-wrapper">

                            <MessageCircle size={17} />

                            <input
                                id="whatsappNumber"
                                name="whatsappNumber"
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                placeholder="Enter WhatsApp number"
                            />

                        </div>

                    </div>


                    {/* CATEGORY */}

                    <div className="vendor-form-group">

                        <label htmlFor="category">

                            Category

                        </label>

                        <div className="vendor-input-wrapper">

                            <Tag size={17} />

                            <input
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                placeholder="Enter vendor category"
                            />

                        </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="vendor-form-group vendor-form-group-full">

                        <label htmlFor="address">

                            Vendor Address

                        </label>

                        <div className="vendor-textarea-wrapper">

                            <MapPin size={17} />

                            <textarea
                                id="address"
                                name="address"
                                rows="4"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Enter complete vendor address"
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    FORM FOOTER
                ================================================= */}

                <div className="vendor-form-footer">

                    <Link
                        to="/procurement/vendors"
                        className="vendor-cancel-btn"
                    >

                        Cancel

                    </Link>


                    <button
                        type="submit"
                        disabled={loading}
                        className="vendor-save-btn"
                    >

                        <Save size={18} />

                        {

                            loading

                                ?

                                "Saving..."

                                :

                                isEdit

                                    ?

                                    "Update Vendor"

                                    :

                                    "Create Vendor"

                        }

                    </button>

                </div>

            </form>

        </div>

    );

};


export default VendorForm;