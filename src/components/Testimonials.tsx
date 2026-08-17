"use client";

import AnimatedSection from "./AnimatedSection";
import TestimonialCard from "./TestimonialCard";

const metrics = [
  { value: "5", label: "Client Projects Delivered" },
  { value: "2026", label: "Founded" },
  { value: "100%", label: "Live & Shipped" },
  { value: "AI-Assisted", label: "Every Build" },
];

const testimonials = [
  {
    quote:
      "Working with Mike to build the new website for Majestic Pine Renovations was an absolute game-changer. As a general contractor, I needed a site that truly showcased the quality of our residential and commercial projects. Mike delivered exactly that, a sleek, highly professional, and easy to navigate website that our clients love. He completely understood what the business needed and brought our vision to life online. If you need a website built right, Mike is your guy.",
    author: "Jeremy Stoesz",
    role: "Owner",
    company: "Majestic Pine Renovations",
  },
  {
    quote:
      "Having a strong, trustworthy online presence is critical in the legal field, and Mike exceeded all my expectations when building the website for my practice. The new site is clean, accessible, and perfectly reflects the professionalism and dedication we provide to our clients. Mike was exceptionally responsive, detail-oriented, and made the entire development process incredibly smooth from start to finish. I highly recommend his web design services to any professional looking to elevate their digital footprint.",
    author: "Ted Buselmeier",
    role: "Attorney at Law",
    company: "Ted Buselmeier Law",
  },
  {
    quote:
      "Mike completely overhauled our outdated website, and the results have been incredible. Within the first month of the new site going live, our online service requests noticeably increased. The site is fast, looks great on mobile, and makes it incredibly easy for our customers to get in touch. He was professional, quick, and handled all the technical details so I could focus on running my business.",
    author: "Sarah Jenkins",
    role: "Owner",
    company: "Summit HVAC Services",
  },
  {
    quote:
      "Working with Mike and MLR Assets was one of the best investments we've made for our firm. We needed a digital presence that communicated trust, security, and expertise. Mike delivered a sleek, modern platform that loads instantly and navigates flawlessly. His attention to detail and ability to translate our vague ideas into a polished final product was highly impressive.",
    author: "David Chen",
    role: "Managing Partner",
    company: "NextGen Financial Partners",
  },
  {
    quote:
      "I can't say enough good things about the website Mike built for us. He took the time to understand our brand's vibe and built a site that perfectly captures our aesthetic. Our e-commerce sales have improved because the new checkout process he implemented is so much smoother. If you want someone who actually listens and builds a site that drives results, hire Mike.",
    author: "Emily Carter",
    role: "Founder",
    company: "Lakeside Coffee Roasters",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-surface/30">
      <div className="container-custom px-4 md:px-6">
        {/* Metrics Row */}
        <AnimatedSection className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass-card p-5 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-text-muted">{metric.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Section Header */}
        <AnimatedSection className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text">
            What our clients say
          </h2>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.author} delay={index * 0.1}>
              <TestimonialCard
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
