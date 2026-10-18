// English teaching copy, keyed by stable curriculum IDs. Notation stays Chinese.
export const lessonCopy = {
  structure: {
    title: 'One symbol, two hands', subtitle: 'Find four pieces of information in one symbol',
    steps: [
      ['Read the structure first', 'A typical stopped-tone symbol combines the left-hand finger, hui position, right-hand technique and string number. Jianzipu first tells you how to play.'],
      ['Take this symbol apart', 'The upper components 名 and 九 indicate the left ring finger and hui 9. Below, 勾 and 五 tell you to pluck string 5 with gou. Components can be arranged differently, so do not identify a number by its size alone.'],
      ['Say the action in a sentence', 'Stop string 5 at hui 9 with your left ring finger, then pluck inward with your right middle finger. Say the action to yourself, then compare it with your teacher’s demonstration.'],
    ],
  },
  right: {
    title: 'Eight techniques, four pairs', subtitle: 'One finger, two directions',
    steps: [
      ['Identify the finger', '勾 gou and 剔 ti use the middle finger; 抹 mo and 挑 tiao use the index finger; 擘 bo/pi and 托 tuo use the thumb; 打 da and 摘 zhai use the ring finger. Identify the finger before the direction.'],
      ['Compare inward and outward', 'Here, inward means toward you and outward means away from you. Inward: 擘, 抹, 勾, 打. Outward: 托, 挑, 剔, 摘.'],
      ['Connect the full character to its reduced form', 'A notation component often keeps only part of a Chinese character. Learn the full name alongside the reduced form. For variants such as 擘 and 劈, follow your own teaching materials.'],
    ],
  },
  position: {
    title: 'Numbers need context', subtitle: 'Distinguish string numbers from hui positions',
    steps: [
      ['String 7 is not hui 7', 'Strings are numbered 1 through 7. Hui are the position markers along the strings. Which component a number belongs to matters more than its appearance alone.'],
      ['“Seven-six” can name one position', 'This course follows modern hui-and-fen notation: seven hui, six fen is written 7.6. In this example the ring finger is at hui 7.6, while the right hand plucks string 6 with gou. The two sixes have different roles.'],
      ['Halves and subdivisions', 'Eight-and-a-half hui is written 8.5 here. These subdivisions are not semitone numbers in equal temperament. The diagram helps locate a position; tune by ear. Check each historical score’s own position conventions.'],
    ],
  },
  tone: {
    title: 'One string, three tone types', subtitle: 'Recognize open, stopped and harmonic tones',
    steps: [
      ['散 san: let the string ring freely', '散 indicates an open string, with no left-hand stopping. It is not a hui number.'],
      ['Stopped and harmonic: different pressure', 'A stopped tone needs the string pressed down; a harmonic needs a light touch at a node. A harmonic mark changes how the tone is produced. Still read the finger and position together.'],
      ['Read beyond a single symbol', 'Between 泛起 (begin harmonics) and 泛止 (end harmonics), the harmonic instruction can remain in force. Do not expect the mark to be repeated before every note; keep reading in context.'],
    ],
  },
  movement: {
    title: 'The sound continues, the hand moves', subtitle: 'Read yin, nao, chuo, zhu and slides',
    steps: [
      ['Compare 吟 yin and 猱 nao', 'Yin generally uses a smaller oscillation; nao is generally broader and rhythmic. This course teaches recognition and meaning. Learn the physical motion from your teacher.'],
      ['绰 chuo and 注 zhu: approach a target pitch', 'Chuo approaches from below; zhu approaches from above. Compare their pitch direction. Do not confuse rising or falling pitch with the position of a mark on the page.'],
      ['上 shang and 下 xia: carry the previous tone forward', 'Movement signs usually depend on the preceding string, finger and position. In 上七 and 下九, seven and nine are destination hui positions, not new strings.'],
    ],
  },
  context: {
    title: 'From symbols to phrases', subtitle: 'Carry context forward, then remove the hints',
    steps: [
      ['Do not start over at every symbol', 'Carry information forward when you meet a continuing movement or a passage-level tone instruction. Gradually expand your reading unit from one symbol to a phrase.'],
      ['Explore first, then hide the explanation', 'In the phrase reader, study each symbol and its explanation, then switch to self-test. Say the action before revealing the explanation, rather than relying on a feeling of familiarity.'],
      ['Notation is not the whole performance', 'These are original reading exercises, not editions of an existing composition. Learn unspecified timing and phrasing from your teacher, score edition or recordings. The site does not invent a single correct rhythm.'],
    ],
  },
};
export const termCopy = {
  ming: ['The left ring finger.', '名 names a finger, not a pitch. Recognize it alongside 大, 食 and 中.'],
  'da-left': ['The left thumb.', 'Identify the left-hand finger, then read the nearby hui position.'],
  zhong: ['The left middle finger.', 'Do not confuse it with right-hand 勾 gou. Both may use a middle finger, but on different hands.'],
  shi: ['The left index finger.', 'Follow your score and teacher when choosing a stopping finger.'],
  san: ['An open string: pluck without stopping it with the left hand.', '散 is an open-string instruction, not hui zero.'],
  fan: ['Touch a harmonic node lightly with the left hand while plucking with the right.', '泛起 begins a harmonic passage; 泛止 ends it. Read these passage marks together with the following symbols.'],
  an: ['Stop the string with the left hand and pluck with the right.', 'An ordinary stopped-tone symbol usually gives the left-hand finger and hui position directly, without a separate 按 mark.'],
  yin: ['A relatively narrow oscillation after stopping the string.', 'Timing, width and repetitions depend on the score and your teacher’s demonstration; the character alone does not fix them.'],
  nao: ['A generally broader, rhythmic oscillation.', 'Compare it with 吟 yin. The precise motion differs between traditions.'],
  chuo: ['Slide toward the target pitch from below.', 'Also written 綽. This is an upward pitch approach, not lifting the hand off the string.'],
  zhu: ['Slide toward the target pitch from above.', 'The counterpart of 绰 chuo: a downward pitch approach.'],
  shang: ['Slide to a higher pitch, usually toward the yueshan bridge.', '上七 means move to hui 7. It does not mean pluck string 7 again.'],
  xia: ['Slide to a lower pitch, usually toward the longyin end.', '下九 means move to hui 9. Use the preceding symbol to identify the string and finger.'],
};
export const phraseCopy = {
  open: ['Open strings · alternating techniques', 'Focus on the right hand and string number', []],
  slide: ['Stopped tones · keep the context', 'Movement signs retain the preceding string and finger', [null,
    'Keep your left ring finger on string 5 and move to hui 7. This movement sign does not ask for another right-hand pluck.',
    'Use yin at the position you have just reached. Follow your teacher for its width and rhythm.',
    'Still on string 5, move your left ring finger to hui 9.',
  ]],
  harmonic: ['Harmonics · passage boundaries', 'A mark can govern more than its neighboring symbol', [
    'A harmonic passage begins here. Interpret the following symbols in that context.',
    'The harmonic instruction still applies: lightly touch string 5 at hui 7 with the ring finger and pluck with gou.',
    'Still in the harmonic passage: lightly touch string 6 at hui 9 with the ring finger and pluck with tiao.',
    'The harmonic passage ends here. Read the next symbol according to its own instructions.',
  ]],
};
export const sourceCopy = {
  hkm: ['Hong Kong Memory · The Story of Qin', 'Playing techniques', 'The eight right-hand techniques and basic meanings of yin, nao, chuo and zhu. This course follows the common plucking directions described by the collection.'],
  notes: ['Yuting Chao · Guqin Notes', 'Guqin tablature structure and reading', 'Structural breakdown, number recognition and the teaching sequence for left- and right-hand components.'],
  silk: [null, null, 'The difference between reading notation and playing it; rhythm, phrasing and traditions of transmission.'],
  font: [null, null, 'Jianzipu glyphs and composite typography. The font is used under SIL Open Font License 1.1. Its encoding specification is not a playing tutorial.'],
  learning: [null, null, 'A review of retrieval practice and distributed learning. This site applies those principles; its scheduling has not been experimentally validated for guqin learning.'],
  tor: [null, null, 'Further reading on technique, tuning and interpreting historical tablature. This site does not reproduce its scores or recordings.'],
};
