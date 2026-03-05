export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  // Matches exactly 10 digits
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const submitForm = async (formData, formType = 'General') => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        formType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Error submitting ${formType}:`, error);
    return { success: false, error: error.message };
  }
};
