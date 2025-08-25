import { FaFileAlt, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function WhyUsePlatformSection() {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why use our platform?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Learn about the benefits our AI job matching platform offers to candidates and employers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* AI-powered matching */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaFileAlt className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              AI-powered matching
            </h3>
            <p className="text-gray-600">
              Our system intelligently connects candidates with suitable job openings based on their skills and experience.
            </p>
          </div>

          {/* Meet up employers and job seekers */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaUsers className="text-orange-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Meet up employers and job seekers
            </h3>
            <p className="text-gray-600">
              Our platform provides a space for hiring companies to connect with potential candidates.
            </p>
          </div>

          {/* Secure and private */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <FaShieldAlt className="text-teal-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure and private
            </h3>
            <p className="text-gray-600">
              We prioritize the security of user data, maintaining confidentiality and privacy at all times.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
