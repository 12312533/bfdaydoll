/* =====================================================
   KONFIGURASI — ganti semua konten cukup di sini
   ===================================================== */
const siteConfig = {
  boyfriendName: "You",
  date: "03 • 10 • 2026",
  heroKicker: "A little story about us",
  heroTitle: "Happy Boyfriend Day!",
  heroSubtitle: "A little something for you...",
  songTitle: "About You",
  songArtist: "The 1975 - ",
  audio: "The 1975 - About You.mp3",

  heroBg: "moment 1.jpg",
  albumArt: "moment 2.jpg",
  letter: "To the person who makes ordinary days feel a little more special...\n\nThank you for being my calm, my favorite notification, and my safest place. Every small moment with you is one I keep.",
  signature: "Yours, always",
  video: "couple.mp4",
  photos: ["moment 1.jpg", "moment 2.jpg", "moment 3.jpg", "moment 4.jpg", "moment 5.jpg", "moment 6.jpg"],
  notes: ["our first day", "that smile", "little things"],
  reasons: ["Your smile", "Your little things", "The way you make ordinary moments special"],
  coupons: [
    { title: "Dinner Date", text: "One dinner date, your choice.", icon: "i-heart" },
    { title: "Movie Night", text: "One cozy movie night together.", icon: "i-play" },
    { title: "Unlimited Hugs", text: "Redeem whenever you need one.", icon: "i-bear" }
  ],
  finalTitle: "Happy Boyfriend Day!",
  finalMessage: "I Love You",
  finalSub: "Thank you for being part of my story."
};

/* ===== Helper ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = matchMedia("(hover: none)").matches;
const hasGsap = typeof gsap !== "undefined";
const hasST = hasGsap && typeof ScrollTrigger !== "undefined";
if (hasST) gsap.registerPlugin(ScrollTrigger);
const heartSvg = (cls = "") => `<svg class="ic ${cls}"><use href="#i-heart"/></svg>`;
const PAL = ["#C9A45C", "#e0526f", "#F6EBDD", "#DCC8AE"];

/* ===== Render konten ===== */
function fill() {
  const c = siteConfig;
  $("#heroKicker").textContent = c.heroKicker;
  $("#heroTitle").innerHTML = c.heroTitle.split(" ").map(w => `<span class="w" style="display:inline-block">${w}</span>`).join(" ");
  $("#heroSub").textContent = c.heroSubtitle;
  $("#heroDate").textContent = c.date;
  $("#moodBg").style.backgroundImage = `url(${c.heroBg})`;
  $("#songArt").src = c.albumArt;
  $("#songTitle").textContent = c.songTitle;
  $("#artist").textContent = c.songArtist;
  $("#msgPhoto").src = c.photos[0];
  $("#letterHi").textContent = `Dear ${c.boyfriendName},`;
  $("#letterSign").textContent = c.signature;
  $("#memVideo").src = c.video;
  $("#bgm").src = c.audio; $("#finaleAudio").src = c.finaleAudio;
  $("#fTitle").textContent = c.finalTitle; $("#fMsg").textContent = c.finalMessage;
  $("#fDate").textContent = c.date; $("#fSub").textContent = c.finalSub;

  // Scrapbook: 3 polaroid + 2 foto kecil, posisi tetap (di CSS), tanpa random
  $("#board").innerHTML = [1, 2, 3, 4, 5].map((n, i) =>
    `<figure class="pol" tabindex="0"><img src="${c.photos[n % c.photos.length]}" alt="Kenangan ${i + 1}" loading="lazy"><figcaption>${c.notes[i] || ""}</figcaption></figure>`).join("");
  $("#reasons").innerHTML = c.reasons.map(r => `<li>${r}</li>`).join("");

  // Film roll: satu set dua kali (loop mulus). Tanpa lazy agar frame tidak kosong saat bergulir.
  const set = c.photos.map((p, i) => `<div class="frame-f"><img src="${p}" alt="Frame film ${i + 1}"></div>`).join("");
  $("#filmTrack").innerHTML = set + set;

  $("#cards").innerHTML = c.coupons.map(k =>
    `<li><button class="env" aria-expanded="false" aria-label="Buka amplop ${k.title}">
      <span class="e-back"></span>
      <span class="e-paper"><h3>${k.title}</h3><p>${k.text}</p><svg class="ic"><use href="#${k.icon}"/></svg></span>
      <span class="e-front"></span><span class="e-flap"></span>
      <span class="e-seal">${heartSvg()}</span></button></li>`).join("");

  $("#nav").innerHTML = [1, 2, 3, 4, 5, 6, 7].map(n => `<li><a href="#s${n}" aria-label="Bagian ${n}">0${n}</a></li>`).join("");

  // Elemen dekoratif deterministik (tanpa Math.random agar konsisten)
  $("#petals").innerHTML = Array.from({ length: isTouch ? 6 : 10 }, (_, i) =>
    `<span class="petal" style="--x:${(i * 11 + 4) % 96}%;--s:${14 + (i % 4) * 6}px;--c:${PAL[i % 2 ? 1 : 0]};--d:${11 + (i % 5) * 2}s;--dl:${-i * 1.7}s">${heartSvg()}</span>`).join("");
  $("#rise").innerHTML = Array.from({ length: isTouch ? 7 : 12 }, (_, i) =>
    `<span class="rz" style="--x:${(i * 9 + 6) % 94}%;--s:${16 + (i % 3) * 8}px;--c:${PAL[i % 3]};--d:${7 + (i % 4) * 1.5}s;--dl:${-i * 1.1}s">${heartSvg()}</span>`).join("");
}

