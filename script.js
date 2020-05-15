var voice1;
var voice2;
var voice3;

var measures = "8m";

Tone.Transport.bpm.value = 120; // best to use multiple of 60 to avoid weirdly timed notes

loadInstruments();

Tone.Buffer.on('load', function() {
    voice1.toMaster();
    voice2.toMaster();
    voice3.toMaster();

    document.getElementById("play").disabled = false;
    document.getElementById("play").innerText = "Play";
});

// mobile fix
//pass in the audio context
var context = new AudioContext();
//on iOS, the context will be started on the first valid user action on the #playButton element
StartAudioContext(context, "#play");

async function start() {
    const melody = generate();
    const secondMelody = imitate(melody, 1);
    const thirdMelody = imitate(secondMelody, 2);

    melody.map(function(note) {
        console.log("1: " + note[0] + " " + note[1].toNotation() +
            " 2: " + secondMelody[melody.indexOf(note)][0] + " " + secondMelody[melody.indexOf(note)][1].toNotation() +
            " 3: " + thirdMelody[melody.indexOf(note)][0] + " " + thirdMelody[melody.indexOf(note)][1].toNotation());

    })

    play(melody, voice1);
    play(secondMelody, voice2);
    play(thirdMelody, voice3);
    await sleep(Tone.Time(measures).toMilliseconds());
    cadence();
};

const register1 = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3'];
const register2 = ['F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3'];
const register3 = ['F3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4'];
const registers = [register1, register2, register3];
const notes = register1;

let degree = 0;

function cadence() {
    // always same cadence
    let long = Tone.Time('1m')
    let short = Tone.Time('2n')
    cadence1 = [
        ['rest', short],
        ['F3', short],
        ['E3', long]
    ];
    cadence2 = [
        ['rest', short],
        ['B3', short],
        ['C3', long]
    ];
    cadence3 = [
        ['rest', short],
        ['G3', short],
        ['G3', long]
    ];

    play(cadence1, voice1);
    play(cadence2, voice2);
    play(cadence3, voice3);
}

function imitate(melody, registerIndex) {
    let m = [];
    // first is rest for the length of the first note
    m.push(["rest", melody[0][1]]);

    // then imitate with the given register
    imitation = melody.map(function(note) {
        if (note[0] == "rest") return ["rest", note[1]];
        return [registers[registerIndex][registers[registerIndex - 1].indexOf(note[0])], note[1]];

    });

    m = m.concat(imitation);
    m.pop(); // remove last note to make the same length

    return m;
}

function generate() {
    const m = [];

    let timeLeft = Tone.Time(measures);

    while (timeLeft.toSeconds() > 0) {

        // standard length
        let length = Tone.Time('2n');

        if (length.toMilliseconds() > timeLeft.toMilliseconds()) length = timeLeft;

        // choose note
        let interval = randomInterval([-5, -3, 0, 4]);
        // you can only repeat the same note twice, so check last 2 notes. If they are the same, remove staying at the same note as an option
        if (m.length > 1)
            if (m[m.length - 1][0] == m[m.length - 2][0]) interval = randomInterval([-5, -3, 4]);

        degree = changeDegree(degree, interval);
        const note = register1[degree];

        // keep track of time
        timeLeft = Tone.Time(timeLeft - length);

        // decide if note will have passing tone leading to it. Except first note, which is always full note
        if (Math.random() < 0.4 && m.length != 0 && interval != 0) {
            // if interval is 4 it needs to get divided into 3 notes, 2 as passing and the original
            if (interval == 4) {
                length = Tone.Time('8n');

                m.push([register1[changeDegree(degree, 2)], length]);
                m.push([register1[changeDegree(degree, 3)], length]);
            }
            // else note gets split into 2 notes of same time:
            else {
                // 1. original note with same interval and half the time. To do this we only need to adjust it's time
                length = Tone.Time('4n');

                // 2. passing tone with half the interval and half the time and add to melody
                m.push([register1[changeDegree(degree, Math.floor(interval / 2))], length]);
            }

        }

        // add the note to the melody
        m.push([note, length]);

    }

    return m;
}

function play(melody, voice) {
    let t = Tone.now();
    for (const note of melody) {
        if (note[0] !== 'rest') {
            voice.triggerAttackRelease(note[0], Tone.Time(note[1]), t);
        }
        t += Tone.Time(note[1]);
    }
}

function randomInterval(possibleIntervals) {
    const index = Math.floor(Math.random() * possibleIntervals.length);
    return possibleIntervals[index];
}

function changeDegree(degree, interval) {
    // to adjust for diferent meanings of "interval" between music and code we do this
    if (interval < 0) interval++;
    if (interval > 0) interval--;

    // if the new degree is either too high or too low, wrap around array
    let newDegree = (degree + interval) % notes.length;
    if (newDegree < 0) newDegree = notes.length + newDegree;

    return newDegree;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loadInstruments() {
    document.getElementById("play").disabled = true;
    document.getElementById("play").innerText = "Loading...";

    var i1 = document.getElementById("instrument1");
    var i2 = document.getElementById("instrument2");
    var i3 = document.getElementById("instrument3");
    var instr1 = i1.options[i1.selectedIndex].value;
    var instr2 = i2.options[i2.selectedIndex].value;
    var instr3 = i3.options[i3.selectedIndex].value;

    voice1 = SampleLibrary.load({
        instruments: instr1,
    });

    voice2 = SampleLibrary.load({
        instruments: instr2,
    });

    voice3 = SampleLibrary.load({
        instruments: instr3,
    });
}

function changeTempo() {
    var t = document.getElementById("tempo");
    var tempo = parseInt(t.options[t.selectedIndex].value);
    Tone.Transport.bpm.value = tempo;
}

function changeMeasures() {
    var m = document.getElementById("measures");
    measures = parseInt(m.options[m.selectedIndex].value);
}