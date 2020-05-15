# Improvised Canon
### This simple web app generates a Renaissance-like melody that is imitated by a second voice a 5th below, which is then imitated by a third voice an octave above.

To see the app in action [click here](https://rampollaluis.github.io/improvised-canon/)

The inspiration for this came when I came across [Peter Schubert's videos](https://youtu.be/eu_-OfAABHw) on this topic. Basically, in order for this to work, the melody may start at any point of the scale, but every time you will move to the next note you only have a few choices. In this case, since we have 2 additional voices, we may only move down a 5th, down a 3rd, stay on the same note, or go up a 4th, and we may only repeat the same note up to 2 times.

## Possible Future Work:
- Currently not working on iOS.
- Displaying the score of the melody generated.
- Ability to choose which voices starts and which voice imitates who. For example, instead of a middle voiced followed by a voice a 5th below that one being followed by a voice an octave above, having the high voice start, followed by one an octave below and that one followed by one a 5th above.
- Having all voices end at the same time before the cadence.
- Better system for the cadence. Right now, the cadence is not part of the ammount of measures you are selecting. These only determine how many measures will be generated, and the cadence is added on top of that.
- Looking into letting the user pick the type of cadence.

## References, inspirations, and other resources:
- [Github pages for the app](https://rampollaluis.github.io/improvised-canon/)
- [Tone.js](https://github.com/Tonejs/Tone.js)
- [tone-js-instruments](https://github.com/nbrosowsky/tonejs-instruments)
- [Tutorial on Tone.js and generative music](http://compform.net/music/)
- [Nice summary of Reinassance imporvisation](https://mtosmt.org/issues/mto.13.19.2/mto.13.19.2.cumming.php)