import FormComponent from "../../components/form";

// Generate static params for a range of form IDs since formId can be any number
export async function generateStaticParams() {
  const formIds = [];
  
  // Generate form IDs from 1 to 100 to cover most common cases
  for (let i = 1; i <= 1000; i++) {
    formIds.push({ formID: i.toString() });
  }
  
  return formIds;
}

export default function FormPage({ params }) {
  return <FormComponent formId={params.formID} />;
}