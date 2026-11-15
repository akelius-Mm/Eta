(function () {
  "use strict";

  var PHRASES = [];
  window.TOPICS.forEach(function (t) {
    t[1].split("\n").forEach(function (line) {
      var p = line.split("|");
      if (p.length === 3) PHRASES.push({ c: t[0], ru: p[0], say: p[1], en: p[2] });
    });
  });

  var $ = function (id) { return document.getElementById(id); };
  var app = $("app");
  function h(tag, props) {
    var el = document.createElement(tag);
    if (props) for (var k in props) {
      if (k === "class") el.className = props[k];
      else if (k === "text") el.textContent = props[k];
      else el.setAttribute(k, props[k]);
    }
    for (var i = 2; i < arguments.length; i++) if (arguments[i]) el.append(arguments[i]);
    return el;
  }
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function clean(text) { return String(text || "").replace(/…/g, "").trim(); }

  /* ---------- sound out: the phone's own Russian voice ---------- */
  var synth = ("speechSynthesis" in window) ? window.speechSynthesis : null;
  var playing = false, voice = null;
  function pickVoice() {
    if (!synth) return;
    var all = synth.getVoices() || [];
    voice = all.filter(function (v) { return /^ru/i.test(v.lang); })[0] || null;
  }
  if (synth) { pickVoice(); try { synth.addEventListener("voiceschanged", pickVoice); } catch (e) {} }
  else app.classList.add("no-audio");
  function utter(text) {
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU"; u.rate = 0.85;
    if (voice) u.voice = voice;
    return u;
  }
  function setPlaying(on) { playing = on; $("handsfree").textContent = on ? "Stop" : "Hands-free"; }
  function stopAudio() { stopHandsFree(); if (synth) { try { synth.cancel(); } catch (e) {} } }
  function sayAloud(text) {
    text = clean(text);
    if (!text || !synth) return;
    stopHandsFree();
    try { synth.cancel(); synth.speak(utter(text)); } catch (e) {}
  }
  /* Hands-free: say the phrase, leave a gap for you to repeat it, say it again, move on. */
  var hf = null, wake = null;
  function speakThen(text, cb) {
    var fired = false, t = 0;
    function fire() { if (fired) return; fired = true; clearTimeout(t); cb(); }
    text = clean(text);
    t = setTimeout(fire, 2500 + text.length * 220); /* some phones never report the end of speech */
    try { var u = utter(text); u.onend = fire; u.onerror = fire; synth.speak(u); } catch (e) { fire(); }
  }
  function stopHandsFree() {
    if (!hf) return;
    clearTimeout(hf.timer); hf = null;
    $("hf").hidden = true; setPlaying(false);
    if (wake) { try { wake.release(); } catch (e) {} wake = null; }
  }
  function handsFree(list) {
    stopAudio();
    if (!synth || !list.length) return;
    var run = hf = { timer: 0 }, i = 0;
    setPlaying(true);
    $("hf").hidden = false; $("hf").classList.remove("open");
    if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (w) { if (hf === run) wake = w; else w.release(); }).catch(function () {});
    function alive() { return hf === run; }
    function status(text) { $("hfstatus").textContent = text; }
    function step() {
      if (!alive()) return;
      if (i >= list.length) { stopHandsFree(); return; }
      var p = list[i];
      $("hfru").textContent = p.ru; $("hfsay").textContent = p.say; $("hfen").textContent = p.en;
      $("hfcount").textContent = (i + 1) + " of " + list.length;
      $("hf").classList.remove("open");
      status("Listen");
      speakThen(p.ru, function () {
        if (!alive()) return;
        status("Your turn");
        run.timer = setTimeout(function () {
          if (!alive()) return;
          status("Once more");
          speakThen(p.ru, function () {
            if (!alive()) return;
            run.timer = setTimeout(function () { i++; step(); }, 900);
          });
        }, 1800 + 500 * clean(p.ru).split(/\s+/).length);
      });
    }
    step();
  }
  function listenBtn(text) {
    var b = h("button", { class: "act listen" });
    b.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z"/></svg>';
    b.append("Listen");
    b.addEventListener("click", function () { sayAloud(text); });
    return b;
  }

  /* ---------- sound in: the browser's speech recognition ----------
     Say it goes through three visible steps: "Starting…" while the phone opens the microphone,
     "Speak now" once it is really listening, then the words as they are heard. It stops by itself
     the moment the phrase matches, so there is no waiting for the phone to decide you are done. */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var hearing = null;
  if (SR) app.classList.remove("no-mic");
  else {
    $("micnote").hidden = false;
    $("micnote").textContent = "This browser cannot check your speech. Listen, repeat out loud, and mark what you know.";
  }
  function hear(btn, target, live, done) {
    if (!SR) return;
    if (hearing) {
      var same = hearing.btn === btn;
      hearing.finish(same ? "stopped" : "replaced");
      if (same) return;
    }
    stopAudio();
    var rec = new SR();
    rec.lang = "ru-RU"; rec.interimResults = true; rec.maxAlternatives = 3;
    rec.continuous = true; /* keep listening through pauses while you think of the next word */
    var words = norm(target).split(" ").length, prior = "", restarts = 0;
    var label = btn.textContent, best = "", top = 0, heard = "", quiet = 0, limit = 0, started = false, over = false, why = "";
    function finish(reason) {
      if (over) return;
      over = true;
      clearTimeout(quiet); clearTimeout(limit); clearTimeout(opening);
      if (hearing === me) hearing = null;
      try { rec.abort(); } catch (e) {}
      btn.textContent = label; btn.classList.remove("live");
      if (reason === "not-allowed" || reason === "service-not-allowed") {
        reason = "denied";
        app.classList.add("no-mic");
        $("micnote").hidden = false;
        $("micnote").textContent = "The microphone is blocked for this app. Allow it in your browser settings, then reload.";
      }
      done({ heard: best || heard, score: top, reason: reason });
    }
    var me = hearing = { btn: btn, finish: finish };
    btn.textContent = "Starting…"; btn.classList.add("live");
    live("Getting the microphone ready…");
    limit = setTimeout(function () { finish("silence"); }, Math.min(30000, 12000 + 1500 * words));
    var opening = setTimeout(function () { if (!started) finish("nostart"); }, 9000);
    function ready() {
      if (started || over) return;
      started = true; btn.textContent = "Speak now"; live("Speak now… take your time.");
    }
    rec.onstart = ready; rec.onaudiostart = ready;
    rec.onresult = function (e) {
      if (over) return;
      ready();
      var joined = "", cands = [];
      for (var i = 0; i < e.results.length; i++) {
        joined += e.results[i][0].transcript + " ";
        for (var j = 0; j < e.results[i].length; j++) cands.push(e.results[i][j].transcript);
      }
      heard = (prior + " " + joined).trim();
      cands = cands.map(function (c) { return (prior + " " + c).trim(); }); cands.push(heard);
      cands.forEach(function (c) { var x = score(target, c); if (x > top) { top = x; best = c; } });
      if (heard) live("Hearing: " + heard);
      if (top >= 1) { finish("match"); return; }
      clearTimeout(quiet);
      /* a long pause ends the attempt: 4 seconds mid-sentence, less for a single word or once it already matches */
      quiet = setTimeout(function () { finish(top >= 0.8 ? "match" : "quiet"); }, top >= 0.8 ? 800 : words > 1 ? 4000 : 2500);
    };
    rec.onerror = function (e) { why = e.error; };
    rec.onend = function () {
      /* the phone sometimes stops listening at a pause; if you were mid-sentence, pick up where it left off */
      if (!over && heard && top < 0.8 && restarts < 3) {
        restarts++; prior = heard;
        try { rec.start(); return; } catch (e) {}
      }
      finish(restarts ? "end" : why || "end");
    };
    try { rec.start(); } catch (e) { finish("nostart"); }
  }
  var NUM = { "1": "один", "2": "два", "3": "три", "4": "четыре", "5": "пять", "6": "шесть", "7": "семь", "8": "восемь", "9": "девять", "10": "десять", "20": "двадцать", "100": "сто" };
  /* The phone often writes a spoken number as digits ("10"), so turn digits back into words before comparing. */
  function norm(s) { return String(s).toLowerCase().replace(/\d+/g, function (d) { return NUM[d] || d; }).replace(/ё/g, "е").replace(/[^a-zа-я\s]/g, " ").replace(/\s+/g, " ").trim(); }
  function near(a, b) {
    if (a === b) return true;
    if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false;
    var i = 0, j = 0, miss = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++miss > 1) return false;
      if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
    }
    return true;
  }
  function score(target, heard) {
    var t = norm(target).split(" ").filter(Boolean), g = norm(heard).split(" ").filter(Boolean);
    if (!t.length) return 0;
    var hit = 0;
    t.forEach(function (w) { if (g.some(function (x) { return near(w, x); })) hit++; });
    return hit / t.length;
  }

  /* ---------- phrases ---------- */
  var learned = load("rft.learned", {});
  var names = window.TOPICS.map(function (t) { return t[0]; });
  var topic = load("rft.cat", names[0]);
  if (names.indexOf(topic) < 0) topic = names[0];
  function inTopic(c) { return PHRASES.filter(function (p) { return p.c === c; }); }
  function known(list) { return list.filter(function (p) { return learned[p.ru]; }).length; }

  function renderTopics() {
    var sel = $("topic"); sel.textContent = "";
    names.forEach(function (c) {
      var list = inTopic(c);
      var o = h("option", { value: c, text: c + "  ·  " + known(list) + "/" + list.length });
      if (c === topic) o.selected = true;
      sel.append(o);
    });
  }
  function renderCount() {
    var n = known(PHRASES);
    $("count").textContent = n + " of " + PHRASES.length + " learned";
    $("barfill").style.width = (100 * n / PHRASES.length) + "%";
  }
  function mark(p, item, got, on) {
    if (on) learned[p.ru] = 1; else delete learned[p.ru];
    save("rft.learned", learned);
    got.setAttribute("aria-pressed", String(on)); item.classList.toggle("done", on);
    renderCount(); renderTopics();
  }
  var PRAISE = [["Молодец!", "Well done"], ["Отлично!", "Excellent"], ["Правильно!", "Correct"], ["Очень хорошо!", "Very good"]];
  function phraseItem(p) {
    var verdict = h("div", { class: "verdict", hidden: "" });
    var item = h("div", { class: "item" + (learned[p.ru] ? " done" : "") },
      h("div", { class: "ru", lang: "ru", text: p.ru }),
      h("div", { class: "say aid", text: p.say }),
      h("div", { class: "en aid", text: p.en }));
    var got = h("button", { class: "act", text: "Got it", "aria-pressed": String(!!learned[p.ru]) });
    got.addEventListener("click", function () { mark(p, item, got, !learned[p.ru]); });
    var help = h("button", { class: "act helpbtn", text: "Help" });
    help.addEventListener("click", function () { item.classList.toggle("open"); });
    var mic = h("button", { class: "act mic", text: "Say it" });
    function live(text) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; }
    mic.addEventListener("click", function () {
      hear(mic, p.ru, live, function (r) {
        if (!r.heard) {
          if (r.reason === "denied" || r.reason === "stopped" || r.reason === "replaced") { verdict.hidden = true; return; }
          verdict.hidden = false; verdict.className = "verdict mid";
          verdict.textContent = r.reason === "nostart"
            ? "The microphone did not start. Try again, or open this page in Safari."
            : "I did not hear anything. Tap Say it, wait for Speak now, then say it.";
          return;
        }
        var s = r.score;
        verdict.hidden = false; verdict.textContent = "";
        verdict.className = "verdict " + (s >= 0.8 ? "good" : "mid");
        /* Spoken Russian feedback once the microphone is released: praise on a match, "once more" on a miss. */
        var word = s >= 0.8 ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : ["Ещё раз!", "Once more"];
        setTimeout(function () { sayAloud(word[0]); }, 350);
        verdict.append(h("b", { text: s >= 0.8 ? word[0] + " " + word[1] + ". " : s >= 0.5 ? "Close. " : "Not yet. " }),
          "I heard: " + r.heard + (s >= 0.8 ? "" : ". Tap Listen, then try again."));
        if (s >= 0.8 && !learned[p.ru]) mark(p, item, got, true);
      });
    });
    item.append(h("div", { class: "acts" }, listenBtn(p.ru), mic, help, got), verdict);
    return item;
  }
  function renderPhrases() {
    var box = $("phrases"); box.textContent = "";
    inTopic(topic).forEach(function (p) { box.append(phraseItem(p)); });
  }
  $("topic").addEventListener("change", function (e) { topic = e.target.value; save("rft.cat", topic); stopAudio(); renderPhrases(); });
  $("handsfree").addEventListener("click", function () {
    if (playing) { stopAudio(); return; }
    handsFree(inTopic(topic));
  });
  $("hfhelp").addEventListener("click", function () { $("hf").classList.toggle("open"); });

  /* ---------- scenes: her family speaks, you answer out loud ---------- */
  var SCENES = window.SCENES.map(function (sc) {
    return { name: sc[0], easy: sc[2] === "easy", lines: sc[1].split("\n").map(function (l) { var p = l.split("|"); return { who: p[0], ru: p[1], say: p[2], en: p[3] }; }) };
  });
  [["Starter: one short answer", true], ["Full conversations", false]].forEach(function (g) {
    var group = h("optgroup", { label: g[0] });
    SCENES.forEach(function (sc, i) { if (sc.easy === g[1]) group.append(h("option", { value: String(i), text: sc.name })); });
    $("scene").append(group);
  });
  var sceneRun = 0;
  function scrollTo(el) { if (el.scrollIntoView) el.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  function playScene(index) {
    var sc = SCENES[index], pos = 0, run = ++sceneRun, chat = $("chat");
    if (hearing) hearing.finish("replaced");
    stopAudio(); chat.textContent = "";
    $("scenestart").textContent = "Restart";
    function next() {
      if (run !== sceneRun) return;
      if (pos >= sc.lines.length) {
        var again = h("button", { class: "act primary", text: "Play it again" });
        again.addEventListener("click", function () { playScene(index); });
        var end = h("div", { class: "hint" }, h("div", { class: "ru", lang: "ru", text: "Молодец!" }), h("div", { class: "en", text: "Scene complete. Run it again until it feels automatic." }), h("div", { class: "acts" }, again));
        chat.append(end); scrollTo(end);
        return;
      }
      var line = sc.lines[pos++];
      if (line.who === "T") {
        var t = h("div", { class: "turn" });
        var help = h("button", { class: "act helpbtn", text: "Help" });
        help.addEventListener("click", function () { t.classList.toggle("open"); });
        t.append(h("div", { class: "bubble them" },
          h("div", { class: "who", text: "Her family" }),
          h("div", { class: "ru", lang: "ru", text: line.ru }),
          h("div", { class: "say aid", text: line.say }),
          h("div", { class: "en aid", text: line.en }),
          h("div", { class: "acts" }, listenBtn(line.ru), help)));
        chat.append(t);
        sayAloud(line.ru);
        next();
        return;
      }
      /* your reply: in Immersion the answer stays hidden until you ask for Help */
      var y = h("div", { class: "turn" });
      var verdict = h("div", { class: "verdict", hidden: "" });
      function live(text) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; }
      function advance() {
        if (run !== sceneRun) return;
        if (hearing && hearing.btn === mic) hearing.finish("replaced");
        y.textContent = ""; y.append(h("div", { class: "bubble me", lang: "ru", text: line.ru }));
        next();
      }
      var mic = h("button", { class: "act primary mic", text: "Say it" });
      mic.addEventListener("click", function () {
        hear(mic, line.ru, live, function (r) {
          if (run !== sceneRun) return;
          if (!r.heard) {
            if (r.reason === "denied" || r.reason === "stopped" || r.reason === "replaced") { verdict.hidden = true; return; }
            verdict.hidden = false; verdict.className = "verdict mid";
            verdict.textContent = r.reason === "nostart" ? "The microphone did not start. Try again, or open this page in Safari." : "I did not hear anything. Tap Say it, wait for Speak now, then say it.";
            return;
          }
          if (r.score >= 0.8) { advance(); return; }
          y.classList.add("open");
          verdict.hidden = false; verdict.className = "verdict mid"; verdict.textContent = "";
          verdict.append(h("b", { text: r.score >= 0.5 ? "Close. " : "Not yet. " }), "I heard: " + r.heard + ". Tap Listen, then try again.");
        });
      });
      var help2 = h("button", { class: "act helpbtn", text: "Help" });
      help2.addEventListener("click", function () { y.classList.toggle("open"); });
      var skip = h("button", { class: "act", text: "Next" });
      skip.addEventListener("click", advance);
      y.append(h("div", { class: "hint" },
        h("div", { class: "who", text: "Your turn" }),
        h("div", { class: "ru aid", lang: "ru", text: line.ru }),
        h("div", { class: "say aid", text: line.say }),
        h("div", { class: "en aid", text: line.en }),
        h("div", { class: "acts" }, mic, listenBtn(line.ru), help2, skip),
        verdict));
      chat.append(y); scrollTo(y);
    }
    next();
  }
  $("scenestart").addEventListener("click", function () { playScene(Number($("scene").value) || 0); });
  $("scene").addEventListener("change", function () { sceneRun++; stopAudio(); $("chat").textContent = ""; $("scenestart").textContent = "Start"; });

  /* ---------- tabs ---------- */
  function show(view) {
    if (view !== "scenes") view = "phrases";
    ["phrases", "scenes"].forEach(function (v) {
      $("view-" + v).hidden = v !== view;
      $("tab-" + v).setAttribute("aria-selected", String(v === view));
    });
    stopAudio();
    save("rft.tab", view);
  }
  ["phrases", "scenes"].forEach(function (v) { $("tab-" + v).addEventListener("click", function () { show(v); }); });

  /* ---------- immersion ---------- */
  function setImmersion(on) {
    app.classList.toggle("immersed", on);
    $("immerse").setAttribute("aria-pressed", String(on));
    $("immnote").hidden = !on;
    save("rft.immersed", on);
  }
  $("immerse").addEventListener("click", function () { setImmersion(!app.classList.contains("immersed")); });

  renderTopics(); renderPhrases(); renderCount();
  setImmersion(!!load("rft.immersed", false));
  show(load("rft.tab", "phrases"));

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    /* When a newer version of the app takes over, reload once so it shows up without closing the app. */
    var had = !!navigator.serviceWorker.controller, reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (had && !reloaded) { reloaded = true; location.reload(); }
    });
    navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then(function (r) { return r.update(); }).catch(function () {});
  }
})();
