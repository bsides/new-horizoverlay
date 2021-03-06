function getRandom(min, max) {
  const first = Math.ceil(min)
  const last = Math.floor(max)
  return Math.floor(Math.random() * (last - first + 1)) + first
}

const defaultConfig = {
  showSetup: false,
  theme: 'byRole', // color: 'byRole'
  characterName: 'YOU',
  showRank: true,
  showJobIcon: true,
  showHps: true,
  showHighlight: false,
  showSelf: true,
  showMaxhit: false,
  showDuration: true,
  showTotalDps: true,
  showDamagePercent: true,
  showDiscord: false,
  showLocale: false,
  zoom: '1',
  discord: '',
  maxCombatants: 8,
  locale: 'enUS',
  configWindow: {
    width: 1300,
    height: 239
  },
  colorHealer: 'rgba(139, 195, 74, 0.3)',
  colorTank: 'rgba(33, 150, 243, 0.3)',
  colorDps: 'rgba(244, 67, 54, 0.3)'
}

const jobRoles = {
  tank: ['drk', 'gla', 'mrd', 'pld', 'war', 'titan'],
  healer: ['ast', 'cnj', 'sch', 'whm', 'eos', 'selene'],
  dps: [
    'acn',
    'arc',
    'blm',
    'brd',
    'drg',
    'lnc',
    'mch',
    'mnk',
    'nin',
    'pgl',
    'pug',
    'rdm',
    'rog',
    'sam',
    'smn',
    'thm',
    'carbuncle',
    'garuda',
    'ifrit',
    'rook',
    'bishop',
    'chocobo',
    'lb'
  ]
}

const mockData = [
  {
    isSelf: true,
    name: 'YOU',
    jobClass: 'Nin',
    jobFull: 'Ninja',
    job: 'nin',
    jobRole: 'job-dps',
    rank: 1,
    dps: '5450',
    edps: '5450.30',
    hps: '0',
    ehps: '0.0',
    isHealing: false,
    damagePct: '36',
    maxhit: 'Super Yey-3921'
  },
  {
    isSelf: false,
    name: 'Vivi Ornitier',
    jobClass: 'Blm',
    jobFull: 'Black Mage',
    job: 'blm',
    jobRole: 'job-dps',
    rank: 2,
    dps: '5283',
    edps: '5283.29',
    hps: '0',
    ehps: '0.0',
    isHealing: false,
    damagePct: '32',
    maxhit: 'Meteor-4221'
  },
  {
    isSelf: false,
    name: 'Zidane Tribal',
    jobClass: 'Nin',
    jobFull: 'Ninja',
    job: 'nin',
    jobRole: 'job-dps',
    rank: 3,
    dps: '2648',
    edps: '2648.91',
    hps: '4',
    ehps: '4.12',
    isHealing: false,
    damagePct: '22',
    maxhit: 'Thievery-2332'
  },
  {
    isSelf: false,
    name: 'Garnet Alexandros',
    jobClass: 'Smn',
    jobFull: 'Summoner',
    job: 'smn',
    jobRole: 'job-dps',
    rank: 4,
    dps: '1654',
    edps: '1654.90',
    hps: '12',
    ehps: '12.10',
    isHealing: false,
    damagePct: '15',
    maxhit: 'Alexander-8720'
  },
  {
    isSelf: false,
    name: 'Freya Crescent',
    jobClass: 'Drg',
    jobFull: 'Dragoon',
    job: 'drg',
    jobRole: 'job-dps',
    rank: 5,
    dps: '1977',
    edps: '1977.42',
    hps: '3',
    ehps: '3.10',
    isHealing: false,
    damagePct: '16',
    maxhit: "Rei's Wind-3092"
  },
  {
    isSelf: false,
    name: 'Adelbert Steiner',
    jobClass: 'Pld',
    jobFull: 'Paladin',
    job: 'pld',
    jobRole: 'job-tank',
    rank: 6,
    dps: '1548',
    edps: '1548.24',
    hps: '588',
    ehps: '588.50',
    isHealing: false,
    damagePct: '9',
    maxhit: 'Power Break-1251'
  },
  {
    isSelf: false,
    name: 'Quina Quen',
    jobClass: 'War',
    jobFull: 'Warrior',
    job: 'war',
    jobRole: 'job-tank',
    rank: 8,
    dps: '1366',
    edps: '1366.61',
    hps: '112',
    ehps: '112.50',
    isHealing: false,
    damagePct: '6',
    maxhit: 'Frog Drop-9999'
  },
  {
    isSelf: false,
    name: 'Eiko Carol',
    jobClass: 'Whm',
    jobFull: 'White Mage',
    job: 'whm',
    jobRole: 'job-healer',
    rank: 7,
    dps: '1461',
    edps: '1461.64',
    hps: '9821',
    ehps: '9821.50',
    isHealing: true,
    damagePct: '7',
    maxhit: 'Carbuncle-9701'
  },
  {
    isSelf: false,
    name: 'Alphinaud Cheater',
    jobClass: 'Sch',
    jobFull: 'Scholar',
    job: 'sch',
    jobRole: 'job-healer',
    rank: 9,
    dps: '447',
    edps: '447.18',
    hps: '5661',
    ehps: '5661.12',
    isHealing: true,
    damagePct: '2',
    maxhit: 'Geez-411'
  },
  {
    isSelf: false,
    name: 'Limit Break',
    jobClass: '',
    jobFull: '',
    job: '',
    jobRole: '',
    rank: 5.5,
    dps: '447',
    edps: '447.18',
    hps: '',
    ehps: '',
    isHealing: true,
    damagePct: '4',
    maxhit: 'Limit Break-29891'
  }
]

const mockDataStream = () => {
  let Combatant = {
    YOU: {
      ENCDPS: Math.floor(495 * Math.random()).toString(),
      ENCHPS: Math.floor(602 * Math.random()).toString(),
      CritDirectHitCount: '2',
      CritDirectHitPct: '3%',
      DURATION: '153',
      damage: '61871',
      'damage%': '100%',
      deaths: 0,
      maxhit: 'Wind Blade-2059',
      maxheal: 'Physick-790',
      misses: 0
    },
    'Other Person': {
      ENCDPS: Math.floor(495 * Math.random()).toString(),
      ENCHPS: Math.floor(602 * Math.random()).toString(),
      CritDirectHitCount: '2',
      CritDirectHitPct: '3%',
      DURATION: '153',
      damage: '61871',
      'damage%': '100%',
      deaths: 0,
      maxhit: 'Wind Blade-2059',
      maxheal: 'Physick-790',
      misses: 0
    },
    'Someone Else': {
      ENCDPS: Math.floor(495 * Math.random()).toString(),
      ENCHPS: Math.floor(602 * Math.random()).toString(),
      CritDirectHitCount: '2',
      CritDirectHitPct: '3%',
      DURATION: '153',
      damage: '61871',
      'damage%': '100%',
      deaths: 0,
      maxhit: 'Wind Blade-2059',
      maxheal: 'Physick-790',
      misses: 0
    }
  }
  const Encounter = {
    title: 'Encounter',
    CurrentZoneName: 'Whatever',
    damage: Math.floor(9000 * Math.random()).toString(),
    DURATION: '47',
    maxheal: 'YOU-Physick-790',
    maxhit: 'YOU-Wind Blade-2059',
    encdps: Math.floor(495 * Math.random()).toString(),
    enchps: Math.floor(602 * Math.random()).toString()
  }
  return {
    Encounter,
    Combatant,
    isActive: true
  }
}

export { mockData, jobRoles, getRandom, defaultConfig, mockDataStream }
