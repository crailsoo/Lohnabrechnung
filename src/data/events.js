// Calendar events for May 2026 + weekly tip pool

export const CALENDAR_EVENTS = [
  { date: 1,  type: 'holiday',  label: 'Tag der Arbeit' },
  { date: 3,  type: 'sick',     empId: 'ar' },
  { date: 4,  type: 'sick',     empId: 'ar' },
  { date: 5,  type: 'sick',     empId: 'ar' },
  { date: 6,  type: 'sick',     empId: 'ar' },
  { date: 7,  type: 'sick',     empId: 'ar' },
  { date: 10, type: 'deadline', label: 'Lohnsteuer-Anmeldung' },
  { date: 14, type: 'leave',    empId: 'mw' },
  { date: 15, type: 'leave',    empId: 'mw' },
  { date: 16, type: 'leave',    empId: 'mw' },
  { date: 18, type: 'holiday',  label: 'Pfingsten' },
  { date: 25, type: 'leave',    empId: 'el' },
  { date: 26, type: 'leave',    empId: 'el' },
  { date: 27, type: 'leave',    empId: 'el' },
  { date: 28, type: 'leave',    empId: 'el' },
  { date: 29, type: 'leave',    empId: 'el' },
  { date: 30, type: 'deadline', label: 'Lohnlauf Mai' },
];

export const TIPS_WEEK = {
  total: 487.50,
  pool: [
    { empId: 'sl', hours: 38, share: 152.34 },
    { empId: 'el', hours: 0,  share: 0      },
    { empId: 'fk', hours: 32, share: 128.28 },
    { empId: 'tb', hours: 24, share: 96.21  },
    { empId: 'mw', hours: 8,  share: 32.07  },
    { empId: 'ja', hours: 0,  share: 0      },
    { empId: 'ar', hours: 0,  share: 0      },
  ],
};