/* ===== Debu halus di canvas (ringan, berhenti saat tab tersembunyi) ===== */
function dust() {
  const cv = $("#dust"), ctx = cv.getContext("2d");
  let W, H, run = true;
  const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  size(); addEventListener("resize", size);
  const P = Array.from({ length: isTouch ? 22 : 46 }, (_, i) => ({ x: (i * 97) % innerWidth, y: (i * 53) % innerHeight, r: (i % 5) * .35 + .5, v: (i % 4) * .07 + .1, d: i }));
  function tick() {
    if (!run) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "rgba(232,198,131,.45)";
    P.forEach(o => {
      o.y -= o.v; o.x += Math.sin((o.y + o.d * 20) / 60) * .25;
      if (o.y < -5) { o.y = H + 5; o.x = (o.x * 7 + 131) % W; }
      ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, 7); ctx.fill();
    });
    if (!reduced) requestAnimationFrame(tick);
  }
  document.addEventListener("visibilitychange", () => { run = !document.hidden; if (run) tick(); });
  tick();
}

/* ===== Loader + animasi pembuka (GSAP timeline, fallback aman) ===== */
function intro() {
  $("#loader").classList.add("done");
  if (!hasGsap || reduced) return;
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.from(".hook .bg", { opacity: 0, duration: 2 })
    .from("#sheet", { scaleY: .04, opacity: 0, transformOrigin: "50% 0%", duration: 2, ease: "power3.out" }, .5)   // kertas terbuka
    .from("#heroKicker", { opacity: 0, y: 20, duration: 1.2 }, "-=.6")
    .from("#heroTitle .w", { opacity: 0, y: 36, duration: 1.4, stagger: .25 }, "-=.3")
    .from("#heroSub", { opacity: 0, y: 18, duration: 1.2 }, "+=.1")
    .from("#heroDate", { opacity: 0, letterSpacing: "1em", duration: 1.6 }, "+=.1")
    .from(".seal", { scale: 3, opacity: 0, duration: .9, ease: "back.out(2)" }, "-=.6")
    .from(".hook .mascot", { opacity: 0, duration: 1.2, stagger: .25 }, "-=.8")
    .from(".scroll-ind", { opacity: 0, duration: 1 });
}
function boot() {
  const min = new Promise(r => setTimeout(r, 1600));
  const load = new Promise(r => addEventListener("load", r));
  Promise.race([Promise.all([min, load]), new Promise(r => setTimeout(r, 4500))]).then(intro);
}

