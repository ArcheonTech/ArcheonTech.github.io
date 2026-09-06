import { NavBar } from "@/components/ui/nav-bar";
import { Separator } from "@/components/ui/separator";
import { StudentCard, type StudentCardProps } from "@/components/ui/student-card";

// const asset = (p: string) => new URL(p.replace(/^\//, ""), import.meta.env.BASE_URL).toString();

// ---- Data you can customize -------------------------------------------------
const CURRENT_STUDENTS: StudentCardProps[] = [
  {
    name: "Jaden Kai Rangel",
    project: "AI-Assisted Grading",
  },
  {
    name: "Charlie Grimm",
    project: "Fine-Tuning LLMs for Pedagogical Framing and Scaffolding",
  },
];

// Alumni entries with time range and destination
type Alumni = {
  name: string;
  years: string; // e.g., "2023–2025"
  destination: string; // e.g., "M.S. CS, CMU" or "Software Engineer, Company"
};

const ALUMNI: Alumni[] = [
  { name: "Anthony Chang", years: "2024–2025", destination: "LLMs for Question Generation in Reading Comprehension Assessment" },
  { name: "Yashvitha Thatigotla", years: "2023–2025", destination: "Software Dev @ Optum" },
  { name: "Trieu Truong", years: "2025", destination: "Product Engineer Intern @ Tend" },
  { name: "Nafees-ul Haque", years: "2025", destination: "Product Management Fellow @ Product Space" },
  { name: "Tristan Van", years: "2025", destination: "Software Engineer Intern @ Capital One" },
  { name: "Vincent Liu", years: "Summer 2026", destination: "AI Home Assistant with Mesh Device Capabilities" },
];

// Gallery images for the left side panel
// const LAB_PHOTOS = [
//   "lab/group-1.jpg",
//   "lab/group-2.jpg",
//   "lab/group-3.jpg",
//   "lab/group-4.jpg",
// ];
// ----------------------------------------------------------------------------

export function StudentsPage() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left sidebar: photo gallery */}
          {/* <aside className="lg:col-span-4 self-start lg:sticky lg:top-24">
            <section className="rounded-lg border p-4">
              <h2 className="text-lg font-semibold tracking-tight">Lab Photos</h2>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {LAB_PHOTOS.map((p) => (
                  <img
                    key={p}
                    src={p}
                    alt="Marble Lab photo"
                    className="rounded-md border object-cover h-24 w-full"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </section>
          </aside> */}

          {/* Main column */}
          <div className="lg:col-span-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Students</h1>
              <p className="mt-2 text-muted-foreground max-w-[70ch]">
                The Marble Lab is a collaborative group spanning CS, CE, Psychology, and Education. Meet our current students and alumni.
              </p>
            </header>

            <section aria-labelledby="current-students">
              <h2 id="current-students" className="text-xl font-semibold tracking-tight">Current Students</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {CURRENT_STUDENTS.map((s) => (
                  <StudentCard key={s.name} {...s} />
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            <section aria-labelledby="alumni">
              <h2 id="alumni" className="text-xl font-semibold tracking-tight">Alumni</h2>
              <ul className="mt-4 space-y-3">
                {ALUMNI.map((a) => (
                  <li key={a.name} className="rounded-lg border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium leading-tight">{a.name}</p>
                        <p className="text-sm text-muted-foreground">{a.years}</p>
                      </div>
                      <div className="text-sm">{a.destination}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
