"use client";
import React from "react";
import { useState } from "react";
import * as Yup from "yup";

// Create a validation schema for each step using Yup
const step1Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const step2Schema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
});

const step3Schema = Yup.object().shape({
  age: Yup.number()
    .min(18, "You must be at least 18")
    .required("Age is required"),
  gender: Yup.string().required("Gender is required"),
});

const stepSchemas = [step1Schema, step2Schema, step3Schema];

const TestPage = () => {
  // Manage which step the user is on
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    age: "",
    gender: "",
  });
  const [errors, setErrors] = useState<any>({});

  const handleNext = async () => {
    try {
      // Validate the current step using Yup
      const schema = stepSchemas[step];
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      // Proceed to the next step
      setStep((prev) => prev + 1);
    } catch (err: any) {
      // Capture validation errors
      const validationErrors: any = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col min-h-screen place-items-center bg-slate-600">
      <h1 className="text-3xl font-bold text-white mb-2">Census 2024</h1>
      {step === 0 && (
        <div className="flex flex-col">
          <h2 className="p-2 text-lg text-white font-semibold">
            Person Details
          </h2>
          <div>
            <label className="">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-2 py-3 rounded-md m-2"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-2 py-3 rounded-md m-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col p-2">
          <h2>Step 2: Address</h2>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="px-2 py-3 rounded-md m-2"
            />
            {errors.address && <p className="text-red-500">{errors.address}</p>}
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="px-2 py-3 rounded-md m-2"
            />
            {errors.city && <p className="text-red-500">{errors.city}</p>}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Step 3: Personal Details</h2>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="px-2 py-3 rounded-md m-2"
            />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Step 4: Confirmation</h2>
          <p>Please confirm your details</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      <div className="">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="bg-blue-400 hover:bg-blue-700 px-10 py-3 rounded-md text-white]"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={handleNext}
            className="bg-emerald-400 hover:bg-emerald-700 px-10 py-3 rounded-md text-white"
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button onClick={() => alert("Form Submitted!")}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