/* ===== Audio global + player ===== */
const bgm = $("#bgm"), fin = $("#finaleAudio");
const fmt = s => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
function setPlaying(on) {
  $("#s2").classList.toggle("playing", on);
  $("#audioState").textContent = on ? "Now Playing" : "Music Paused";
  $("#playBtn").setAttribute("aria-label", on ? "Jeda lagu" : "Putar lagu");
}
function toggleMusic() {
  if (bgm.paused) bgm.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  else { bgm.pause(); setPlaying(false); }
}
function audio() {
  bgm.volume = fin.volume = .7;
  $("#playBtn").onclick = $("#audioBtn").onclick = toggleMusic;
  $("#prevBtn").onclick = () => { bgm.currentTime = 0; };
  $("#nextBtn").onclick = () => { if (bgm.duration) bgm.currentTime = Math.min(bgm.duration - .1, bgm.currentTime + 10); };
  $("#vol").oninput = e => { bgm.volume = fin.volume = +e.target.value; };
  $("#muteBtn").onclick = () => { bgm.muted = fin.muted = !bgm.muted; $("#muteUse").setAttribute("href", bgm.muted ? "#i-mute" : "#i-vol"); };
  $("#like").onclick = e => { const b = e.currentTarget; b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true"); };
  bgm.addEventListener("loadedmetadata", () => $("#dur").textContent = fmt(bgm.duration));
  bgm.addEventListener("timeupdate", () => {
    if (!bgm.duration) return;
    $("#trackBar").style.transform = `scaleX(${bgm.currentTime / bgm.duration})`;
    $("#cur").textContent = fmt(bgm.currentTime);
  });
  $("#bar").addEventListener("click", e => {
    const r = e.currentTarget.getBoundingClientRect();
    if (bgm.duration) bgm.currentTime = ((e.clientX - r.left) / r.width) * bgm.duration;
  });
}

/* ===== Surat: typewriter berurutan ===== */
function letter() {
  const body = $("#letterBody"), caret = $(".caret"), hi = $("#letterHi"), sign = $("#letterSign");
  const text = siteConfig.letter; let started = false;
  hi.style.opacity = sign.style.opacity = 0;
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || started) return;
    started = true; io.disconnect();
    hi.style.transition = sign.style.transition = "opacity 1.2s"; hi.style.opacity = 1;
    let i = 0;
    (function step() {
      if (i < text.length) { body.textContent += text[i++]; setTimeout(step, reduced ? 0 : 38); }
      else { sign.style.opacity = 1; caret.style.transition = "opacity 2s"; setTimeout(() => caret.style.opacity = 0, 800); }
    })();
  }, { threshold: .35 });
  setTimeout(() => io.observe($(".letter")), 0);
}

