/**
 * @fileoverview A sample library and quick-loader for tone.js
 * 
 * @author N.P. Brosowsky (nbrosowsky@gmail.com)
 * https://github.com/nbrosowsky/tonejs-instruments
 */

var SampleLibrary = {
    minify: false,
    ext: '.[mp3|ogg]', // use setExt to change the extensions on all files // do not change this variable //
    baseUrl: 'samples/',
    list: ['bassoon', 'clarinet', 'flute', 'french-horn', 'harmonium', 'organ', 'piano', 'trumpet'],
    onload: null,

    setExt: function(newExt) {
        var i
        for (i = 0; i <= this.list.length - 1; i++) {
            for (var property in this[this.list[i]]) {

                this[this.list[i]][property] = this[this.list[i]][property].replace(this.ext, newExt)
            }


        }
        this.ext = newExt;
        return console.log("sample extensions set to " + this.ext)
    },

    load: function(arg) {
        var t, rt, i;
        (arg) ? t = arg: t = {};
        t.instruments = t.instruments || this.list;
        t.baseUrl = t.baseUrl || this.baseUrl;
        t.onload = t.onload || this.onload;

        // update extensions if arg given
        if (t.ext) {
            if (t.ext != this.ext) {
                this.setExt(t.ext)
            }
            t.ext = this.ext
        }

        rt = {};

        // if an array of instruments is passed...
        if (Array.isArray(t.instruments)) {
            for (i = 0; i <= t.instruments.length - 1; i++) {
                var newT = this[t.instruments[i]];
                //Minimize the number of samples to load
                if (this.minify === true || t.minify === true) {
                    var minBy = 1;
                    if (Object.keys(newT).length >= 17) {
                        minBy = 2
                    }
                    if (Object.keys(newT).length >= 33) {
                        minBy = 4
                    }
                    if (Object.keys(newT).length >= 49) {
                        minBy = 6
                    }

                    var filtered = Object.keys(newT).filter(function(_, i) {
                        return i % minBy != 0;
                    })
                    filtered.forEach(function(f) {
                        delete newT[f]
                    })

                }




                rt[t.instruments[i]] = new Tone.Sampler(
                    newT, {
                        baseUrl: t.baseUrl + t.instruments[i] + "/",
                        onload: t.onload
                    }

                )
            }

            return rt

            // if a single instrument name is passed...
        } else {
            newT = this[t.instruments];

            //Minimize the number of samples to load
            if (this.minify === true || t.minify === true) {
                minBy = 1;
                if (Object.keys(newT).length >= 17) {
                    minBy = 2
                }
                if (Object.keys(newT).length >= 33) {
                    minBy = 4
                }
                if (Object.keys(newT).length >= 49) {
                    minBy = 6
                }

                filtered = Object.keys(newT).filter(function(_, i) {
                    return i % minBy != 0;
                })
                filtered.forEach(function(f) {
                    delete newT[f]
                })
            }




            var s = new Tone.Sampler(
                newT, {
                    baseUrl: t.baseUrl + t.instruments + "/",
                    onload: t.onload
                }
            )

            return s
        }

    },

    'bassoon': {
        'A3': 'A3.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]'

    },

    'clarinet': {
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]'

    },

    'flute': {
        'A5': 'A5.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'E5': 'E5.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]'

    },

    'french-horn': {
        'D2': 'D2.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'G1': 'G1.[mp3|ogg]',
        'A0': 'A0.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',

    },

    'harmonium': {
        'C2': 'C2.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C#2': 'Cs2.[mp3|ogg]',
        'C#3': 'Cs3.[mp3|ogg]',
        'C#4': 'Cs4.[mp3|ogg]',
        'C#5': 'Cs5.[mp3|ogg]',
        'D2': 'D2.[mp3|ogg]',
        'D3': 'D3.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D5': 'D5.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'E2': 'E2.[mp3|ogg]',
        'E3': 'E3.[mp3|ogg]',
        'E4': 'E4.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'G2': 'G2.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'G4': 'G4.[mp3|ogg]',
        'G#2': 'Gs2.[mp3|ogg]',
        'G#3': 'Gs3.[mp3|ogg]',
        'G#4': 'Gs4.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A#2': 'As2.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'A#4': 'As4.[mp3|ogg]'
    },

    'organ': {
        'C3': 'C3.[mp3|ogg]',
        'C4': 'C4.[mp3|ogg]',
        'C5': 'C5.[mp3|ogg]',
        'C6': 'C6.[mp3|ogg]',
        'D#1': 'Ds1.[mp3|ogg]',
        'D#2': 'Ds2.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'D#4': 'Ds4.[mp3|ogg]',
        'D#5': 'Ds5.[mp3|ogg]',
        'F#1': 'Fs1.[mp3|ogg]',
        'F#2': 'Fs2.[mp3|ogg]',
        'F#3': 'Fs3.[mp3|ogg]',
        'F#4': 'Fs4.[mp3|ogg]',
        'F#5': 'Fs5.[mp3|ogg]',
        'A1': 'A1.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A3': 'A3.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A5': 'A5.[mp3|ogg]',
        'C1': 'C1.[mp3|ogg]',
        'C2': 'C2.[mp3|ogg]'
    },

    'trumpet': {
        'C5': 'C5.[mp3|ogg]',
        'D4': 'D4.[mp3|ogg]',
        'D#3': 'Ds3.[mp3|ogg]',
        'F2': 'F2.[mp3|ogg]',
        'F3': 'F3.[mp3|ogg]',
        'F4': 'F4.[mp3|ogg]',
        'G3': 'G3.[mp3|ogg]',
        'A2': 'A2.[mp3|ogg]',
        'A4': 'A4.[mp3|ogg]',
        'A#3': 'As3.[mp3|ogg]',
        'C3': 'C3.[mp3|ogg]'

    },


}