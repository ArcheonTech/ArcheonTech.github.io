import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { NavBar } from "@/components/ui/nav-bar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/ui/footer";
import { BackToTheTop } from "@/components/ui/back-to-the-top";
import { ClassroomVisual, DialogueVisual, EdgeVisual } from "@/components/ui/research-visual";

// three.js is a heavy import, so the marble arrives after the page does.
const Marble3D = React.lazy(() => import("@/components/ui/marble-3d"));

const PILLARS = [
  {
    title: "Designed with teachers",
    body: "Projects start in a classroom. We test during real class periods, not on a demo path.",
  },
  {
    title: "AI inside the work",
    body: "Language models that support what a teacher already does — drafting, adapting, noticing — with the teacher deciding.",
  },
  {
    title: "Built to be used",
    body: "We ship deployable systems and study them in place, under IRB protocols and with consent from each participant.",
  },
];

const CATEGORIES = [
  {
    name: "Human–AI teaching",
    visual: DialogueVisual,
    topics: ["AI-Assisted Grading", "Pedagogically Aligned LLMs"],
  },
  {
    name: "Agents at the edge",
    visual: EdgeVisual,
    topics: ["Local LLM Agents", "Agentic Educational Workflows"],
  },
  {
    name: "Classrooms & access",
    visual: ClassroomVisual,
    topics: ["In-Classroom Gamification", "Open Education"],
  },
];

export function HomePage() {
  const mailto = `mailto:davalosedu515@trinity.edu?subject=Collaboration%20with%20Marble%20Labs&body=Hi%20Prof.%20Davalos%2C%0D%0A%0D%0AI%27m%20reaching%20out%20about%20collaborating%20with%20Marble%20Labs.%0D%0A%0D%0A[Please%20describe%20your%20project%20or%20interest...]%0D%0A`;

  return (
    <>
      <NavBar />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#560591] to-[#3a0263] text-white">
        <div className="container mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">Marble Labs</h1>
            <p className="mt-4 max-w-[46ch] text-lg text-white/90 md:text-xl">
              We build learning software that holds up in a real classroom, then study what it changes.
            </p>
            <p className="mt-3 text-sm text-white/60">HCI and AI for education · Trinity University</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-[#3a0263] hover:bg-white/90">
                <a href={mailto}>Collaborate with us</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/research">
                  See our research <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="order-first mx-auto w-full max-w-[22rem] md:order-none md:max-w-none">
            <React.Suspense
              fallback={<div className="mx-auto aspect-square w-full max-w-[26rem] rounded-full bg-white/5" />}
            >
              <Marble3D className="mx-auto aspect-square w-full max-w-[26rem]" />
            </React.Suspense>
          </div>
        </div>
      </div>

      {/* What we do */}
      <section id="what-we-do" className="scroll-mt-24 md:scroll-mt-28" aria-label="What we do">
        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What we do</h2>
          <p className="mt-2 max-w-[62ch] text-muted-foreground">
            We design, build, and evaluate tools for teaching and learning, across computer science, psychology, and
            education.
          </p>
          <Separator className="my-8" />

          <div className="grid gap-8 md:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.title}>
                <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="scroll-mt-24 border-t md:scroll-mt-28" aria-label="Research">
        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Research</h2>
          <p className="mt-2 max-w-[62ch] text-muted-foreground">Three directions, each with a student driving it.</p>

          <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {CATEGORIES.map(({ name, visual: Visual, topics }) => (
              <div key={name} className="text-center">
                <Visual className="mx-auto w-full max-w-[15rem] text-[#560591]" />
                <h3 className="mt-6 text-lg font-semibold tracking-tight">{name}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-8">
            <p className="text-sm text-muted-foreground">
              We take students from CS, CE, Psychology, and Education.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/research">
                  All projects <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button asChild>
                <a href={mailto}>Email Prof. Davalos</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTheTop />
    </>
  );
}
