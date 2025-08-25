export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Muhammad Kamran',
      role: 'Team Lead, Icreativez Technologies',
      feedback:
        'We hired three candidates through this portal. The matching algorithm saved us hours of manual screening.',
    },
    {
      name: 'Tanveer Hussain',
      role: 'Mern Stack, Icreativez Technologies',
      feedback:
        'This platform helped me find a job that perfectly matched my skills. The AI recommendations were spot-on!',
    },
    {
      name: 'Zubair Ahmed',
      role: 'Fullstack Engineer',
      feedback:
        'I loved how easy it was to upload my resume and get relevant job suggestions. Highly recommended!',
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">What People Are Saying</h2>
        <p className="text-lg text-gray-600 mb-12">
          Hear from candidates and employers who’ve used our platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-gray-50 shadow-md rounded-lg p-6 text-left hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-700 italic mb-4">“{t.feedback}”</p>
              <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
