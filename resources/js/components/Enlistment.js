import React, { useState, useEffect } from "react";
import Navbar from "./StudentNavbar"; 
import enlistmentData from "./enlistmentData"; 

const EnlistmentForm = ({ user }) => {
    const [department, setDepartment] = useState("");
    const [course, setCourse] = useState("");
    const [major, setMajor] = useState("");
    const [courses, setCourses] = useState([]);
    const [majors, setMajors] = useState([]);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState("new");

    // Additional fields state
    const [dob, setDob] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [region, setRegion] = useState("");
    const [province, setProvince] = useState("");
    const [municipality, setMunicipality] = useState("");
    const [religion, setReligion] = useState("");
    const [citizenship, setCitizenship] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        if (user) {
            setEmail(user.email || "");
            document.getElementById("idNumber").value = user.id || "";
            document.getElementById("fullName").value = user.fullName || "";
            setStatus(checkAccountAge(user.accountCreatedDate));
        }
    }, [user]);

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setDepartment(selectedDepartment);
        setCourse("");
        setMajor("");
        setCourses(enlistmentData[selectedDepartment]?.courses || []);
    };

    const handleCourseChange = (e) => {
        const selectedCourse = e.target.value;
        setCourse(selectedCourse);
        setMajor("");
        const selectedCourseData = courses.find(
            (c) => c.name === selectedCourse
        );
        setMajors(selectedCourseData ? selectedCourseData.majors : []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
    };

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
            <Navbar user={user} />{" "}
            {/* Replace DashboardNav and DashboardSide with Navbar */}
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="container p-4">
                    <div className="enlistment">
                        <div className="flex-grow-1">
                            <div className="container card shadow p-4">
                                <h5 className="card-title h2 mb-4 mt-4 text-center">
                                    Enlistment Form
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="idNumber"
                                            className="form-label"
                                        >
                                            ID Number:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="idNumber"
                                            required
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="fullName"
                                            className="form-label"
                                        >
                                            Full Name:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            required
                                            
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="form-label"
                                        >
                                            Email Address:
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="phoneNumber"
                                            className="form-label"
                                        >
                                            Phone Number:
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                setPhoneNumber(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Additional fields */}
                                    <div className="mb-3">
                                        <label
                                            htmlFor="dob"
                                            className="form-label"
                                        >
                                            Date of Birth:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="dob"
                                            value={dob}
                                            onChange={(e) =>
                                                setDob(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="placeOfBirth"
                                            className="form-label"
                                        >
                                            Place of Birth:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="placeOfBirth"
                                            value={placeOfBirth}
                                            onChange={(e) =>
                                                setPlaceOfBirth(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="address"
                                            className="form-label"
                                        >
                                            Address:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="region"
                                            className="form-label"
                                        >
                                            Region:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="region"
                                            value={region}
                                            onChange={(e) =>
                                                setRegion(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="province"
                                            className="form-label"
                                        >
                                            Province:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="province"
                                            value={province}
                                            onChange={(e) =>
                                                setProvince(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="municipality"
                                            className="form-label"
                                        >
                                            Municipality:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="municipality"
                                            value={municipality}
                                            onChange={(e) =>
                                                setMunicipality(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="religion"
                                            className="form-label"
                                        >
                                            Religion:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="religion"
                                            value={religion}
                                            onChange={(e) =>
                                                setReligion(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="citizenship"
                                            className="form-label"
                                        >
                                            Citizenship:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="citizenship"
                                            value={citizenship}
                                            onChange={(e) =>
                                                setCitizenship(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="gender"
                                            className="form-label"
                                        >
                                            Gender:
                                        </label>
                                        <select
                                            className="form-control"
                                            id="gender"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="department"
                                            className="form-label"
                                        >
                                            Department:
                                        </label>
                                        <select
                                            className="form-control"
                                            id="department"
                                            value={department}
                                            onChange={handleDepartmentChange}
                                            required
                                        >
                                            <option value="">
                                                Select Department
                                            </option>
                                            {Object.keys(enlistmentData).map(
                                                (dept) => (
                                                    <option
                                                        key={dept}
                                                        value={dept}
                                                    >
                                                        {dept}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="course"
                                            className="form-label"
                                        >
                                            Course:
                                        </label>
                                        <select
                                            className="form-control"
                                            id="course"
                                            value={course}
                                            onChange={handleCourseChange}
                                            required
                                        >
                                            <option value="">
                                                Select Course
                                            </option>
                                            {courses.map((course) => (
                                                <option
                                                    key={course.name}
                                                    value={course.name}
                                                >
                                                    {course.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="major"
                                            className="form-label"
                                        >
                                            Major:
                                        </label>
                                        <select
                                            className="form-control"
                                            id="major"
                                            value={major}
                                            onChange={(e) =>
                                                setMajor(e.target.value)
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select Major
                                            </option>
                                            {majors.map((major) => (
                                                <option
                                                    key={major}
                                                    value={major}
                                                >
                                                    {major}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary "
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const checkAccountAge = (accountCreatedDate) => {
    const today = new Date();
    const createdDate = new Date(accountCreatedDate);
    const ageInDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
    return ageInDays < 30 ? "new" : "existing";
};

export default EnlistmentForm;
