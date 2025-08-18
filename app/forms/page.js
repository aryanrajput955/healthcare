'use client';
import { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    Date: '',
    'How did you hear about our Service?': '',
    Name: '',
    'Identity Number': '',
    'Home Phone': '',
    'Cell Phone': '',
    'Email Address': '',
    City: '',
    'Are you married?': '',
    'How long have you been married?': '',
    'Does either partner smoke?': '',
    'Does either partner use recreational drugs?': '',
    'Are they regular?': '',
    'Do you have endometriosis?': '',
  });

  const [errors, setErrors] = useState({});

  const formFields = [
    {
      name: 'Date',
      type: 'date',
      validation: 'date',
      required: true,
      description: 'The date when the form is filled.',
    },
    {
      name: 'How did you hear about our Service?',
      type: 'text',
      validation: 'string',
      required: false,
      description: 'Source of referral such as internet, friend, or doctor.',
    },
    {
      name: 'Name',
      type: 'text',
      validation: 'string',
      required: true,
      description: 'Full legal name of the patient.',
    },
    {
      name: 'Identity Number',
      type: 'text',
      validation: 'string',
      required: true,
      description: 'National ID or passport number.',
    },
    {
      name: 'Home Phone',
      type: 'tel',
      validation: 'tel',
      required: false,
      description: 'Home contact number including area code.',
    },
    {
      name: 'Cell Phone',
      type: 'tel',
      validation: 'tel',
      required: true,
      description: 'Mobile contact number.',
    },
    {
      name: 'Email Address',
      type: 'email',
      validation: 'email',
      required: true,
      description: 'Primary email address for communication.',
    },
    {
      name: 'City',
      type: 'text',
      validation: 'string',
      required: true,
      description: 'City of residence.',
    },
    {
      name: 'Are you married?',
      type: 'select',
      validation: 'string',
      required: true,
      description: 'Marital status of the patient.',
      options: ['Yes', 'No'],
    },
    {
      name: 'How long have you been married?',
      type: 'text',
      validation: 'string',
      required: false,
      description: 'Duration of marriage in years or months.',
    },
    {
      name: 'Does either partner smoke?',
      type: 'select',
      validation: 'string',
      required: false,
      description: 'Indicate if either partner is a smoker.',
      options: ['Yes', 'No', 'Occasionally'],
    },
    {
      name: 'Does either partner use recreational drugs?',
      type: 'select',
      validation: 'string',
      required: false,
      description: 'Indicate if either partner uses recreational drugs.',
      options: ['Yes', 'No', 'Prefer not to say'],
    },
    {
      name: 'Are they regular?',
      type: 'select',
      validation: 'string',
      required: false,
      description: 'Indicate if menstrual periods are regular.',
      options: ['Yes', 'No', 'Sometimes'],
    },
    {
      name: 'Do you have endometriosis?',
      type: 'select',
      validation: 'string',
      required: false,
      description: 'Whether the patient has been diagnosed with endometriosis.',
      options: ['Yes', 'No', 'Unsure'],
    },
  ];

  const validateField = (name, value, field) => {
    if (field.required && !value) {
      return `${name} is required`;
    }
    if (value) {
      if (field.validation === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        return 'Invalid email address';
      }
      if (field.validation === 'tel' && !/^\+?[\d\s-]{10,}$/.test(value)) {
        return 'Invalid phone number';
      }
      if (field.validation === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return 'Invalid date format';
      }
    }
    return '';
  };

  const handleChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value, field);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = () => {
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
      console.log('Form submitted:', formData);
      // Add your submission logic here (e.g., API call)
    } else {
      console.log('Form has errors:', newErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Information Form</h2>
      <div className="space-y-6">
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.name} {field.required && <span className="text-red-500">*</span>}
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
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormComponent;