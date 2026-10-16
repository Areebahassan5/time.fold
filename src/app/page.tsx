
"use client";

import { useState } from "react";

type Era = {
  id: string;
  year: string;
  name: string;
  subtitle: string;
  emoji: string;
  location: string;
  description: string;
  color: string;
  accent: string;
  facts: string[];
  artifact: string;
};

const eras: Era[] = [
  {
    id: "egypt",
    year: "2560 BCE",
    name: "Ancient Egypt",
    subtitle: "Whispers of the Pharaohs",
    emoji: "𓂀",
    location: "Giza, Ancient Egypt",
    description:
      "Walk beneath colossal pyramids, discover the secrets of the Nile, and enter a civilization that transformed stone into eternity.",
    color: "from-amber-950 via-orange-950 to-[#24142c]",
    accent: "#e9b96e",
    facts: [
      "The Great Pyramid was built during the reign of Khufu.",
      "The Nile was essential to farming, trade, and everyday life.",
      "Ancient Egyptian writing included hieroglyphic symbols.",
    ],
    artifact: "The Golden Scarab",
  },
  {
    id: "rome",
    year: "80 CE",
    name: "Imperial Rome",
    subtitle: "An Empire in Motion",
    emoji: "🏛️",
    location: "Rome, Roman Empire",
    description:
      "Enter a world of marble temples, bustling markets, legendary arenas, and engineering that shaped cities for centuries.",
    color: "from-red-950 via-rose-950 to-[#221525]",
    accent: "#e9a58e",
    facts: [
      "The Colosseum opened around 80 CE.",
      "Roman roads connected distant parts of the empire.",
      "Aqueducts transported water to many Roman settlements.",
    ],
    artifact: "The Emperor's Coin",
  },
  {
    id: "renaissance",
    year: "1504 CE",
    name: "The Renaissance",
    subtitle: "When Ideas Became Art",
    emoji: "🎨",
    location: "Florence, Italy",
    description:
      "Step into studios filled with sketches, sculptures, scientific curiosity, and extraordinary artistic ambition.",
    color: "from-emerald-950 via-teal-950 to-[#171e2c]",
    accent: "#9bd4bc",
    facts: [
      "Florence became an important Renaissance cultural center.",
      "Leonardo da Vinci explored art, engineering, and anatomy.",
      "Printing helped ideas circulate across Europe.",
    ],
    artifact: "The Artist's Compass",
  },
  {
    id: "future",
    year: "3026 CE",
    name: "Tomorrow's Earth",
    subtitle: "A Future Not Yet Written",
    emoji: "✧",
    location: "Earth, imagined future",
    description:
      "Travel into an imagined future of floating gardens, luminous cities, orbital observatories, and new possibilities for humanity.",
    color: "from-indigo-950 via-violet-950 to-[#101c39]",
    accent: "#b8b4ff",
    facts: [
      "This is an imaginative future, not a historical prediction.",
      "Future cities may explore cleaner energy and greener design.",
      "Scientific discovery can change how people live and travel.",
    ],
    artifact: "The Chrono Crystal",
  },
];

const stars = Array.from({ length: 35 }, (_, i) => ({
  left: `${(i * 37 + 11) % 97}%`,
  top: `${(i * 53 + 7) % 94}%`,
  delay: `${(i % 7) * 0.4}s`,
  size: i % 5 === 0 ? 4 : 2,
}));

export default function TimeFold() {
  const [activeEra, setActiveEra] = useState("egypt");
  const [visited, setVisited] = useState<string[]>([]);
  const [collected, setCollected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [showPortal, setShowPortal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answer, setAnswer] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [showStory, setShowStory] = useState(false);
  const [savedNote, setSavedNote] = useState("");
  const [note, setNote] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  const era = eras.find((item) => item.id === activeEra) ?? eras[0];

  const filteredEras = eras.filter((item) =>
    `${item.name} ${item.year} ${item.subtitle} ${item.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function travelTo(id: string) {
    setActiveEra(id);
    setVisited((old) => (old.includes(id) ? old : [...old, id]));
    setShowPortal(false);
    setShowStory(false);
    setShowQuiz(false);
    setQuizResult("");
    setAnswer("");
  }

  function collectArtifact() {
    setCollected((old) =>
      old.includes(era.id) ? old : [...old, era.id]
    );
  }

  function saveJournal() {
    if (!note.trim()) return;
    setSavedNote(note.trim());
    setNote("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#100e1d] text-[#f7f0ff] selection:bg-violet-400 selection:text-[#171024]">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        @keyframes tf-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes tf-glow {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }
        @keyframes tf-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes tf-rise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tf-float { animation: tf-float 6s ease-in-out infinite; }
        .tf-glow { animation: tf-glow 3s ease-in-out infinite; }
        .tf-rise { animation: tf-rise .45s ease-out both; }
        .tf-orbit { animation: tf-spin 35s linear infinite; }
        .tf-orbit-reverse { animation: tf-spin 24s linear infinite reverse; }
        .tf-glass {
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.11);
          backdrop-filter: blur(18px);
        }
      `}</style>

      <nav className="relative z-20 flex items-center justify-between gap-4 border-b border-white/[.08] px-5 py-5 md:px-10 lg:px-16">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-400/10 text-2xl text-violet-200">
            ◉
          </span>
          <span>
            <span className="block text-xl font-black tracking-[.14em]">
              TIMEFOLD
            </span>
            <span className="block text-[9px] uppercase tracking-[.32em] text-violet-200/60">
              Museum beyond time
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          <a className="transition hover:text-white" href="#journeys">Journeys</a>
          <a className="transition hover:text-white" href="#timeline">Timeline</a>
          <a className="transition hover:text-white" href="#archive">Archive</a>
        </div>

        <button
          onClick={() => setShowNotes(!showNotes)}
          className="rounded-full border border-violet-200/20 px-4 py-2.5 text-sm transition hover:bg-violet-200/10"
        >
          ✧ My journal
        </button>
      </nav>

      <section id="home" className="relative isolate min-h-[660px]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(113,78,180,.23),transparent_53%),radial-gradient(ellipse_at_10%_80%,rgba(54,101,143,.13),transparent_45%)]" />

        {stars.map((star, i) => (
          <span
            key={i}
            className="tf-glow pointer-events-none absolute rounded-full bg-violet-100"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:px-16">
          <div className="relative z-10">
            <p className="mb-7 inline-flex items-center gap-3 rounded-full border border-violet-300/20 bg-violet-200/[.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[.3em] text-violet-200 md:text-xs">
              <span className="h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_14px_#c4b5fd]" />
              The impossible is one step away
            </p>

            <h1 className="max-w-2xl text-6xl font-black leading-[.98] tracking-[-.055em] md:text-8xl">
              Every era
              <br />
              holds a
              <br />
              <span className="bg-gradient-to-r from-[#e0c6ff] via-[#b6a5ff] to-[#8fceeb] bg-clip-text text-transparent">
                secret.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-white/55 md:text-lg">
              What if history wasn't a page to read, but a world you could
              step inside? Open the portals. Follow the clues. Discover the
              stories time almost forgot.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setShowPortal(true);
                  document.getElementById("journeys")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-full bg-[#d6c2ff] px-7 py-4 font-bold text-[#211735] shadow-[0_0_35px_rgba(181,151,255,.2)] transition hover:-translate-y-1 hover:bg-white"
              >
                Enter the time portal ↗
              </button>
              <a
                href="#timeline"
                className="rounded-full border border-white/15 px-7 py-4 font-semibold transition hover:border-violet-200/60 hover:bg-white/5"
              >
                Explore the timeline
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-7">
              <div>
                <p className="text-2xl font-black">{eras.length}</p>
                <p className="mt-1 text-xs text-white/40">Open worlds</p>
              </div>
              <div>
                <p className="text-2xl font-black">{visited.length}</p>
                <p className="mt-1 text-xs text-white/40">Worlds explored</p>
              </div>
              <div>
                <p className="text-2xl font-black">{collected.length}</p>
                <p className="mt-1 text-xs text-white/40">Artifacts found</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[390px] w-full max-w-[500px] items-center justify-center md:min-h-[520px]">
            <div className="tf-orbit absolute h-[310px] w-[310px] rounded-full border border-dashed border-violet-200/20 md:h-[440px] md:w-[440px]" />
            <div className="tf-orbit-reverse absolute h-[260px] w-[260px] rounded-full border border-cyan-200/20 md:h-[360px] md:w-[360px]" />

            <div className="absolute h-[270px] w-[270px] rounded-full bg-violet-500/10 blur-[65px] md:h-[380px] md:w-[380px]" />

            <div className="tf-float relative flex h-56 w-56 items-center justify-center rounded-full border border-violet-200/35 bg-gradient-to-br from-violet-200/20 via-indigo-500/10 to-cyan-200/10 shadow-[0_0_100px_rgba(155,120,255,.15)] backdrop-blur-md md:h-72 md:w-72">
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-dashed border-violet-100/20" />
              <div className="absolute h-36 w-36 rounded-full bg-violet-300/15 blur-2xl md:h-48 md:w-48" />
              <span className="relative text-8xl text-violet-100 drop-shadow-[0_0_30px_rgba(196,181,253,.65)] md:text-9xl">
                ◉
              </span>
              <span className="absolute -right-4 top-10 text-3xl text-cyan-200">✧</span>
              <span className="absolute -bottom-1 left-9 text-2xl text-pink-200">✦</span>
            </div>

            <div className="tf-glass absolute left-0 top-[14%] rounded-2xl p-4 md:left-2">
              <p className="text-[9px] uppercase tracking-[.2em] text-violet-200/70">Coordinates</p>
              <p className="mt-1 text-sm font-bold">00 : ∞ : 26</p>
            </div>
            <div className="tf-glass absolute bottom-[12%] right-0 rounded-2xl p-4 md:right-1">
              <p className="text-[9px] uppercase tracking-[.2em] text-cyan-100/60">Temporal status</p>
              <p className="mt-1 text-sm font-bold">Beyond the present</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-white/[.018] px-5 py-7 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.3em] text-violet-200/60">Your mission</p>
            <p className="mt-2 text-lg font-semibold">Explore. Observe. Remember.</p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/45">
            Each portal holds a different world. Discover historical facts,
            collect a signature artifact, and build your own time-travel journal.
          </p>
          <a href="#journeys" className="text-sm font-bold text-violet-200 hover:text-white">Choose a portal ↗</a>
        </div>
      </section>

      <section id="journeys" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.3em] text-violet-200/60">01 / Select your destination</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Worlds between
              <br />
              <span className="text-violet-200">the seconds.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/45">
            From forgotten civilizations to imagined futures, your next
            discovery is only a portal away.
          </p>
        </div>

        <div className="mt-9">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search an era, year or destination..."
            className="w-full rounded-2xl border border-white/10 bg-white/[.035] px-5 py-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-300/50 md:max-w-md"
          />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredEras.map((item, index) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-[1.8rem] border transition duration-300 hover:-translate-y-2 ${
                activeEra === item.id
                  ? "border-violet-200/50 shadow-[0_10px_50px_rgba(145,105,220,.12)]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className={`relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br ${item.color}`}>
                <div className="absolute h-36 w-36 rounded-full border border-white/15 transition duration-700 group-hover:scale-125" />
                <div className="absolute h-48 w-48 rounded-full border border-white/[.07]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.12),transparent_65%)]" />
                <span className="relative text-7xl drop-shadow-2xl transition duration-500 group-hover:scale-110">
                  {item.emoji}
                </span>
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
                  {item.year}
                </span>
                {visited.includes(item.id) && (
                  <span className="absolute right-4 top-4 text-sm text-emerald-200">✓ Explored</span>
                )}
              </div>

              <div className="bg-[#171426] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.18em]" style={{ color: item.accent }}>
                  {item.subtitle}
                </p>
                <h3 className="mt-3 text-xl font-black">{item.name}</h3>
                <p className="mt-2 text-xs text-white/40">{item.location}</p>
                <p className="mt-4 min-h-[72px] text-sm leading-6 text-white/50">{item.description}</p>
                <button
                  onClick={() => {
                    travelTo(item.id);
                    document.getElementById("era-detail")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 w-full rounded-xl border border-white/10 py-3 text-sm font-bold transition hover:border-violet-200/50 hover:bg-violet-200/10"
                >
                  Enter this world ↗
                </button>
              </div>
            </article>
          ))}

          {filteredEras.length === 0 && (
            <p className="rounded-2xl border border-white/10 p-6 text-sm text-white/50 sm:col-span-2 xl:col-span-4">
              No portals found. Try searching for Egypt, Rome, Renaissance, or future.
            </p>
          )}
        </div>
      </section>

      <section id="era-detail" className={`relative border-y border-white/10 bg-gradient-to-br ${era.color}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(255,255,255,.08),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-10 md:py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[.3em]" style={{ color: era.accent }}>
              02 / Your selected timeline
            </p>
            <span className="mt-7 text-7xl md:text-8xl">{era.emoji}</span>
            <p className="mt-7 text-sm text-white/55">{era.location} · {era.year}</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">{era.name}</h2>
            <p className="mt-4 text-lg italic text-white/70">{era.subtitle}</p>
            <p className="mt-6 max-w-lg leading-8 text-white/60">{era.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setShowStory(!showStory)}
                className="rounded-full px-6 py-3 font-bold text-[#191426] transition hover:bg-white"
                style={{ backgroundColor: era.accent }}
              >
                {showStory ? "Close field notes" : "Open field notes"} ✧
              </button>
              <button
                onClick={collectArtifact}
                disabled={collected.includes(era.id)}
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {collected.includes(era.id) ? "✓ Artifact collected" : "Collect artifact"}
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-black/15 p-6 backdrop-blur-xl md:p-9">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.25em] text-white/40">Expedition dossier</p>
                <h3 className="mt-2 text-2xl font-black">Secrets of this era</h3>
              </div>
              <span className="text-3xl">⌘</span>
            </div>

            <div className="mt-6 space-y-5">
              {era.facts.map((fact, index) => (
                <div key={fact} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 text-sm font-bold" style={{ color: era.accent }}>
                    0{index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-7 text-white/65">{fact}</p>
                </div>
              ))}
            </div>

            {showStory && (
              <div className="tf-rise mt-7 rounded-2xl border border-white/10 bg-white/[.05] p-5">
                <p className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: era.accent }}>Field notes</p>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Imagine the sounds, textures, and everyday lives of this
                  world. Look beyond its monuments: the people, their
                  inventions, and the choices they made are part of its story.
                  {era.id === "future" && " This destination is speculative, inviting you to imagine what humanity might build."}
                </p>
                <p className="mt-4 text-xs text-white/40">Signature artifact: {era.artifact}</p>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-xs text-white/40">Portal coordinates</span>
              <span className="text-sm font-bold tracking-widest" style={{ color: era.accent }}>{era.year}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.3em] text-violet-200/60">03 / The river of time</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">One timeline. Infinite stories.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/45">
            Choose a point in history to open its portal. Each destination
            has a different story waiting to be discovered.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute bottom-8 left-[21px] top-8 w-px bg-gradient-to-b from-amber-300/50 via-emerald-300/40 to-violet-300/60 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-10">
            {eras.map((item, index) => (
              <div key={item.id} className={`relative flex gap-6 pl-14 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:flex-row-reverse md:pl-12"}`}>
                <button
                  onClick={() => {
                    travelTo(item.id);
                    document.getElementById("era-detail")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label={`Travel to ${item.name}`}
                  className="absolute left-[9px] top-7 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-violet-200/70 bg-[#100e1d] text-[10px] text-violet-100 shadow-[0_0_20px_rgba(196,181,253,.25)] transition hover:scale-125 md:left-auto md:right-[-12px]"
                  style={index % 2 !== 0 ? { left: "-12px", right: "auto" } : undefined}
                >
                  ✦
                </button>
                <button
                  onClick={() => {
                    travelTo(item.id);
                    document.getElementById("era-detail")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="tf-glass w-full rounded-3xl p-6 text-left transition hover:border-violet-200/40 hover:bg-white/[.07]"
                >
                  <p className="text-xs font-bold tracking-[.2em] text-violet-200/65">{item.year}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-xl font-black">{item.name}</h3>
                      <p className="mt-1 text-sm text-white/45">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/55">{item.location}</p>
                  <p className="mt-4 text-xs font-bold text-violet-200">Open timeline point ↗</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#171426]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-10 lg:grid-cols-2 lg:px-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.3em] text-violet-200/60">04 / Test your knowledge</p>
            <h2 className="mt-4 text-4xl font-black md:text-5xl">The timekeeper's riddle.</h2>
            <p className="mt-5 leading-7 text-white/50">
              Every explorer must solve a mystery. Can you identify the
              civilization behind this legendary landmark?
            </p>
            <div className="tf-float mt-8 flex h-40 items-center justify-center rounded-3xl border border-amber-200/15 bg-gradient-to-br from-amber-950/60 to-violet-950/60 text-7xl">
              🏜️
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/[.035] p-6 md:p-9">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-200/70">Mystery 001</p>
            <h3 className="mt-4 text-2xl font-black leading-snug">
              Which civilization built the Great Pyramid of Giza?
            </h3>
            <div className="mt-7 space-y-3">
              {["Ancient Egyptians", "Ancient Romans", "Renaissance Italians", "The people of the future"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setAnswer(option);
                    setQuizResult("");
                  }}
                  className={`w-full rounded-2xl border p-4 text-left text-sm transition ${
                    answer === option
                      ? "border-violet-300 bg-violet-300/10 text-violet-100"
                      : "border-white/10 text-white/70 hover:border-white/25 hover:bg-white/[.04]"
                  }`}
                >
                  <span className="mr-3 text-violet-200">{answer === option ? "◉" : "○"}</span>
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuizResult(answer === "Ancient Egyptians" ? "Correct! The Great Pyramid was built during the reign of Pharaoh Khufu. +10 explorer points!" : answer ? "Not quite! Try again. The answer is connected to the ancient civilization along the Nile." : "Choose an answer first.")}
              className="mt-6 rounded-full bg-violet-200 px-6 py-3 font-bold text-[#211735] transition hover:bg-white"
            >
              Reveal my result ✧
            </button>

            {quizResult && (
              <p className={`tf-rise mt-5 rounded-2xl p-4 text-sm leading-6 ${quizResult.startsWith("Correct") ? "bg-emerald-400/10 text-emerald-200" : "bg-amber-300/10 text-amber-100"}`}>
                {quizResult}
              </p>
            )}
          </div>
        </div>
      </section>

      <section id="archive" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28 lg:px-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.3em] text-violet-200/60">05 / Your discoveries</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">The artifact archive.</h2>
          </div>
          <p className="text-sm text-white/45">{collected.length} of {eras.length} artifacts collected</p>
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-300 to-cyan-200 transition-all duration-500"
            style={{ width: `${(collected.length / eras.length) * 100}%` }}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {eras.map((item) => {
            const hasArtifact = collected.includes(item.id);
            return (
              <div key={item.id} className={`rounded-3xl border p-6 transition ${hasArtifact ? "border-violet-200/30 bg-violet-300/[.07]" : "border-white/[.07] bg-white/[.02]"}`}>
                <div className="flex h-28 items-center justify-center rounded-2xl bg-white/[.035] text-5xl">
                  {hasArtifact ? item.emoji : "🔒"}
                </div>
                <p className="mt-5 text-xs text-white/40">{item.year}</p>
                <h3 className="mt-2 text-lg font-bold">{hasArtifact ? item.artifact : "Undiscovered relic"}</h3>
                <p className="mt-2 text-sm text-white/45">{item.name}</p>
                {hasArtifact ? (
                  <p className="mt-4 text-xs font-bold text-emerald-200">✓ Added to collection</p>
                ) : (
                  <button
                    onClick={() => travelTo(item.id)}
                    className="mt-4 text-xs font-bold text-violet-200 hover:text-white"
                  >
                    Visit this era to unlock ↗
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/[.08] to-cyan-400/[.05] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-200/60">Explorer status</p>
              <h3 className="mt-2 text-2xl font-black">
                {collected.length === 4 ? "Master of Time ✨" : collected.length >= 2 ? "Keeper of Memories" : visited.length > 0 ? "Curious Time Traveler" : "Your journey awaits"}
              </h3>
              <p className="mt-2 text-sm text-white/45">Explore portals and collect artifacts to complete your archive.</p>
            </div>
            <button
              onClick={() => {
                setShowPortal(true);
                document.getElementById("journeys")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-violet-200 px-6 py-3 font-bold text-[#211735] hover:bg-white"
            >
              Continue exploring ↗
            </button>
          </div>
        </div>
      </section>

      {showPortal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#080711]/90 p-5 backdrop-blur-xl">
          <div className="tf-rise relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-violet-200/20 bg-[#171426] p-8 text-center shadow-[0_0_100px_rgba(139,92,246,.18)] md:p-10">
            <button
              onClick={() => setShowPortal(false)}
              aria-label="Close portal"
              className="absolute right-5 top-5 rounded-full border border-white/10 px-3 py-1.5 text-white/60 hover:bg-white/10"
            >
              ✕
            </button>
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-violet-200/30 bg-violet-300/10 text-5xl text-violet-100 shadow-[0_0_40px_rgba(167,139,250,.2)]">
              ◉
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[.3em] text-violet-200/60">Temporal gateway</p>
            <h2 className="mt-3 text-3xl font-black">Choose your destination.</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">Every world holds a different piece of the puzzle.</p>
            <div className="mt-7 grid grid-cols-2 gap-3">
              {eras.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    travelTo(item.id);
                    document.getElementById("era-detail")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-violet-200/40 hover:bg-violet-300/[.08]"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="mt-3 block text-sm font-bold">{item.name}</span>
                  <span className="mt-1 block text-xs text-white/40">{item.year}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showNotes && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/65 backdrop-blur-sm" onClick={() => setShowNotes(false)}>
          <aside
            className="tf-rise h-full w-full max-w-md overflow-y-auto border-l border-violet-200/15 bg-[#151222] p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.25em] text-violet-200/60">Personal collection</p>
                <h2 className="mt-2 text-3xl font-black">Time journal.</h2>
              </div>
              <button onClick={() => setShowNotes(false)} className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10">Close ✕</button>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/50">
              Record your favorite discovery or a thought from your latest expedition.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Today I discovered..."
              rows={6}
              className="mt-6 w-full resize-y rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm leading-6 outline-none placeholder:text-white/25 focus:border-violet-300/50"
            />
            <button onClick={saveJournal} className="mt-3 w-full rounded-full bg-violet-200 py-3 font-bold text-[#211735] hover:bg-white">
              Save journal entry
            </button>

            {savedNote && (
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[.04] p-5">
                <p className="text-xs font-bold uppercase tracking-[.2em] text-violet-200/60">Latest saved entry</p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/75">{savedNote}</p>
                <button onClick={() => setSavedNote("")} className="mt-4 text-xs text-white/40 hover:text-red-200">Delete entry</button>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="font-bold">Your explored worlds</h3>
              <div className="mt-4 space-y-3">
                {eras.filter((item) => visited.includes(item.id)).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white/[.035] p-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-xs text-white/40">{item.year}</p>
                    </div>
                    <span className="ml-auto text-emerald-200">✓</span>
                  </div>
                ))}
                {visited.length === 0 && <p className="text-sm text-white/40">Your first discovery is waiting.</p>}
              </div>
            </div>
          </aside>
        </div>
      )}

      <footer className="border-t border-white/[.08] px-5 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-black tracking-[.14em]">TIMEFOLD ◉</p>
            <p className="mt-2 text-xs text-white/35">A little wonder at the edge of time.</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/35 md:text-right">
            Historical facts are presented for learning. Tomorrow's Earth is
            fictional, and the portal experience is an imaginative interactive museum.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/[.07] pt-5 text-center text-xs text-white/25">
          TIMEFOLD · Explore the past. Imagine the future. Discover the unknown.
        </div>
      </footer>
    </main>
  );
}
