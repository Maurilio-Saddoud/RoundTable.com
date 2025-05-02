import { useState } from "react";
import LinkBubbles from "../../components/LinkBubbles/LinkBubbles";
import { alexanderLinks, maurilioLinks } from "../../data/contactContainerLinks/contactLinks";

const ContactContainer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white font-space grid place-items-center relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent, rgba(22, 171, 255, 0.05) 50%),
            linear-gradient(rgba(209, 213, 219, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(209, 213, 219, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          maskImage: "linear-gradient(to right, transparent, white 90%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 50%)",
        }}
      />

      <div className="w-full max-w-6xl px-4 py-20 relative z-10">
        <h1 className="text-7xl font-bold text-[#16ABFF] mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="bg-gray-100 rounded-3xl p-8">
            <h2 className="text-3xl text-[#16ABFF] mb-6">
              We'd love to hear from you!
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#16ABFF]"
                  placeholder="Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#16ABFF]"
                  placeholder="Email"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#16ABFF] resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled
                  className="px-6 py-3 rounded-2xl bg-[#16ABFF] text-white font-space font-bold opacity-50 cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Social Links */}
          <div className="space-y-20">
            {/* Maurilio's Links */}
            <div>
              <h2 className="text-2xl font-bold">Maurilio's Links</h2>
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <LinkBubbles links={maurilioLinks} />
              </div>
            </div>

            {/* Alexander's Links */}
            <div className="!mt-4">
              <p className="text-2xl font-bold !mt-0">Alexander's Links</p>
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
                <LinkBubbles links={alexanderLinks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContainer;
