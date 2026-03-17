'use client';
import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { useState } from "react";

function InputField({ label, icon, name, value, onChange, focused, setFocused }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-2">{label}</label>
      <div className={`relative flex items-center group transition-all duration-500 ${focused ? 'ring-2 ring-purple-500/30' : ''}`}>
        <div className={`absolute left-4 transition-colors duration-300 ${focused ? 'text-purple-500' : 'text-zinc-600'}`}>
          {icon}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          autoComplete="off"
          className="w-full bg-white/5 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none transition-all"
          placeholder="Type here..."
        />
      </div>
    </div>
  );
}

export default function QueryForm() {
  const [formdata, setformdata] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setsent] = useState(false)
  const [focused, setFocused] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setsent(true)
    setTimeout(() => setsent(false), 5000)
    setformdata({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section className="relative w-full py-32 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
              Query <span className="text-purple-500">Form</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-xl mx-auto font-light">
              Got technical hurdles or procedural doubts? Our core team is on standby to assist your journey.
            </p>
          </motion.div>
        </div>

        {/* Form Layout */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Contact Info / FAQ hint */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-white text-2xl font-bold italic">Why reach out?</h3>
              <ul className="space-y-4">
                <li className="flex gap-4 text-zinc-400 group">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 group-hover:scale-125 transition-transform"><HelpCircle size={14} /></div>
                  <span className="text-sm">Technical challenges during registration</span>
                </li>
                <li className="flex gap-4 text-zinc-400 group">
                  <div className="w-6 h-6 rounded-full bg-magenta-500/10 flex items-center justify-center text-magenta-500 shrink-0 group-hover:scale-125 transition-transform"><HelpCircle size={14} /></div>
                  <span className="text-sm">Inquiries about prize distribution logic</span>
                </li>
                <li className="flex gap-4 text-zinc-400 group">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 group-hover:scale-125 transition-transform"><HelpCircle size={14} /></div>
                  <span className="text-sm">Corporate sponsorship for future events</span>
                </li>
              </ul>
            </motion.div>

            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl">
              <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest block mb-4">Urgent matters</span>
              <p className="text-zinc-300 font-medium">arena-support@csec.edu</p>
            </div>
          </div>

          {/* Right: The actual form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative"
          >
            {/* Success Notification */}
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-6 py-2 rounded-full font-bold text-sm z-50 shadow-xl"
              >
                Transmission Received!
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <InputField
                  label="Your Name"
                  icon={<User size={16} />}
                  name="name"
                  value={formdata.name}
                  onChange={(v) => setformdata({ ...formdata, name: v })}
                  focused={focused === "name"}
                  setFocused={setFocused}
                />
                <InputField
                  label="Email System"
                  icon={<Mail size={16} />}
                  name="email"
                  value={formdata.email}
                  onChange={(v) => setformdata({ ...formdata, email: v })}
                  focused={focused === "email"}
                  setFocused={setFocused}
                />
              </div>

              <InputField
                label="Protocol / Subject"
                icon={<MessageSquare size={16} />}
                name="subject"
                value={formdata.subject}
                onChange={(v) => setformdata({ ...formdata, subject: v })}
                focused={focused === "subject"}
                setFocused={setFocused}
              />

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-black tracking-widest text-zinc-500 ml-2">Message Payload</label>
                <div className={`relative transition-all duration-500 ${focused === "message" ? 'ring-2 ring-purple-500/30' : ''}`}>
                  <textarea
                    rows="4"
                    value={formdata.message}
                    onChange={(e) => setformdata({ ...formdata, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused("")}
                    placeholder="Enter details..."
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-white placeholder:text-zinc-600 focus:outline-none transition-all resize-none"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-3"
              >
                Transmit Query <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
