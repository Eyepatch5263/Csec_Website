"use client";

import React, { useMemo } from "react";
import { Poppins, Inria_Serif, Sansita } from "next/font/google";
import { motion } from "framer-motion";
import eventsData from "../utils/past_events.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import "./css/events.css";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import "./css/events.css";
import Autoplay from "embla-carousel-autoplay";

const poppins = Poppins({
  subsets: ["latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const Events = () => {
  const router = useRouter();

  const EventCard = ({ event }) => (
    <Card className="event-card flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-light">{event.event}</CardTitle>
        <CardDescription className="min-h-[40px] line-clamp-2">{event.desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <img
          className="event-image mb-4"
          src={event.image || "/placeholder.svg"}
          alt={event.event}
        />
        <div className="event-date mt-auto">
          <span>Date</span>
          <span>{event.date}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => router.push(`/events/${event.event}`)}
          className="explore-button w-full"
          variant="outline"
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  );

  const events = useMemo(() => {
    return [...eventsData].sort((a, b) => {
      // Define a very far future date for "Coming soon.." to keep them at the top
      const dateA = a.date === "Coming soon.." ? new Date("2100-01-01").getTime() : new Date(a.date).getTime();
      const dateB = b.date === "Coming soon.." ? new Date("2100-01-01").getTime() : new Date(b.date).getTime();

      // Sort descending (newest/future events first, oldest events last)
      return dateB - dateA;
    });
  }, []);

  return (
    <section className={`events-section ${poppins.variable} `}>
      <div className="events-container">
        <motion.div
          className="events-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-5xl font-bold ${poppins.className}`}>EVENTS</h1>
          <p className={`text-xl text-gray-400 `}>
            Discover our exciting events and activities
          </p>
        </motion.div>

        <div className="events-grid">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full overflow-hidden"
          >
            <CarouselContent>
              {events.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3 lg:basis-[26%] pl-4"
                >
                  <div className="p-1 h-full">
                    <EventCard event={event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Events;
