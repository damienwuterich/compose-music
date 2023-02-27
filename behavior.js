let originalDocumentTitle = null;

notes = [
  "C4",
  "Db4",
  "D4",
  "Eb4",
  "E4",
  "F4",
  "Gb4",
  "G4",
  "Ab4",
  "A4",
  "Bb4",
  "B4",
];

function playNote(noteName) {
  new Audio(`piano/Piano.mf.${noteName}.mp3`).play();
}

keyToNoteMap = {
  a: "C4",
  w: "Db4",
  s: "D4",
  e: "Eb4",
  d: "E4",
  f: "F4",
  t: "Gb4",
  g: "G4",
  y: "Ab4",
  h: "A4",
  u: "Bb4",
  j: "B4",
};

document.onkeydown = function (event) {
  event = event || window.event;
  if (
    event.target.id !== "songText" &&
    event.repeat === false &&
    event.key in keyToNoteMap
  ) {
    playNote(keyToNoteMap[event.key]);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function appendUrlPath(str) {
  if (str !== "" || window.location.search !== "") {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + str
    );
  }
}

function updateTitle() {
  document.title = `${originalDocumentTitle} - ${document
    .getElementById("songText")
    .value.replace(/\s+/g, " ")}`;
}

async function playSong() {
  const textAreaValue = document.getElementById("songText").value;

  if (textAreaValue !== "") {
    updateTitle();
    appendUrlPath(
      `?music=${encodeURIComponent(textAreaValue).replace(/%20/g, "+")}`
    );
  }

  for (const noteExpr of textAreaValue.split(/\s+/)) {
    const noteMsLength = 250;
    playNote(noteExpr[0].toUpperCase() + "4");
    await sleep(noteMsLength * noteExpr.length);
  }
}

function fillTextArea() {
  const nullOrValue = localStorage.getItem("textAreaValue");
  localStorage.removeItem("textAreaValue");

  if (nullOrValue === null) {
    document.getElementById("songText").value = new URL(
      window.location
    ).searchParams.get("notes");
  } else {
    document.getElementById("songText").value = nullOrValue;
    updateTitle();
  }
}

window.addEventListener("beforeunload", () => {
  textAreaValue = document.getElementById("songText").value;
  if (textAreaValue !== "") {
    localStorage.setItem(
      "textAreaValue",
      document.getElementById("songText").value
    );
  }
});

function onLoad() {
  originalDocumentTitle = document.title;
  fillTextArea();

  const url = new URL(window.location.href);
  const paramName = "music";

  if (url.searchParams.has(paramName)) {
    document.getElementById("songText").value = url.searchParams.get(paramName);
    updateTitle();
  }
}
