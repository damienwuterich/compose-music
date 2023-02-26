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

noteToFile = {};

for (noteVal in notes) {
  noteName = notes[noteVal];

  noteToFile[noteName] = new Audio(`piano/Piano.mf.${noteName}.mp3`);
}

function playNote(noteName) {
  noteToFile[noteName].currentTime = 0;
  noteToFile[noteName].play();
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
  if (event.key in keyToNoteMap) {
    playNote(keyToNoteMap[event.key]);
  }
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

noteMsLength = 250;

async function playSong() {
  textAreaValue = document.getElementById("songText").value;
  textAreaValue = textAreaValue.trim();
  textAreaValue = textAreaValue.replace(/\n/g, " ");
  textAreaValue = textAreaValue.replace(/  /g, " ");
  console.log(textAreaValue);

  // url = new URL(window.location);
  // notes = url.searchParams.get('notes');
  spaceSplit = textAreaValue.split(" ");

  await sleep(noteMsLength);

  while (spaceSplit.length > 0) {
    noteAndLength = spaceSplit.shift();
    console.log(noteAndLength);

    playNote(noteAndLength[0].toUpperCase() + "4");
    await sleep(noteMsLength * noteAndLength.length);
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
