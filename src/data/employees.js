export const RAPHIS_TEAM = [
  {
    id: 'mw', initials: 'MW', firstName: 'Mert', lastName: 'Yılmaz',
    role: 'Schichtleiter Küche', type: 'Vollzeit', typeShort: 'VZ',
    hourlyRate: 16.50, monthlySalary: 2640,
    hoursThisMonth: 162, hoursTarget: 160,
    taxClass: 'I', iban: 'DE89 1001 0010 0123 4567 89',
    sv: '12 150394 Y 567', started: '03.2022',
    address: 'Sonnenallee 142, 12059 Berlin',
    birthday: '14.03.1994', phone: '+49 176 1234 5678',
    status: 'on', color: '#3B5BDB',
  },
  {
    id: 'sl', initials: 'SL', firstName: 'Sophie', lastName: 'Lehmann',
    role: 'Service', type: 'Vollzeit', typeShort: 'VZ',
    hourlyRate: 15.20, monthlySalary: 2432,
    hoursThisMonth: 158, hoursTarget: 160,
    taxClass: 'IV', iban: 'DE12 1001 0010 9876 5432 10',
    sv: '21 280295 X 432', started: '07.2023',
    address: 'Karl-Marx-Str. 88, 12043 Berlin',
    birthday: '28.02.1995', phone: '+49 151 8765 4321',
    status: 'off', color: '#0E7C66',
  },
  {
    id: 'ja', initials: 'JA', firstName: 'Jonas', lastName: 'Albrecht',
    role: 'Koch', type: 'Teilzeit', typeShort: 'TZ',
    hourlyRate: 15.80, monthlySalary: 1264,
    hoursThisMonth: 82, hoursTarget: 80,
    taxClass: 'I', iban: 'DE34 1001 0010 1122 3344 55',
    sv: '15 120897 J 211', started: '11.2023',
    address: 'Weserstr. 24, 12047 Berlin',
    birthday: '12.08.1997', phone: '+49 162 4455 6677',
    status: 'on', color: '#9A4B1F',
  },
  {
    id: 'el', initials: 'EL', firstName: 'Elena', lastName: 'Petrova',
    role: 'Service', type: 'Teilzeit', typeShort: 'TZ',
    hourlyRate: 14.80, monthlySalary: 1184,
    hoursThisMonth: 76, hoursTarget: 80,
    taxClass: 'V', iban: 'DE56 1001 0010 5544 3322 11',
    sv: '08 030592 P 998', started: '01.2024',
    address: 'Reuterstr. 51, 12047 Berlin',
    birthday: '03.05.1992', phone: '+49 152 3344 5566',
    status: 'leave', color: '#5E3BC2',
  },
  {
    id: 'fk', initials: 'FK', firstName: 'Finn', lastName: 'Krüger',
    role: 'Aushilfe Service', type: 'Aushilfe', typeShort: 'AH',
    hourlyRate: 14.00, monthlySalary: null,
    hoursThisMonth: 38, hoursTarget: 40,
    taxClass: 'I', iban: 'DE78 1001 0010 7788 9900 11',
    sv: '19 110201 K 124', started: '09.2024',
    address: 'Hermannstr. 207, 12049 Berlin',
    birthday: '11.02.2001', phone: '+49 174 9988 7766',
    status: 'on', color: '#B14878',
  },
  {
    id: 'ar', initials: 'AR', firstName: 'Aylin', lastName: 'Renner',
    role: 'Aushilfe Küche', type: 'Minijob', typeShort: 'MJ',
    hourlyRate: 14.00, monthlySalary: 538,
    hoursThisMonth: 36, hoursTarget: 38,
    taxClass: '–', iban: 'DE90 1001 0010 3344 5566 77',
    sv: '07 240700 R 451', started: '04.2024',
    address: 'Pannierstr. 9, 12047 Berlin',
    birthday: '24.07.2000', phone: '+49 157 6677 8899',
    status: 'sick', color: '#0F6E94',
  },
  {
    id: 'tb', initials: 'TB', firstName: 'Tobias', lastName: 'Berger',
    role: 'Bar', type: 'Minijob', typeShort: 'MJ',
    hourlyRate: 14.50, monthlySalary: 522,
    hoursThisMonth: 34, hoursTarget: 36,
    taxClass: '–', iban: 'DE11 1001 0010 6677 8899 00',
    sv: '11 050695 B 778', started: '02.2024',
    address: 'Friedelstr. 22, 12047 Berlin',
    birthday: '05.06.1995', phone: '+49 159 1122 3344',
    status: 'on', color: '#7A5A1F',
  },
];

export const TODAY_SHIFTS = [
  { empId: 'mw', start: '11:00', end: '20:00', role: 'Küche',   clockedIn: '10:54' },
  { empId: 'ja', start: '11:00', end: '17:00', role: 'Küche',   clockedIn: '10:58' },
  { empId: 'fk', start: '17:00', end: '23:00', role: 'Service', clockedIn: null    },
  { empId: 'tb', start: '18:00', end: '23:30', role: 'Bar',     clockedIn: null    },
];

export const OPEN_ACTIONS = [
  { id: 'a1', kind: 'payroll', title: 'Lohnlauf April 2026',       detail: '7 Abrechnungen · fällig 30.04.',    urgent: true  },
  { id: 'a2', kind: 'leave',   title: 'Urlaubsantrag Sophie L.',   detail: '12.–19. Juni 2026 · 6 Tage',        urgent: false },
  { id: 'a3', kind: 'sick',    title: 'Krankmeldung Aylin R.',     detail: 'seit 03.05. · AU bis 07.05.',        urgent: false },
  { id: 'a4', kind: 'tax',     title: 'Lohnsteuer-Anmeldung März', detail: 'an Finanzamt · fällig 10.05.',       urgent: true  },
];

export const PAYROLL_HISTORY = [
  { month: 'März 2026',     total: 9684.00, count: 7, status: 'paid', date: '30.03.2026' },
  { month: 'Februar 2026',  total: 9421.50, count: 7, status: 'paid', date: '28.02.2026' },
  { month: 'Januar 2026',   total: 9512.30, count: 7, status: 'paid', date: '30.01.2026' },
  { month: 'Dezember 2025', total: 10240.80, count: 8, status: 'paid', date: '30.12.2025' },
];

export const empById = (id) => RAPHIS_TEAM.find((e) => e.id === id);