/* ===== Tilt foto (desktop) ===== */
function tilt() {
  const f = $("#tilt"); if (isTouch || reduced) return;
  f.addEventListener("mousemove", e => {
    const r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    f.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  f.addEventListener("mouseleave", () => f.style.transform = "");
}

/* ===== Scrapbook ===== */
function scrapbook() {
  const pols = $$(".pol");
  pols.forEach(p => {
    const t = () => { const on = p.classList.contains("up"); pols.forEach(x => x.classList.remove("up")); if (!on) p.classList.add("up"); };
    if (isTouch) p.addEventListener("click", t);
    p.addEventListener("keydown", e => { if (e.key === "Enter") t(); });
  });
  if (!hasST || reduced) return;
  gsap.from(".pol", { scrollTrigger: { trigger: "#board", start: "top 80%", once: true }, y: 60, opacity: 0, scale: .9, duration: 1, stagger: .15, ease: "back.out(1.4)", clearProps: "transform,opacity" });
  gsap.from(".reasons li", { scrollTrigger: { trigger: "#reasons", start: "top 90%", once: true }, y: 30, opacity: 0, duration: .9, stagger: .3 });
}

/* ===== Memories: video + film roll bergulir ke bawah, loop mulus (rAF) ===== */
function memories() {
  const v = $("#memVideo"), track = $("#filmTrack"), tv = $("#tv"), GAP = 14;
  let hold = false, vis = false, pos = 0, speed = 0, last = 0, raf = 0;
  const frame = t => {
    const dt = Math.min((t - last) / 1000, .05); last = t;
    const vert = !matchMedia("(max-width:820px)").matches;
    const size = ((vert ? track.scrollHeight : track.scrollWidth) + GAP) / 2;   // panjang satu set
    speed += ((hold ? 0 : reduced ? 18 : 55) - speed) * Math.min(1, dt * 4);   // easing berhenti/jalan
    pos = (pos + speed * dt) % size;
    const o = pos - size;
    track.style.transform = vert ? `translate3d(0,${o}px,0)` : `translate3d(${o}px,0,0)`;
    raf = vis ? requestAnimationFrame(frame) : 0;
  };
  new IntersectionObserver(([e]) => {
    vis = e.isIntersecting;
    if (vis) { v.play().catch(() => {}); if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
    else v.pause();
  }, { threshold: .15 }).observe($("#s5"));
  const setHold = h => { hold = h; h ? v.pause() : v.play().catch(() => {}); };
  if (isTouch) tv.addEventListener("click", () => setHold(!hold));
  else { tv.addEventListener("mouseenter", () => setHold(true)); tv.addEventListener("mouseleave", () => setHold(false)); }
}

/* ===== Partikel ringan ===== */
function burst(x, y, n, spread = 90) {
  n = Math.min(n, isTouch ? 22 : 40);
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span"); s.className = "spark";
    s.textContent = i % 3 ? "♥" : "✦"; s.style.cssText = `left:${x}px;top:${y}px;color:${PAL[i % 4]}`;
    document.body.append(s);
    const a = i * 2.4, d = 30 + (i * 37 % spread);
    s.animate([{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 30}px) scale(.3)`, opacity: 0 }], { duration: 1100 + (i % 5) * 120, easing: "ease-out" }).onfinish = () => s.remove();
  }
}
function confetti(n = 60) {
  const cols = ["#C9A45C", "#F6EBDD", "#e0344f", "#DCC8AE"];
  for (let i = 0; i < Math.min(n, isTouch ? 42 : 60); i++) {
    const c = document.createElement("i"); c.className = "confetti";
    c.style.left = (i * 17 % 100) + "vw"; c.style.background = cols[i % 4];
    document.body.append(c);
    c.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translate(${(i % 7 - 3) * 24}px,${innerHeight + 40}px) rotate(${360 + i * 20}deg)` }], { duration: 3600 + (i % 6) * 400, delay: (i % 8) * 100, easing: "cubic-bezier(.3,.1,.6,1)" }).onfinish = () => c.remove();
  }
}

/* ===== Kupon: amplop terbuka, kertas keluar ===== */
function coupons() {
  $$(".env").forEach(b => b.addEventListener("click", () => {
    const on = b.classList.toggle("open"); b.setAttribute("aria-expanded", on);
    if (on) { const r = b.getBoundingClientRect(); setTimeout(() => burst(r.left + r.width / 2, r.top + r.height * .2, 16), 500); }
  }));
  if (hasST && !reduced) gsap.from(".env", { scrollTrigger: { trigger: "#cards", start: "top 85%", once: true }, y: -80, opacity: 0, rotation: -6, duration: 1.1, stagger: .2, ease: "bounce.out", clearProps: "transform,opacity" });
}

