import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Kuldeep Chaudhary',
          from_email: form.email,
          to_email: 'kuldeep45.kd@gmail.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-10 sm:py-20">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 w-full h-full object-cover" />

        <div className="w-full max-w-xl relative z-10 px-4 sm:px-10 mt-20 sm:mt-24">
          <h3 className="sm:text-4xl text-3xl font-semibold text- bg-gradient-to-r from-[#BEC1CF] from-60% via-[#D5D8EA] via-60% to-[#D5D8EA] to-100% bg-clip-text text-transparent">Let's talk</h3>
          <p className="text-lg text-[#AFB0B6] mt-3">
            Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
            life, I’m here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-[#3A3A49] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#3A3A49] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="text-lg text-[#AFB0B6]">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#3A3A49] px-5 py-2 min-h-14 rounded-lg placeholder:text-[#62646C] text-lg text-[#E4E4E6] shadow-black-200 shadow-2xl focus:outline-none"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="bg-[#3A3A49] px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className=" w-2.5 h-2.5 object-contain invert brightness-0" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;