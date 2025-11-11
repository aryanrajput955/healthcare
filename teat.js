import axios from 'axios';

const options = {
  method: 'POST',
  url: 'https://api.indiem.tech/forms',
  headers: {'content-type': 'application/json'},
  data: {
    tag: '["claims"]',
    fields: [
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        name: 'title',
        type: 'text',
        label: 'Form Title',
        required: true,
        description: 'Title of the claim form',
        defaultValue: 'CLAIM FORM - PART A (IRDA)',
        allowMultiple: false
      },
      {
        id: 'b2c3d4e5-f6g7-8901-bcde-f23456789012',
        name: 'policyNo',
        type: 'text',
        label: 'Policy Number',
        required: true,
        maxLength: 20,
        description: 'Enter your insurance policy number',
        allowMultiple: false
      },
      {
        id: 'c3d4e5f6-g7h8-9012-cdef-345678901234',
        name: 'certificateNo',
        type: 'text',
        label: 'Certificate Number',
        required: false,
        description: 'Enter your certificate number if applicable',
        allowMultiple: false
      },
      {
        id: 'd4e5f6g7-h8i9-0123-defg-456789012345',
        name: 'companyName',
        type: 'text',
        label: 'Insurance Company Name',
        required: true,
        description: 'Name of the insurance company',
        allowMultiple: false
      },
      {
        id: 'e5f6g7h8-i9j0-1234-efgh-567890123456',
        name: 'insuredName',
        type: 'text',
        label: 'Insured Person Name',
        required: true,
        description: 'Full name of the insured person',
        allowMultiple: false
      },
      {
        id: 'f6g7h8i9-j0k1-2345-fghi-678901234567',
        name: 'address1',
        type: 'text',
        label: 'Address Line 1',
        required: true,
        description: 'Enter your street address',
        allowMultiple: false
      },
      {
        id: 'g7h8i9j0-k1l2-3456-ghij-789012345678',
        name: 'address2',
        type: 'text',
        label: 'Address Line 2',
        required: false,
        description: 'Enter city, state and postal code',
        allowMultiple: false
      },
      {
        id: 'h8i9j0k1-l2m3-4567-hijk-890123456789',
        name: 'pinCode',
        type: 'text',
        label: 'PIN Code',
        required: true,
        description: 'Enter your postal PIN code',
        allowMultiple: false
      },
      {
        id: 'i9j0k1l2-m3n4-5678-ijkl-901234567890',
        name: 'state',
        type: 'select',
        label: 'State',
        options: [
          'Andhra Pradesh',
          'Arunachal Pradesh',
          'Assam',
          'Bihar',
          'Chhattisgarh',
          'Goa',
          'Gujarat',
          'Haryana',
          'Himachal Pradesh',
          'Jharkhand',
          'Karnataka',
          'Kerala',
          'Madhya Pradesh',
          'Maharashtra',
          'Manipur',
          'Meghalaya',
          'Mizoram',
          'Nagaland',
          'Odisha',
          'Punjab',
          'Rajasthan',
          'Sikkim',
          'Tamil Nadu',
          'Telangana',
          'Tripura',
          'Uttar Pradesh',
          'Uttarakhand',
          'West Bengal'
        ],
        required: true,
        description: 'Select your state',
        allowMultiple: false
      },
      {
        id: 'j0k1l2m3-n4o5-6789-jklm-012345678901',
        name: 'currentlyCovered',
        type: 'radio',
        label: 'Currently Covered by Health Insurance',
        options: ['yes', 'no'],
        required: true,
        description: 'Are you currently covered by any health insurance policy?',
        allowMultiple: false
      },
      {
        id: 'k1l2m3n4-o5p6-7890-klmn-123456789012',
        name: 'commencementDate',
        type: 'date',
        label: 'Policy Commencement Date',
        required: true,
        description: 'Enter the date when your policy started (DD/MM/YYYY)',
        allowMultiple: false
      },
      {
        id: 'l2m3n4o5-p6q7-8901-lmno-234567890123',
        name: 'otherPolicyNo',
        type: 'text',
        label: 'Other Policy Number',
        required: false,
        description: 'If you have other insurance policies, enter the policy number',
        allowMultiple: false
      },
      {
        id: 'm3n4o5p6-q7r8-9012-mnop-345678901234',
        min: 0,
        name: 'sumInsured',
        type: 'number',
        label: 'Sum Insured',
        required: true,
        description: 'Enter the sum insured amount',
        allowMultiple: false
      },
      {
        id: 'n4o5p6q7-r8s9-0123-nopq-456789012345',
        name: 'previouslyHospitalized',
        type: 'radio',
        label: 'Previously Hospitalized',
        options: ['yes', 'no'],
        required: true,
        description: 'Have you been hospitalized in the past 4 years?',
        allowMultiple: false
      },
      {
        id: 'o5p6q7r8-s9t0-1234-opqr-567890123456',
        name: 'hospitalizationDate',
        type: 'date',
        label: 'Previous Hospitalization Date',
        required: false,
        description: 'If previously hospitalized, enter the date (DD/MM/YYYY)',
        allowMultiple: false
      },
      {
        id: 'p6q7r8s9-t0u1-2345-pqrs-678901234567',
        name: 'otherCompanyName',
        type: 'text',
        label: 'Other Insurance Company',
        required: false,
        description: 'Name of other insurance company if applicable',
        allowMultiple: false
      },
      {
        id: 'q7r8s9t0-u1v2-3456-qrst-789012345678',
        name: 'diagnosis',
        type: 'textarea',
        label: 'Diagnosis',
        required: false,
        description: 'Medical diagnosis or reason for claim',
        allowMultiple: false
      },
      {
        id: 'r8s9t0u1-v2w3-4567-rstu-890123456789',
        name: 'patientName',
        type: 'text',
        label: 'Patient Name',
        required: true,
        description: 'Full name of the patient',
        allowMultiple: false
      },
      {
        id: 's9t0u1v2-w3x4-5678-stuv-901234567890',
        name: 'gender',
        type: 'radio',
        label: 'Patient Gender',
        options: ['male', 'female', 'other'],
        required: true,
        description: 'Select the patient\'s gender',
        allowMultiple: false
      },
      {
        id: 't0u1v2w3-x4y5-6789-tuvw-012345678901',
        max: 120,
        min: 0,
        name: 'age',
        type: 'number',
        label: 'Patient Age',
        required: true,
        description: 'Enter the patient\'s age in years',
        allowMultiple: false
      },
      {
        id: 'u1v2w3x4-y5z6-7890-uvwx-123456789012',
        name: 'dateOfBirth',
        type: 'date',
        label: 'Date of Birth',
        required: true,
        description: 'Enter the patient\'s date of birth (DD/MM/YYYY)',
        allowMultiple: false
      },
      {
        id: 'v2w3x4y5-z6a7-8901-vwxy-234567890123',
        name: 'relationship',
        type: 'select',
        label: 'Relationship to Insured',
        options: ['SELF', 'SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'OTHER'],
        required: true,
        description: 'Patient\'s relationship to the insured person',
        allowMultiple: false
      },
      {
        id: 'w3x4y5z6-a7b8-9012-wxyz-345678901234',
        name: 'occupation',
        type: 'text',
        label: 'Occupation',
        required: false,
        description: 'Patient\'s occupation',
        allowMultiple: false
      },
      {
        id: 'x4y5z6a7-b8c9-0123-xyza-456789012345',
        name: 'patientAddress1',
        type: 'text',
        label: 'Patient Address Line 1',
        required: false,
        description: 'Patient\'s street address (if different from insured)',
        allowMultiple: false
      },
      {
        id: 'y5z6a7b8-c9d0-1234-yzab-567890123456',
        name: 'patientAddress2',
        type: 'text',
        label: 'Patient Address Line 2',
        required: false,
        description: 'Patient\'s city, state and postal code (if different from insured)',
        allowMultiple: false
      },
      {
        id: 'z6a7b8c9-d0e1-2345-zabc-678901234567',
        name: 'pan',
        type: 'text',
        label: 'PAN Number',
        required: true,
        description: 'Enter PAN card number',
        allowMultiple: false
      },
      {
        id: 'a7b8c9d0-e1f2-3456-abcd-789012345678',
        name: 'accountNumber',
        type: 'text',
        label: 'Bank Account Number',
        required: true,
        description: 'Enter bank account number for claim settlement',
        allowMultiple: false
      },
      {
        id: 'b8c9d0e1-f2g3-4567-bcde-890123456789',
        name: 'bankName',
        type: 'text',
        label: 'Bank Name',
        required: true,
        description: 'Enter bank name and branch details',
        allowMultiple: false
      },
      {
        id: 'c9d0e1f2-g3h4-5678-cdef-901234567890',
        name: 'ddPayableDetails',
        type: 'text',
        label: 'DD Payable Details',
        required: false,
        description: 'Name for demand draft payment',
        allowMultiple: false
      },
      {
        id: 'd0e1f2g3-h4i5-6789-defg-012345678901',
        name: 'ifscCode',
        type: 'text',
        label: 'IFSC Code',
        required: true,
        description: 'Enter bank IFSC code',
        allowMultiple: false
      }
    ]
  }
};

try {
  const { data } = await axios.request(options);
  console.log(data);
} catch (error) {
  console.error(error);
}