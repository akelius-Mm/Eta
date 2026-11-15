(function () {
  "use strict";

  var PHRASES = [];
  window.TOPICS.forEach(function (t) {
    t[1].split("\n").forEach(function (line) {
      var p = line.split("|");
      if (p.length === 3) PHRASES.push({ c: t[0], ru: p[0], say: p[1], en: p[2] });
    });
  });

  var THINGS = [];
  window.OBJECTS.forEach(function (g) {
    g[1].split("\n").forEach(function (line) {
      var p = line.split("|");
      if (p.length !== 4) return;
      var o = { g: g[0], c: "Things: " + g[0].toLowerCase(), pic: p[0], ru: p[1], say: p[2], en: p[3] };
      THINGS.push(o); PHRASES.push(o);
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
  var playing = false, voice = null, slow = !!load("rft.slow", false);
  function pickVoice() {
    if (!synth) return;
    var all = synth.getVoices() || [];
    voice = all.filter(function (v) { return /^ru/i.test(v.lang); })[0] || null;
  }
  if (synth) { pickVoice(); try { synth.addEventListener("voiceschanged", pickVoice); } catch (e) {} }
  else app.classList.add("no-audio");
  function utter(text) {
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU"; u.rate = slow ? 0.6 : 0.85;
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
      /* said three times, with a gap after the first two for you to repeat it */
      var labels = ["Listen", "Again", "Once more"], k = 0;
      (function round() {
        if (!alive()) return;
        status(labels[k]);
        speakThen(p.ru, function () {
          if (!alive()) return;
          k++;
          if (k >= labels.length) { run.timer = setTimeout(function () { i++; step(); }, 900); return; }
          status("Your turn");
          run.timer = setTimeout(round, 1800 + 500 * clean(p.ru).split(/\s+/).length);
        });
      })();
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
    /* The phone cannot play a voice and listen at the same moment: if it is still talking, stop it and
       give it a beat to hand the microphone over, otherwise the first words are lost. */
    var wasTalking = !!(synth && synth.speaking);
    stopAudio();
    var rec = null, label = btn.textContent, words = norm(target).split(" ").length;
    var best = "", top = 0, heard = "", prior = "", why = "";
    var quiet = 0, limit = 0, opening = 0, deaf = 0, started = false, over = false, restarts = 0;
    var seen = { start: 0, audio: 0, voice: 0, result: 0 };
    function finish(reason) {
      if (over) return;
      over = true;
      clearTimeout(quiet); clearTimeout(limit); clearTimeout(opening); clearTimeout(deaf);
      if (hearing === me) hearing = null;
      try { if (rec) rec.abort(); } catch (e) {}
      btn.textContent = label; btn.classList.remove("live");
      if (reason === "not-allowed" || reason === "service-not-allowed") {
        reason = "denied";
        app.classList.add("no-mic");
        $("micnote").hidden = false;
        $("micnote").textContent = "The microphone is blocked for this app. Allow it in your browser settings, then reload.";
      }
      done({ heard: best || heard, score: top, reason: reason,
        code: "s" + seen.start + " a" + seen.audio + " v" + seen.voice + " r" + seen.result + " x" + restarts + (why ? " " + why : "") });
    }
    var me = hearing = { btn: btn, finish: finish };
    btn.textContent = "Starting…"; btn.classList.add("live");
    live("Getting the microphone ready…");
    limit = setTimeout(function () { finish(heard ? "silence" : "deaf"); }, Math.min(30000, 12000 + 1500 * words));
    opening = setTimeout(function () { if (!started) finish("nostart"); }, 9000);
    function ready() {
      if (started || over) return;
      started = true; btn.textContent = "Speak now"; live("Speak now… take your time.");
      watch();
    }
    /* Listening but nothing at all coming through: start a fresh listener once, then say so. */
    function watch() {
      clearTimeout(deaf);
      deaf = setTimeout(function () {
        if (over || seen.result) return;
        if (restarts < 1) { restarts++; live("Still listening… say it again."); reopen(); watch(); }
        else finish("deaf");
      }, 6000);
    }
    function reopen() { try { rec.abort(); } catch (e) {} why = ""; open(); }
    function open() {
      var r = rec = new SR();
      r.lang = "ru-RU"; r.interimResults = true; r.maxAlternatives = 3;
      r.continuous = true; /* keep listening through pauses while you think of the next word */
      /* "Speak now" waits until the microphone is really capturing, not just requested */
      r.onstart = function () { if (r !== rec) return; seen.start++; setTimeout(ready, 1200); };
      r.onaudiostart = function () { if (r !== rec) return; seen.audio++; ready(); };
      r.onsoundstart = r.onspeechstart = function () {
        if (r !== rec || over) return;
        seen.voice++; ready();
        if (!heard) live("I hear you…");
      };
      r.onresult = function (e) {
        if (r !== rec || over) return;
        seen.result++; ready(); clearTimeout(deaf);
        var joined = "", cands = [];
        for (var i = 0; i < e.results.length; i++) {
          joined += e.results[i][0].transcript + " ";
          for (var j = 0; j < e.results[i].length; j++) cands.push(e.results[i][j].transcript);
        }
        heard = (prior + " " + joined).trim();
        cands = cands.map(function (c) { return (prior + " " + c).trim(); }); cands.push(heard);
        cands.forEach(function (c) { var x = score(target, c); if (x > top) { top = x; best = c; } });
        if (heard) live("Hearing: " + heard, best || heard);
        if (top >= 1) { finish("match"); return; }
        clearTimeout(quiet);
        /* a long pause ends the attempt: 4 seconds mid-sentence, less for a single word or once it already matches */
        quiet = setTimeout(function () { finish(top >= 0.8 ? "match" : "quiet"); }, top >= 0.8 ? 800 : words > 1 ? 4000 : 2500);
      };
      r.onerror = function (e) { if (r === rec) why = e.error; };
      r.onend = function () {
        if (r !== rec || over) return;
        /* the phone sometimes stops listening at a pause; if you were mid-sentence, pick up where it left off */
        if (heard && top < 0.8 && restarts < 3) { restarts++; prior = heard; reopen(); return; }
        finish(why || "end");
      };
      try { r.start(); } catch (e) { finish("nostart"); }
    }
    if (wasTalking) setTimeout(function () { if (!over) open(); }, 350); else open();
  }
  /* Show the phrase word by word so each word can turn green the moment it is heard. */
  function wordSpans(el, text) {
    el.textContent = "";
    String(text).split(/(\s+)/).forEach(function (part) {
      if (/^\s+$/.test(part)) el.append(part); else if (part) el.append(h("span", { text: part }));
    });
  }
  function paint(el, heard) {
    var got = norm(heard || "").split(" ").filter(Boolean);
    Array.prototype.forEach.call(el.children, function (sp) {
      var w = norm(sp.textContent);
      sp.classList.toggle("hit", !!w && got.some(function (x) { return near(w, x); }));
    });
  }
  /* What to tell you when an attempt ends with nothing heard. The short code helps diagnose it from a screenshot. */
  function silentMsg(r) {
    var text = r.reason === "nostart" ? "The microphone did not start. Try again, or open this page in Safari."
      : r.reason === "deaf" ? "The phone is listening but not picking up your voice. Wait for the beep, then speak a little louder and closer. If it keeps happening, close the app and open it again."
      : "I did not hear anything. Tap Say it, wait for Speak now, then say it.";
    return text + " (" + r.code + ")";
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
  var names = [];
  PHRASES.forEach(function (p) { if (names.indexOf(p.c) < 0) names.push(p.c); });
  var topic = load("rft.cat", names[0]);
  if (names.indexOf(topic) < 0) topic = names[0];
  function inTopic(c) { return PHRASES.filter(function (p) { return p.c === c; }); }
  function known(list) { return list.filter(function (p) { return learned[p.ru]; }).length; }

  function renderTopics() {
    var sel = $("topic"); sel.textContent = "";
    var talk = h("optgroup", { label: "Conversation" }), things = h("optgroup", { label: "Things" });
    names.forEach(function (c) {
      var list = inTopic(c);
      var o = h("option", { value: c, text: c.replace("Things: ", "") + "  ·  " + known(list) + "/" + list.length });
      if (c === topic) o.selected = true;
      (c.indexOf("Things: ") === 0 ? things : talk).append(o);
    });
    sel.append(talk, things);
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
    var ruEl = item.querySelector(".ru");
    wordSpans(ruEl, p.ru);
    if (p.pic) item.insertBefore(h("div", { class: "pic", text: p.pic }), item.firstChild);
    function live(text, heard) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; paint(ruEl, heard); }
    mic.addEventListener("click", function () {
      paint(ruEl, "");
      hear(mic, p.ru, live, function (r) {
        paint(ruEl, r.heard);
        if (!r.heard) {
          if (r.reason === "denied" || r.reason === "stopped" || r.reason === "replaced") { verdict.hidden = true; return; }
          verdict.hidden = false; verdict.className = "verdict mid";
          verdict.textContent = silentMsg(r);
          return;
        }
        var s = r.score;
        verdict.hidden = false; verdict.textContent = "";
        verdict.className = "verdict " + (s >= 0.8 ? "good" : "mid");
        /* Spoken Russian praise on a match, once the microphone is released. A miss stays silent so you can retry at once. */
        var word = PRAISE[Math.floor(Math.random() * PRAISE.length)];
        if (s >= 0.8) setTimeout(function () { if (!hearing) sayAloud(word[0]); }, 350);
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
    return { name: sc[0], lines: sc[1].split("\n").map(function (l) { var p = l.split("|"); return { who: p[0], ru: p[1], say: p[2], en: p[3] }; }) };
  });
  SCENES.forEach(function (sc, i) { $("scene").append(h("option", { value: String(i), text: sc.name })); });
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
      var ruEl = h("div", { class: "ru aid", lang: "ru" });
      wordSpans(ruEl, line.ru);
      function live(text, heard) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; paint(ruEl, heard); }
      var moved = false;
      function advance() {
        if (run !== sceneRun || moved) return;
        moved = true;
        if (hearing && hearing.btn === mic) hearing.finish("replaced");
        y.textContent = ""; y.append(h("div", { class: "bubble me", lang: "ru", text: line.ru }));
        setTimeout(next, 700); /* a short beat before she speaks again */
      }
      var mic = h("button", { class: "act primary mic", text: "Say it" });
      mic.addEventListener("click", function () {
        paint(ruEl, "");
        hear(mic, line.ru, live, function (r) {
          if (run !== sceneRun) return;
          paint(ruEl, r.heard);
          if (!r.heard) {
            if (r.reason === "denied" || r.reason === "stopped" || r.reason === "replaced") { verdict.hidden = true; return; }
            verdict.hidden = false; verdict.className = "verdict mid";
            verdict.textContent = silentMsg(r);
            return;
          }
          if (r.score >= 0.8) {
            /* hold on your answer for a moment so you can see what was heard before the scene moves on */
            verdict.hidden = false; verdict.className = "verdict good"; verdict.textContent = "";
            verdict.append(h("b", { text: "Молодец! " }), "I heard: " + r.heard);
            mic.disabled = true;
            setTimeout(advance, 1500);
            return;
          }
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
        ruEl,
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

  /* ---------- Eta? : a picture comes up, you name it in Russian ---------- */
  function shuffle(list) {
    for (var i = list.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = list[i]; list[i] = list[j]; list[j] = t; }
    return list;
  }
  var etaGroups = [];
  THINGS.forEach(function (o) { if (etaGroups.indexOf(o.g) < 0) etaGroups.push(o.g); });
  $("etagroup").append(h("option", { value: "", text: "All things" }));
  etaGroups.forEach(function (g) { $("etagroup").append(h("option", { value: g, text: g })); });
  var eta = { pool: [], queue: [], right: 0, started: false, run: 0 };
  function etaScore() { $("etascore").textContent = eta.right + " of " + eta.pool.length + " named"; }
  function startEta() {
    var g = $("etagroup").value;
    eta.pool = THINGS.filter(function (o) { return !g || o.g === g; });
    eta.queue = shuffle(eta.pool.slice()); eta.right = 0; eta.started = true;
    etaScore(); nextEta();
  }
  function nextEta() {
    var run = ++eta.run, box = $("etacard");
    if (hearing) hearing.finish("replaced");
    stopAudio(); box.textContent = "";
    if (!eta.queue.length) {
      var again = h("button", { class: "act primary", text: "Go again" });
      again.addEventListener("click", startEta);
      box.append(h("div", { class: "panel" }, h("div", { class: "ru", lang: "ru", text: "Молодец!" }),
        h("div", { class: "en", text: "You named all " + eta.pool.length + ". Pick another group or go again." }), h("div", { class: "acts" }, again)));
      return;
    }
    var cur = eta.queue.shift(), done = false;
    var others = shuffle(eta.pool.filter(function (o) { return o.ru !== cur.ru; }));
    if (others.length < 3) others = shuffle(THINGS.filter(function (o) { return o.ru !== cur.ru; }));
    var opts = shuffle([cur].concat(others.slice(0, 3)));
    var card = h("div", { class: "panel turn", "data-answer": cur.ru });
    var verdict = h("div", { class: "verdict", hidden: "" });
    var reveal = h("div", { class: "reveal", hidden: "" },
      h("div", { class: "ru", lang: "ru", text: cur.ru }), h("div", { class: "say aid", text: cur.say }), h("div", { class: "en aid", text: cur.en }));
    /* the four words stay hidden until you have tried saying it (or when this phone cannot listen) */
    var grid = h("div", { class: "choices" });
    grid.hidden = !!SR && !app.classList.contains("no-mic");
    function offerChoices() { if (!done) grid.hidden = false; }
    var mic = h("button", { class: "act primary mic", text: "Say it" });
    var help = h("button", { class: "act helpbtn", text: "Help" });
    help.addEventListener("click", function () { card.classList.toggle("open"); });
    var show = h("button", { class: "act", text: "Show me" });
    var next = h("button", { class: "act primary", text: "Next", hidden: "" });
    next.addEventListener("click", nextEta);
    function answer(ok, picked) {
      if (done || run !== eta.run) return;
      done = true;
      if (hearing && hearing.btn === mic) hearing.finish("replaced");
      Array.prototype.forEach.call(grid.children, function (b) {
        b.disabled = true;
        if (b.getAttribute("data-ru") === cur.ru) b.classList.add("right");
        else if (b === picked) b.classList.add("wrong");
      });
      verdict.hidden = false; verdict.className = "verdict " + (ok ? "good" : "mid");
      verdict.textContent = ok ? "Да! Молодец!" : "This one will come back in a moment.";
      grid.hidden = false;
      reveal.hidden = false; mic.hidden = true; show.hidden = true; next.hidden = false;
      if (ok) {
        eta.right++;
        if (!learned[cur.ru]) { learned[cur.ru] = 1; save("rft.learned", learned); renderCount(); renderTopics(); }
      } else eta.queue.splice(Math.min(3, eta.queue.length), 0, cur);
      etaScore();
      sayAloud(cur.ru);
    }
    opts.forEach(function (o) {
      var b = h("button", { class: "choice", "data-ru": o.ru }, h("span", { class: "ru", lang: "ru", text: o.ru }), h("span", { class: "say aid", text: o.say }));
      b.addEventListener("click", function () { answer(o.ru === cur.ru, b); });
      grid.append(b);
    });
    function live(text) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; }
    mic.addEventListener("click", function () {
      hear(mic, cur.ru, live, function (r) {
        if (done || run !== eta.run) return;
        if (r.reason === "replaced") return;
        if (r.score >= 0.8) { answer(true); return; }
        offerChoices();
        if (!r.heard) {
          if (r.reason === "denied" || r.reason === "stopped") { verdict.hidden = true; return; }
          verdict.hidden = false; verdict.className = "verdict mid"; verdict.textContent = silentMsg(r);
          return;
        }
        verdict.hidden = false; verdict.className = "verdict mid"; verdict.textContent = "";
        verdict.append(h("b", { text: "Not yet. " }), "I heard: " + r.heard + ". Try again, or tap the right word.");
      });
    });
    show.addEventListener("click", function () { answer(false); });
    card.append(h("div", { class: "etapic", role: "img", "aria-label": "Picture to name", text: cur.pic }),
      h("div", { class: "etaask", lang: "ru", text: "Что это?" }), reveal, verdict, grid,
      h("div", { class: "acts" }, mic, help, show, next));
    box.append(card);
  }
  $("etagroup").addEventListener("change", startEta);

  /* ---------- Kak? : the English comes up, you say it in Russian. No choices. ---------- */
  var SAME = {}; /* phrases that share one English meaning all count as right */
  PHRASES.forEach(function (p) { var k = p.en.toLowerCase(); (SAME[k] = SAME[k] || []).push(p.ru); });
  $("kakgroup").append(h("option", { value: "", text: "All phrases" }));
  names.forEach(function (c) { $("kakgroup").append(h("option", { value: c, text: c.replace("Things: ", "") })); });
  var kak = { pool: [], queue: [], right: 0, started: false, run: 0 };
  function kakScore() { $("kakscore").textContent = kak.right + " of " + kak.pool.length + " said"; }
  function startKak() {
    var c = $("kakgroup").value;
    kak.pool = PHRASES.filter(function (p) { return !c || p.c === c; });
    kak.queue = shuffle(kak.pool.slice()); kak.right = 0; kak.started = true;
    kakScore(); nextKak();
  }
  function nextKak() {
    var run = ++kak.run, box = $("kakcard");
    if (hearing) hearing.finish("replaced");
    stopAudio(); box.textContent = "";
    if (!kak.queue.length) {
      var again = h("button", { class: "act primary", text: "Go again" });
      again.addEventListener("click", startKak);
      box.append(h("div", { class: "panel" }, h("div", { class: "ru", lang: "ru", text: "Молодец!" }),
        h("div", { class: "en", text: "You said all " + kak.pool.length + ". Pick another topic or go again." }), h("div", { class: "acts" }, again)));
      return;
    }
    var cur = kak.queue.shift(), done = false, alts = SAME[cur.en.toLowerCase()] || [cur.ru];
    var card = h("div", { class: "panel", "data-answer": cur.ru });
    var verdict = h("div", { class: "verdict", hidden: "" });
    var blanks = h("div", { class: "blanks", lang: "ru", hidden: "" });
    var reveal = h("div", { class: "reveal", hidden: "" }, h("div", { class: "ru", lang: "ru", text: cur.ru }), h("div", { class: "say", text: cur.say }));
    var mic = h("button", { class: "act primary mic", text: "Say it" });
    var show = h("button", { class: "act", text: "Show me" });
    var knew = h("button", { class: "act", text: "I knew it", hidden: "" });
    var next = h("button", { class: "act primary", text: "Next", hidden: "" });
    next.addEventListener("click", nextKak);
    function count(ok) {
      if (ok) {
        kak.right++;
        if (!learned[cur.ru]) { learned[cur.ru] = 1; save("rft.learned", learned); renderCount(); renderTopics(); }
      } else kak.queue.splice(Math.min(3, kak.queue.length), 0, cur);
      kakScore();
    }
    function answer(ok) {
      if (done || run !== kak.run) return;
      done = true;
      if (hearing && hearing.btn === mic) hearing.finish("replaced");
      verdict.hidden = false; verdict.className = "verdict " + (ok ? "good" : "mid");
      verdict.textContent = ok ? "Да! Молодец!" : "This one will come back in a moment.";
      blanks.hidden = true; reveal.hidden = false; mic.hidden = true; show.hidden = true; next.hidden = false;
      /* where the phone cannot listen, you judge yourself after seeing the answer */
      if (!ok && (!SR || app.classList.contains("no-mic"))) {
        knew.hidden = false;
        knew.onclick = function () { knew.hidden = true; kak.queue.splice(kak.queue.indexOf(cur), 1); count(true); verdict.className = "verdict good"; verdict.textContent = "Молодец!"; };
      }
      count(ok);
      sayAloud(cur.ru);
    }
    /* after a miss, show the sentence with the words you got and blanks for the rest */
    function drawBlanks(heard) {
      var got = norm(heard).split(" ").filter(Boolean);
      blanks.textContent = cur.ru.split(/\s+/).map(function (w) {
        var n = norm(w);
        return !n || got.some(function (x) { return near(n, x); }) ? w : "___";
      }).join(" ");
      blanks.hidden = false;
    }
    function live(text) { verdict.hidden = false; verdict.className = "verdict live"; verdict.textContent = text; }
    mic.addEventListener("click", function () {
      hear(mic, cur.ru, live, function (r) {
        if (done || run !== kak.run || r.reason === "replaced") return;
        var top = r.score;
        if (r.heard) alts.forEach(function (alt) { top = Math.max(top, score(alt, r.heard)); });
        if (top >= 0.8) { answer(true); return; }
        if (!r.heard) {
          if (r.reason === "denied" || r.reason === "stopped") { verdict.hidden = true; return; }
          verdict.hidden = false; verdict.className = "verdict mid"; verdict.textContent = silentMsg(r);
          return;
        }
        drawBlanks(r.heard);
        verdict.hidden = false; verdict.className = "verdict mid"; verdict.textContent = "";
        verdict.append(h("b", { text: top >= 0.5 ? "Close. " : "Not yet. " }), "I heard: " + r.heard + ". Try again.");
      });
    });
    show.addEventListener("click", function () { answer(false); });
    card.append(h("div", { class: "etaask", lang: "ru", text: "Как сказать по-русски?" }));
    if (cur.pic) card.append(h("div", { class: "pic kakpic", text: cur.pic }));
    card.append(h("div", { class: "kaken", text: cur.en }), blanks, reveal, verdict,
      h("div", { class: "acts" }, mic, show, knew, next));
    box.append(card);
  }
  $("kakgroup").addEventListener("change", startKak);

  /* ---------- tabs ---------- */
  var VIEWS = ["phrases", "scenes", "eta", "kak"];
  function show(view) {
    if (VIEWS.indexOf(view) < 0) view = "phrases";
    VIEWS.forEach(function (v) {
      $("view-" + v).hidden = v !== view;
      $("tab-" + v).setAttribute("aria-selected", String(v === view));
    });
    stopAudio();
    if (hearing) hearing.finish("replaced");
    if (view === "eta" && !eta.started) startEta();
    if (view === "kak" && !kak.started) startKak();
    save("rft.tab", view);
  }
  VIEWS.forEach(function (v) { $("tab-" + v).addEventListener("click", function () { show(v); }); });

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
  function setSlow(on) { slow = on; $("slow").setAttribute("aria-pressed", String(on)); save("rft.slow", on); }
  $("slow").addEventListener("click", function () { setSlow(!slow); });
  setSlow(slow);
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
