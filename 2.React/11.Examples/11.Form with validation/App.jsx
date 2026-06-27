import React, { useState } from "react";

function FormValidationExample() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    phone: "",
    website: "",
    gender: "",
    country: "",
    skills: [],
    experience: "",
    bio: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain one uppercase letter";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) < 18) {
      newErrors.age = "Age must be at least 18";
    } else if (Number(formData.age) > 60) {
      newErrors.age = "Age must be below 60";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    } else if (!/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "Enter a valid website URL";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "Select at least one skill";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience level is required";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.trim().length < 20) {
      newErrors.bio = "Bio must be at least 20 characters";
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept terms and conditions";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" && name !== "skills" ? checked : value,
    }));
  };

  const handleSkillChange = (event) => {
    const { value, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      skills: checked
        ? [...prevData.skills, value]
        : prevData.skills.filter((skill) => skill !== value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully", formData);
      alert("Form submitted successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration Form</h2>

      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p>{errors.fullName}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <label>Website</label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        {errors.website && <p>{errors.website}</p>}
      </div>

      <div>
        <label>Gender</label>

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="other"
            checked={formData.gender === "other"}
            onChange={handleChange}
          />
          Other
        </label>

        {errors.gender && <p>{errors.gender}</p>}
      </div>

      <div>
        <label>Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
        </select>
        {errors.country && <p>{errors.country}</p>}
      </div>

      <div>
        <label>Skills</label>

        <label>
          <input
            type="checkbox"
            value="React"
            checked={formData.skills.includes("React")}
            onChange={handleSkillChange}
          />
          React
        </label>

        <label>
          <input
            type="checkbox"
            value="JavaScript"
            checked={formData.skills.includes("JavaScript")}
            onChange={handleSkillChange}
          />
          JavaScript
        </label>

        <label>
          <input
            type="checkbox"
            value="TypeScript"
            checked={formData.skills.includes("TypeScript")}
            onChange={handleSkillChange}
          />
          TypeScript
        </label>

        {errors.skills && <p>{errors.skills}</p>}
      </div>

      <div>
        <label>Experience Level</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        >
          <option value="">Select experience</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior</option>
        </select>
        {errors.experience && <p>{errors.experience}</p>}
      </div>

      <div>
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        {errors.bio && <p>{errors.bio}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          I accept terms and conditions
        </label>
        {errors.terms && <p>{errors.terms}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default FormValidationExample;