"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { PlusCircle, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import GenerateSummaryModal from "../modal/GenerateSummaryModal";
import { generateProfessionalSummary } from "@/src/actions/reusme.action";
import useToast from "@/src/hooks/useToast";

const resumeSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  professionalSummary: yup.string().required("Professional summary is required"),
  skills: yup.array().of(yup.string().required()).min(1, "At least one skill is required"),
  workExperience: yup.array().of(
    yup.object().shape({
      company: yup.string().required("Company is required"),
      jobTitle: yup.string().required("Job title is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string(),
      description: yup.string(),
    })
  ),
  education: yup.array().of(
    yup.object().shape({
      institution: yup.string().required("Institution is required"),
      degree: yup.string().required("Degree is required"),
      fieldOfStudy: yup.string(),
      startDate: yup.string(),
      endDate: yup.string(),
    })
  ),
  template: yup.string().default("modern"),
});

const Input = ({ label, name, register, error, ...rest }: any) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input id={name} {...register(name)} {...rest} className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow ${error ? 'border-red-500' : 'border-gray-300'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);

const TextArea = ({ label, name, register, error, ...rest }: any) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea id={name} {...register(name)} {...rest} rows={4} className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow ${error ? 'border-red-500' : 'border-gray-300'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
  </div>
);


export default function ResumeForm({ onSubmit, defaultValues }: any) {
  const { register, control, handleSubmit, formState: { errors }, getValues, setValue } = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues: defaultValues || { skills: [''], workExperience: [{}], education: [{}] },
  });

  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleGenerateSummary = async () => {
    const resumeData = getValues();
    try {
      const result = await generateProfessionalSummary(resumeData);
      if (result && result.completion) {
        return result.completion;
      }
      showError("Failed to generate summary.");
      return null;
    } catch (error) {
      showError("An error occurred while generating the summary.");
      return null;
    }
  };

  const handleSaveSummary = (newSummary: string) => {
    setValue("professionalSummary", newSummary, { shouldValidate: true });
    showSuccess("Professional summary updated!");
  };

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "workExperience" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Input label="Resume Title" name="title" register={register} error={errors.title} placeholder="e.g., Senior Software Engineer" />
      <div>
        <TextArea label="Professional Summary" name="professionalSummary" register={register} error={errors.professionalSummary} placeholder="A brief summary of your career..." />
        <button
          type="button"
          onClick={() => setSummaryModalOpen(true)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mt-1"
        >
          <Sparkles size={16} /> Generate with AI
        </button>
      </div>

      <GenerateSummaryModal isOpen={isSummaryModalOpen} onClose={() => setSummaryModalOpen(false)} onSave={handleSaveSummary} currentSummary={getValues("professionalSummary")} onGenerate={handleGenerateSummary} />

      <div>
        <h3 className="text-lg font-semibold mb-3">Skills</h3>
        {skillFields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <Input name={`skills.${index}`} register={register} error={(errors as any).skills?.[index]} placeholder="e.g., React" className="flex-grow" />
            <button type="button" onClick={() => removeSkill(index)} className="p-2 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
          </div>
        ))}
        <button type="button" onClick={() => appendSkill('')} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
          <PlusCircle size={16} /> Add Skill
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Work Experience</h3>
        {expFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-lg mb-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Company" name={`workExperience.${index}.company`} register={register} error={(errors as any).workExperience?.[index]?.company} />
              <Input label="Job Title" name={`workExperience.${index}.jobTitle`} register={register} error={(errors as any).workExperience?.[index]?.jobTitle} />
              <Input label="Start Date" name={`workExperience.${index}.startDate`} type="date" register={register} error={(errors as any).workExperience?.[index]?.startDate} />
              <Input label="End Date" name={`workExperience.${index}.endDate`} type="date" register={register} error={(errors as any).workExperience?.[index]?.endDate} />
            </div>
            <TextArea label="Description" name={`workExperience.${index}.description`} register={register} error={(errors as any).workExperience?.[index]?.description} />
            <button type="button" onClick={() => removeExp(index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
          </div>
        ))}
        <button type="button" onClick={() => appendExp({})} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
          <PlusCircle size={16} /> Add Experience
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Education</h3>
        {eduFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-lg mb-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Institution" name={`education.${index}.institution`} register={register} error={(errors as any).education?.[index]?.institution} />
              <Input label="Degree" name={`education.${index}.degree`} register={register} error={(errors as any).education?.[index]?.degree} />
              <Input label="Field of Study" name={`education.${index}.fieldOfStudy`} register={register} error={(errors as any).education?.[index]?.fieldOfStudy} />
              <Input label="Start Date" name={`education.${index}.startDate`} type="date" register={register} error={(errors as any).education?.[index]?.startDate} />
              <Input label="End Date" name={`education.${index}.endDate`} type="date" register={register} error={(errors as any).education?.[index]?.endDate} />
            </div>
            <button type="button" onClick={() => removeEdu(index)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
          </div>
        ))}
        <button type="button" onClick={() => appendEdu({})} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium">
          <PlusCircle size={16} /> Add Education
        </button>
      </div>

      <div className="flex justify-end pt-4">
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Save Resume
        </button>
      </div>
    </form>
  );
}