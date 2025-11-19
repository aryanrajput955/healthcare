import React, { Suspense } from "react";
import FormComponent from "../../components/form";

// Generate static params — key MUST match the dynamic folder name [formID]
export async function generateStaticParams() {
  const formIDs = [];
  for (let i = 1; i <= 1000; i++) {
    formIDs.push({ formID: i.toString() });
  }
  return formIDs;
}

// Keep this file as a server component but wrap the client component in Suspense
export default function FormPage({ params }) {
  return (
    <Suspense fallback={<div className="p-8">Loading form...</div>}>
      <FormComponent formId={params.formID} />
    </Suspense>
  );
}