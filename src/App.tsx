import React from "react";
import { defaultCompanyData } from "./defaultData";
import CompanyWebsite from "./components/CompanyWebsite";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FCFAF6] selection:bg-[#d4af37]/20 selection:text-[#0f5132]">
      <CompanyWebsite data={defaultCompanyData} />
    </div>
  );
}
