import React from 'react';
import ContactForm from '../components/ContactForm'; // Assuming ContactForm will be created in components/forms

/**
 * ContactusPage component displays the main contact page, including a header
 * and the ContactForm component.
 */
function ContactusPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We'd love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
          </p>
        </header>

        <main className="bg-white shadow-xl rounded-lg p-8">
          {/* 
            The ContactForm component handles the actual form submission logic.
            We assume it will be implemented separately in a reusable component location.
          */}
          <ContactForm />
        </main>

        <footer className="mt-10 text-center text-gray-500">
          <p>
            Alternatively, you can reach us directly at support@example.com.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ContactusPage;