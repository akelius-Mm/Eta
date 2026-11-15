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
  function setPlaying(on) { playing = on; $("playall").textContent = on ? "Stop" : "Play all"; }
  function stopAudio() { if (synth) { try { synth.cancel(); } catch (e) {} } setPlaying(false); }
  function sayAloud(text) {
    text = clean(text);
    if (!text || !synth) return;
    setPlaying(false);
    try { synth.cancel(); synth.speak(utter(text)); } catch (e) {}
  }
  function playAll(texts) {
    texts = texts.map(clean).filter(Boolean);
    if (!texts.length || !synth) return;
    try {
      synth.cancel(); setPlaying(true);
      texts.forEach(function (t, i) {
        var u = utter(t);
        if (i === texts.length - 1) u.onend = function () { setPlaying(false); };
        synth.speak(u);
      });
    } catch (e) { setPlaying(false); }
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
    rec.lang = "ru-RU"; rec.interimResults = true; rec.maxAlternatives = 3; rec.continuous = false;
    var label = btn.textContent, best = "", top = 0, heard = "", quiet = 0, limit = 0, started = false, over = false, why = "";
    function finish(reason) {
      if (over) return;
      over = true;
      clearTimeout(quiet); clearTimeout(limit);
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
    limit = setTimeout(function () { finish(started ? "silence" : "nostart"); }, 9000);
    function ready() {
      if (started || over) return;
      started = true; btn.textContent = "Speak now"; live("Speak now…");
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
      heard = joined.trim(); cands.push(heard);
      cands.forEach(function (c) { var x = score(target, c); if (x > top) { top = x; best = c; } });
      if (heard) live("Hearing: " + heard);
      if (top >= 1) { finish("match"); return; }
      clearTimeout(quiet);
      quiet = setTimeout(function () { finish(top >= 0.8 ? "match" : "quiet"); }, top >= 0.8 ? 700 : 1600);
    };
    rec.onerror = function (e) { why = e.error; };
    rec.onend = function () { finish(why || "end"); };
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
        verdict.append(h("b", { text: s >= 0.8 ? "That's it. " : s >= 0.5 ? "Close. " : "Not yet. " }),
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
  $("playall").addEventListener("click", function () {
    if (playing) { stopAudio(); return; }
    playAll(inTopic(topic).map(function (p) { return p.ru; }));
  });

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

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
