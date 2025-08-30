import { FaTrash, FaEdit } from 'react-icons/fa';

export default function ManualResumeCard({ resume, onEdit, onDelete }) {
  const { _id, name, email, education, skills, experience } = resume;

  return (
    <div className="p-6 border rounded-lg bg-white shadow hover:shadow-md transition flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name || 'Resume'}</h3>
        <p className="text-sm text-gray-700 mb-1"><strong>Email:</strong> {email}</p>
        <p className="text-sm text-gray-700 mb-1"><strong>Education:</strong> {education?.join(', ')}</p>
        <p className="text-sm text-gray-700 mb-1"><strong>Skills:</strong> {skills?.join(', ')}</p>
        <p className="text-sm text-gray-700"><strong>Experience:</strong> {experience}</p>
      </div>

      {/*  Action Icons */}
      <div className="flex flex-row gap-2 items-center justify-end mt-4 w-full">
        {/*  Edit */}
        <div className="inline-block relative">
          <button
            onClick={() => onEdit(_id)}
            className="p-2 rounded-full hover:bg-green-100 transition group"
          >
            <span className="absolute left-1/2 -translate-x-1/2 -top-6 bg-white text-xs text-green-600 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 pointer-events-none z-10 whitespace-nowrap transition">
              Edit resume
            </span>
            <FaEdit color="#38a169" size={18} />
          </button>
        </div>

        {/* Delete */}
        <div className="inline-block relative">
          <button
            onClick={() => onDelete(_id)}
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
