import FormComponent from "../../components/form";

// For completely dynamic form IDs, we don't need generateStaticParams
// All routes will be rendered dynamically based on the formID parameter

export default function FormPage({ params }) {
  return <FormComponent formId={params.formID} />;
}
