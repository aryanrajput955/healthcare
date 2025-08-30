'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});
  const [fetchedForm, setFetchedForm] = useState(null);

  const handleFetchForm = async () => {
    try {
      const response = await axios.get('http://localhost:3010/forms/12');
      const formDef = JSON.parse(response.data.fields);
      setFormFields(formDef);
      // Initialize formData with empty or default values
      const initialData = {};
      formDef.forEach((field) => {
        if (field.type === 'checkbox' && field.allowMultiple) {
          initialData[field.name] = [];
        } else {
          initialData[field.name] = '';
        }
      });
      setFormData(initialData);
    } catch (error) {
      setFormFields([]);
      setFormData({});
      setFetchedForm({ error: error.message });
    }
  };

  useEffect(() => {
    handleFetchForm();
  }, []);

  const validateField = (name, value, field) => {
    if (field.required && !value) {
      return `${name} is required`;
    }
    if (value) {
      if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        return 'Invalid email address';
      }
      if (field.type === 'tel' && !/^\+?[\d\s-]{10,}$/.test(value)) {
        return 'Invalid phone number';
      }
      if (field.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return 'Invalid date format';
      }
    }
    return '';
  };

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    if (field.type === 'checkbox' && field.allowMultiple) {
      setFormData((prev) => {
        const arr = prev[name] || [];
        if (checked) {
          return { ...prev, [name]: [...arr, value] };
        } else {
          return { ...prev, [name]: arr.filter((v) => v !== value) };
        }
      });
    } else if (field.type === 'radio') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const error = validateField(name, value, field);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    let isValid = true;

    formFields.forEach((field) => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) {
        isValid = false;
        newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:3010/form-response', {
          userId: 1, // You can make this dynamic based on logged-in user
          formId: 8,
          response: formData
        });
        console.log('Form submitted successfully:', response.data);
        alert('Form submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again.');
      }
    } else {
      console.log('Form has errors:', newErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Information Form</h2>
      <div className="space-y-6">
        
        {formFields.length > 0 && (
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {field.label || field.name} {field.required && <span className="text-red-500">*</span>}
                </label>
                <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(e, field)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select an option</option>
                    {field.options && field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : field.type === 'radio' ? (
                  <div className="flex gap-4">
                    {field.options && field.options.map((option) => (
                      <label key={option} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={field.name}
                          value={option}
                          checked={formData[field.name] === option}
                          onChange={(e) => handleChange(e, field)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : field.type === 'checkbox' && field.allowMultiple ? (
                  <div className="flex gap-4 flex-wrap">
                    {field.options && field.options.map((option) => (
                      <label key={option} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          name={field.name}
                          value={option}
                          checked={formData[field.name]?.includes(option)}
                          onChange={(e) => handleChange(e, field)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(e, field)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field.description}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(e, field)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field.description}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormComponent;