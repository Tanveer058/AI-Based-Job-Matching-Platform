import { FaTrash, FaEdit, FaEye, FaDownload } from 'react-icons/fa';

export default function UploadedResumeCard({ resume, onEdit, onDelete }) {
  const isFileResume = !!resume.resumeFile;
  const isPdf = resume.resumeFile?.mimetype === 'application/pdf';
  const filePath = resume.resumeFile?.path;

  return (
    <div className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{resume.name || 'Resume'}</h3>
        <p className="text-sm text-gray-700 mb-1"><strong>Email:</strong> {resume.email}</p>

        {/* If resume is uploaded as file, show preview/download */}
        {isFileResume ? (
          <div className="mt-4">
            {isPdf ? (
              <iframe
                src={filePath}
                title="Resume PDF"
                className="w-full h-64 border rounded"
                onError={e => {
                  e.target.style.display = 'none';
                  console.error('PDF preview failed');
                }}
              />
            ) : resume.resumeFile.mimetype?.includes('word') || resume.resumeFile.mimetype?.includes('msword') ? (
              <a
                href={filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 underline"
              >
                Download DOCX Resume
              </a>
            ) : (
              <p className="text-sm text-red-500 mt-2">Preview not available for this file type.</p>
            )}
          </div>
        ) : (
          // If resume is added manually, show the information
          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-1"><strong>Education:</strong> {Array.isArray(resume.education) ? resume.education.join(', ') : resume.education}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Skills:</strong> {Array.isArray(resume.skills) ? resume.skills.join(', ') : resume.skills}</p>
            <p className="text-sm text-gray-700 mb-1"><strong>Experience:</strong> {resume.experience}</p>
            {/* Add more fields as needed */}
          </div>
        )}
      </div>

      {/* Action Icons */}
      <div className="flex flex-row gap-2 items-center justify-end mt-4 w-full">
        {isFileResume && (
          <>
            {/* Preview */}
            <div className="inline-block relative">
              <a
                href={filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-blue-100 transition group"
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-blue-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                  Preview resume
                </span>
                <FaEye color="#3182ce" size={18} />
              </a>
            </div>

            {/* Download */}
            <div className="inline-block relative">
              <a
                href={filePath}
                download
                className="p-2 rounded-full hover:bg-gray-100 transition group"
              >
                <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-gray-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
                  Download resume
                </span>
                <FaDownload color="#4a5568" size={18} />
              </a>
            </div>
          </>
        )}

        {/* Replace */}
        <div className="inline-block relative">
          <button
            onClick={() => onEdit(resume._id)}
            className="p-2 rounded-full hover:bg-green-100 transition group"
          >
            <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-green-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
              Replace resume
            </span>
            <FaEdit color="#38a169" size={18} />
          </button>
        </div>

        {/* Delete */}
        <div className="inline-block relative">
          <button
            onClick={() => onDelete(resume._id)}
            className="p-2 rounded-full hover:bg-red-100 transition group"
          >
            <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-red-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
              Delete resume
            </span>
            <FaTrash color="#e3342f" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

