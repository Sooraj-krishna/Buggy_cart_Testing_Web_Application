import React from 'react';

/**
 * AboutPage component displays information about the application.
 */
function AboutPage() {
  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">About This Application</h1>
      </header>

      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          This application is designed to provide a seamless and efficient experience for managing complex data workflows. We aim to simplify operations and enhance productivity through intuitive design and robust functionality.
        </p>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Technology Stack</h2>
        <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
          <li>Frontend: React with TypeScript</li>
          <li>Styling: Tailwind CSS (or similar utility-first framework)</li>
          <li>Routing: React Router DOM</li>
          <li>Architecture: Component-based, following modern React best practices</li>
        </ul>
      </section>

      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Contact Information</h2>
        <p className="text-gray-600">
          If you have any questions or feedback, please reach out to us at:
        </p>
        <p className="mt-2 text-blue-600 font-medium">
          support@example.com
        </p>
      </section>
    </div>
  );
}

export default AboutPage;