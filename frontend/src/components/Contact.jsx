import React, { useState } from "react";
import Navbar from "./shared/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending data to your backend
    console.log("Form submitted:", formData);
  };

  return (
    <div>
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section: Contact Form */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’d love to hear from you! Fill out the form below or reach out to us via email or phone.
          </p>
        </section>

        {/* Section: Contact Form */}
        <section className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-left text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </section>

        {/* Section: Contact Info */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Other Ways to Reach Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            If you prefer, you can also contact us through the following means:
          </p>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Email:</strong> support@jobportal.com
            </p>
            <p>
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <p>
              <strong>Address:</strong> 123 Job Portal Street, Business City, USA
            </p>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Contact;
