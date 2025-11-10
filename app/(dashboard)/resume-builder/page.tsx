"use client";

import ResumeCard from "@/app/components/cards/ResumeCard";
import ResumeForm from "@/app/components/forms/ResumeForm";
import Modal from "@/app/components/modal/Modal";
import { createResume, generatePdf, getResumes, updateResume } from "@/src/actions/reusme.action";
import useToast from "@/src/hooks/useToast";
import { Resume } from "@/src/types/resume";
import fileDownload from "js-file-download";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Corrected import
import { useEffect, useState } from "react";

export default function ResumeBuilder() {
  const { showSuccess } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<Resume | null>(null);
  const [resumes, setResumes] = useState<Array<Resume>>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleAddNew = () => {
    setEditingResume(null);
    setIsModalOpen(true);
  };

  const handleEdit = (resume: Resume) => {
    setEditingResume(resume);
    setIsModalOpen(true);
  };

  const handleDelete = (resumeId: string) => {
    // In a real app, you'd show a confirmation modal before deleting
    console.log("Delete resume:", resumeId);
  };

  const handleDownload = async (resumeId: string) => {
    showSuccess("Generating PDF...");
    try {
      const blob = await generatePdf(resumeId, "modern-v2");
      // The filename is now set by the backend's Content-Disposition header
      fileDownload(blob, `${editingResume?.title || "resume"}.pdf`);
      showSuccess("Download complete!");
    } catch (error) {
      console.error("Failed to download PDF:", error);
      // You can add an error toast here if you like
    }
  };

  const fetchResumes = async () => {
    const data = await getResumes();
    setResumes(data || []);
  };

  const handleFormSubmit = async (data: any) => {
    // Here you would call your API to save/update the resume
    if (editingResume) {
      // Update logic here
      await updateResume(editingResume._id, data);
      showSuccess("Resume updated successfully!");
    } else {
      await createResume(data);
      showSuccess("Resume created successfully!");
    }
    setIsModalOpen(false);
    fetchResumes();
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
          <button
            onClick={handleAddNew}
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Add New Resume
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resumes.map((resume) => (
            <div key={resume._id}>
              <ResumeCard
                resume={resume}
                onEdit={() => handleEdit(resume)}
                onDelete={() => handleDelete(resume._id)}
                onDownload={handleDownload}
              />
            </div>
          ))}
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingResume ? "Edit Resume" : "Create New Resume"}>
          <ResumeForm onSubmit={handleFormSubmit} defaultValues={editingResume} />
        </Modal>
      </div>
    );
  }

  return null;
}
