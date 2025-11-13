'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useAuthStore from '../lib/authstore';

const FormComponent = ({ formId = 1 }) => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [fetchedForm, setFetchedForm] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userJourneyId = searchParams.get("journeyId");

  const { user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError("Please login first");
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [router]);

  const handleFetchForm = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`https://api.indiem.tech/forms/${formId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFetchedForm(res.data);
      const formDef = JSON.parse(res.data.fields);
      setFormFields(formDef);

      const initial = {};
      formDef.forEach(f => {
        initial[f.name] = f.type === "checkbox" && f.allowMultiple ? [] : "";
      });
      setFormData(initial);
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthError("Unauthorized. Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) handleFetchForm();
  }, [formId]);

  const validateField = (name, value, field) => {
    if (field.required && !value) return `${field.label || name} is required`;
    if (value && field.type === "email" && !/^\S+@\S+\.\S+$/.test(value)) return "Invalid email";
    if (value && field.type === "tel" && !/^\+?[\d\s-]{10,}$/.test(value)) return "Invalid phone";
    if (value && field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Invalid date";
    return "";
  };

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (field.type === "checkbox" && field.allowMultiple) {
      const arr = formData[name] || [];
      newValue = checked ? [...arr, value] : arr.filter(v => v !== value);
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, newValue, field) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let valid = true;

    formFields.forEach(f => {
      const err = validateField(f.name, formData[f.name], f);
      if (err) { valid = false; newErrors[f.name] = err; }
    });

    setErrors(newErrors);
    if (!valid || !userJourneyId || !user?.id) {
      if (!userJourneyId) alert("Missing journey context.");
      if (!user?.id) alert("User not logged in.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://api.indiem.tech/form-response",
        {
          userId: Number(user.id),
          userJourneyId: Number(userJourneyId),
          formId: Number(formId),
          response: formData,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Form submitted successfully!");

      router.push("/journey");
      router.refresh();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      alert("Failed to submit: " + (err.response?.data?.message || "Server error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (authError) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">{authError}</h2>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {fetchedForm?.title || "Loading Form..."}
      </h2>

      {formFields.length > 0 ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map(field => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                {field.label || field.name}{field.required && <span className="text-red-500">*</span>}
              </label>
              {field.description && <p className="text-xs text-gray-500 mb-2">{field.description}</p>}

              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={e => handleChange(e, field)}
                  className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  {field.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : field.type === "radio" ? (
                <div className="flex gap-4 flex-wrap">
                  {field.options?.map(opt => (
                    <label key={opt} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={field.name}
                        value={opt}
                        checked={formData[field.name] === opt}
                        onChange={e => handleChange(e, field)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : field.type === "checkbox" && field.allowMultiple ? (
                <div className="flex gap-4 flex-wrap">
                  {field.options?.map(opt => (
                    <label key={opt} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name={field.name}
                        value={opt}
                        checked={formData[field.name]?.includes(opt)}
                        onChange={e => handleChange(e, field)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={e => handleChange(e, field)}
                  className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder={field.description}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={e => handleChange(e, field)}
                  className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder={field.description}
                />
              )}

              {errors[field.name] && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white transition ${
              submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">Loading form fields...</p>
      )}
    </div>
  );
};

export default FormComponent;