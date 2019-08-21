// http://midm-database.co.uk/drukqs.html

const load = () => {
  let bpm = Tone.Transport.bpm.value = data.header.bpm;

  const noteUtil = [...Array(127).keys()];
  const noteUtilRev = noteUtil.reverse();

  const noteValues = [
  "A0",
  "A#0",
  "B0",
  "C1",
  "C#1",
  "D1",
  "D#1",
  "F1",
  "F#1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "D#3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
  "C#6",
  "D6",
  "D#6",
  "F6",
  "F#6",
  "G6",
  "G#6",
  "A6",
  "A#6",
  "B6",
  "C7",
  "C#7",
  "D7",
  "D#7",
  "F6",
  "F#7",
  "G7",
  "G#7",
  "A7",
  "A#7",
  "B7",
  "C8"];

  // console.log(noteValues.length);
  const playBtn = document.getElementById("play-btn");

  /*
                                                        * Effects
                                                        */
  const reverb = new Tone.JCReverb({
    roomSize: 0.85,
    wet: 0.1 }).

  receive("reverb").
  toMaster();

  const phaser = new Tone.Phaser({
    frequency: 0.06,
    octaves: 3,
    stages: 12,
    Q: 3,
    wet: 0.2,
    baseFrequency: 350 }).
  toMaster();

  /*
               * Instrument
               */
  const piano = new Tone.Sampler(
  {
    A0: "A0.[mp3|ogg]",
    C1: "C1.[mp3|ogg]",
    "D#1": "Ds1.[mp3|ogg]",
    "F#1": "Fs1.[mp3|ogg]",
    A1: "A1.[mp3|ogg]",
    C2: "C2.[mp3|ogg]",
    "D#2": "Ds2.[mp3|ogg]",
    "F#2": "Fs2.[mp3|ogg]",
    A2: "A2.[mp3|ogg]",
    C3: "C3.[mp3|ogg]",
    "D#3": "Ds3.[mp3|ogg]",
    "F#3": "Fs3.[mp3|ogg]",
    A3: "A3.[mp3|ogg]",
    C4: "C4.[mp3|ogg]",
    "D#4": "Ds4.[mp3|ogg]",
    "F#4": "Fs4.[mp3|ogg]",
    A4: "A4.[mp3|ogg]",
    C5: "C5.[mp3|ogg]",
    "D#5": "Ds5.[mp3|ogg]",
    "F#5": "Fs5.[mp3|ogg]",
    A5: "A5.[mp3|ogg]",
    C6: "C6.[mp3|ogg]",
    "D#6": "Ds6.[mp3|ogg]",
    "F#6": "Fs6.[mp3|ogg]",
    A6: "A6.[mp3|ogg]",
    C7: "C7.[mp3|ogg]",
    "D#7": "Ds7.[mp3|ogg]",
    "F#7": "Fs7.[mp3|ogg]",
    A7: "A7.[mp3|ogg]",
    C8: "C8.[mp3|ogg]" },

  {
    release: 1,
    baseUrl: "https://testinggrounds.info/share/audio/salamander/" }).

  chain(phaser, reverb, Tone.Master);


  const playSound = event => {
    const cell = event.target;
    console.log(cell);
    cell.classList.add("active");

    piano.triggerAttackRelease(noteValues[cell.dataset.note], 1);
  };

  /*
      * Add click event for cells to play sound
      */
  const cells = document.getElementsByClassName("cell");
  // console.log(cells.length);

  for (let cell of cells) {
    cell.addEventListener("click", playSound);

    cell.addEventListener("transitionend", function (event) {
      cell.classList.remove("active");
    });
  }

  /*
     * Music Part
     */
  // melody music part
  const melodyPart = new Tone.Part(function (time, note) {
    piano.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    let cell = cells[note.midi];
    console.log(cell);
    // console.log(note.midi);
    console.log(note.midi);
    cell.classList.add("active");
  }, data.tracks[0].notes).start();

  // bass music part
  const bassPart = new Tone.Part(function (time, note) {
    piano.triggerAttackRelease(note.name, note.duration, time, note.velocity);

    let cell = cells[note.midi];

    console.log(cell);

    cell.classList.add("active");
    cell.addEventListener("transitionend", function (event) {
      cell.classList.remove("active");
    });
  }, data.tracks[1].notes).start();

  let playing = false;
  const startSong = () => {
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    if (!playing) {
      Tone.Transport.start();
      playing = true;
    } else {
      Tone.Transport.pause();
      playing = false;
    }
  };

  playBtn.addEventListener("click", startSong);
};

// load
window.onload = function () {
  load();
};