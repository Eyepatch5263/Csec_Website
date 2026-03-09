"use client"
import { useParams } from "next/navigation"
import React from "react"
import { motion } from "framer-motion"
import { Poppins, Inria_Serif } from "next/font/google"
import Image from "next/image"
import events from "../../../utils/past_events.json"
import faqs from "../../../utils/faq.json"
import contact from "../../../utils/contact.json"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion"
import { DiscIcon as DiscordIcon, Github as GithubIcon } from "lucide-react"
import "../../../components/css/event.css"

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})



const Event = () => {
  const params = useParams()
  const { eventId: eventName } = params
  const event = events.find((event) => event.event === eventName)

  return (
    <section className={`event-section ${poppins.variable}`}>
      <div className="event-container">
        <motion.div
          className="event-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="event-image-container">
            <Image
              src={event?.image || "/placeholder.svg"}
              alt={event?.event}
              layout="fill"
              objectFit="cover"
              className="event-image"
            />
          </div>
          <h1 className={`event-title ${poppins.className}`}>{event?.event}</h1>
        </motion.div>

        <motion.div
          className="event-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="event-type-date">
            <p className={``}>{event?.event_type}</p>
            <div className="divider"></div>
            <p className={``}>{event?.long_date}</p>
          </div>
          <p className={`event-description text-lg leading-relaxed`}>{event?.long_desc}</p>
        </motion.div>

        <motion.div
          className="event-faq"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={`section-title ${poppins.className}`}>FAQs</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs[event?.event]?.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className={` text-lg font-medium`}>
                  {faq.faq_ques}
                </AccordionTrigger>
                <AccordionContent className={` text-base leading-relaxed pt-2 pb-4 px-4`}>
                  {faq.faq_ans}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="event-contacts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className={`section-title ${poppins.className}`}>Contacts</h2>
          <div className="contacts-list">
            {contact.map((contact, index) => (
              <div key={index} className="contact-item">
                {contact.discord && (
                  <>
                    <DiscordIcon className="contact-icon" />
                    <p className={``}>{contact.discord}</p>
                  </>
                )}
                {contact.github && (
                  <>
                    <GithubIcon className="contact-icon" />
                    <a href={contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {contact.github.replace('https://github.com/', '')}
                    </a>
                  </>
                )}
                <div className="divider"></div>
                <p className={``}>{contact.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Event