/* ===== Finale: tahan untuk memeluk ===== */
function finale() {
  const heart = $("#heart"), fill = $("#hFill"), ring = $("#ringP"), sec = $("#s7"), wrap = $("#hugWrap");
  let p = 0, holding = false, done = false, last = 0, running = false;
  const loop = t => {
    const dt = Math.min(t - last, 50); last = t;
    if (holding) p += dt / 2800; else p -= dt / 1300;         // isi ±2.8 dtk; turun perlahan
    p = Math.max(0, Math.min(1, p));
    fill.style.clipPath = `inset(${100 - p * 100}% 0 0 0)`;
    ring.style.strokeDashoffset = 289 * (1 - p);
    heart.style.setProperty("--p", p);
    wrap.classList.toggle("hugging", p > .35);
    if (p >= 1) { running = false; return climax(); }
    if (holding || p > 0) requestAnimationFrame(loop); else running = false;
  };
  const kick = () => { if (!running) { running = true; last = performance.now(); requestAnimationFrame(loop); } };
  const start = e => { e.preventDefault(); if (done) return; holding = true; try { heart.setPointerCapture(e.pointerId); } catch (_) {} kick(); };
  const stop = () => { holding = false; };
  heart.addEventListener("pointerdown", start);
  ["pointerup", "pointercancel"].forEach(ev => heart.addEventListener(ev, stop));
  heart.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); holding = true; kick(); } });
  heart.addEventListener("keyup", stop);
  heart.addEventListener("contextmenu", e => e.preventDefault());

  new IntersectionObserver(([e]) => sec.classList.toggle("live", e.isIntersecting), { threshold: .1 }).observe(sec);

  function climax() {
    done = true;
    const r = heart.getBoundingClientRect();
    heart.style.transition = "transform .7s"; heart.style.setProperty("--p", 1.6);   // heart membesar
    sec.animate([{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }], { duration: 900 }); // pulse layar
    setTimeout(() => {
      burst(r.left + r.width / 2, r.top + r.height / 2, 40, 200);                     // ledakan partikel
      confetti(60);
      sec.classList.add("lit", "open");                                              // bg terang, tirai terbuka
      wrap.classList.add("gone");
      bgm.pause(); setPlaying(false); fin.play().catch(() => {});                    // musik final jika ada
      setTimeout(() => {
        const f = $("#final"); f.style.visibility = "visible";
        f.style.transition = "opacity 3s"; f.style.opacity = 1;
        if (hasGsap && !reduced) gsap.from("#final > *", { y: 40, scale: .9, opacity: 0, duration: 2.4, stagger: .55, ease: "power2.out" });
      }, 1400);
    }, 700);
  }
}

/* ===== Navigasi, cursor, transisi scroll ===== */
function nav() {
  const links = $$("#nav a"), bar = $(".progress-bar i");
  $$(".scene").forEach(s => new IntersectionObserver(([e]) => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + s.id));
  }, { threshold: .4 }).observe(s));
  addEventListener("scroll", () => { bar.style.transform = `scaleX(${scrollY / (document.documentElement.scrollHeight - innerHeight || 1)})`; }, { passive: true });
}
function cursor() {
  const c = $(".cursor"); if (isTouch) return;
  addEventListener("mousemove", e => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; }, { passive: true });
  document.addEventListener("mouseover", e => c.classList.toggle("big", !!e.target.closest("button,a,.pol,.tv,input")));
}
function transitions() {
  if (!hasST || reduced) return;
  gsap.to("#sheet", { y: -60, opacity: .25, ease: "none", scrollTrigger: { trigger: "#s1", start: "55% top", end: "bottom top", scrub: true } });
  gsap.to(".cloth", { yPercent: 12, ease: "none", scrollTrigger: { trigger: "#s1", start: "top top", end: "bottom top", scrub: true } });
  if (!isTouch) gsap.to(".frame-wrap", { yPercent: -8, ease: "none", scrollTrigger: { trigger: "#s3", scrub: true } });
  $$(".scene > h2").forEach(h => gsap.from(h, { scrollTrigger: { trigger: h, start: "top 88%", once: true }, y: 40, opacity: 0, duration: 1.2, ease: "power2.out" }));
  gsap.from(".sp", { scrollTrigger: { trigger: ".sp", start: "top 88%", once: true }, y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
}

/* ===== Start ===== */
document.addEventListener("DOMContentLoaded", () => {
  fill(); dust(); audio(); letter(); tilt(); scrapbook(); memories(); coupons(); finale(); nav(); cursor(); transitions(); boot();
});