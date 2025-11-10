"use client";

import { Download, Edit, MoreVertical, Trash2 } from "lucide-react";
import React from "react";
import { Resume } from "@/src/types/resume";
import DropdownMenu from "../Buttons/DropdownMenu";

interface ResumeCardProps {
  resume: Resume;
  onEdit: (resume: Resume) => void;
  onDelete: (resumeId: string) => void;
  onDownload: (resumeId: string) => void;
}

export default function ResumeCard({ resume, onEdit, onDelete, onDownload }: ResumeCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(resume);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(resume._id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(resume._id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800">{resume.title}</h3>
        <DropdownMenu
          trigger={
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              <MoreVertical size={20} />
            </button>
          }
        >
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10 border border-gray-200">
            <a onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="button" tabIndex={0}>
              <Edit size={16} /> Edit
            </a>
            <a onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" role="button" tabIndex={0}>
              <Download size={16} /> Download
            </a>
            <a onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer" role="button" tabIndex={0}>
              <Trash2 size={16} /> Delete
            </a>
          </div>
        </DropdownMenu>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}