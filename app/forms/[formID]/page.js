"use client";
import FormComponent from "../../components/form";

export default function FormPage({ params }) {
  return <FormComponent formId={params.formId} />;
}
