export interface ImportantDate {
  name: string;
  type: 'islamic' | 'national';
}

// Hijri calendar important dates (month-day as key)
export const ISLAMIC_DATES: Record<string, ImportantDate> = {
  '1-1': { name: 'Tahun Baru Islam', type: 'islamic' },
  '1-10': { name: 'Hari Asyura', type: 'islamic' },
  '3-12': { name: 'Maulid Nabi Muhammad SAW', type: 'islamic' },
  '7-27': { name: 'Isra Mi\'raj', type: 'islamic' },
  '8-15': { name: 'Nisfu Sya\'ban', type: 'islamic' },
  '9-1': { name: 'Awal Ramadhan', type: 'islamic' },
  '9-17': { name: 'Nuzulul Quran', type: 'islamic' },
  '9-21': { name: 'Lailatul Qadr (perkiraan)', type: 'islamic' },
  '10-1': { name: 'Idul Fitri', type: 'islamic' },
  '10-2': { name: 'Idul Fitri (hari ke-2)', type: 'islamic' },
  '12-8': { name: 'Hari Tarwiyah', type: 'islamic' },
  '12-9': { name: 'Hari Arafah', type: 'islamic' },
  '12-10': { name: 'Idul Adha', type: 'islamic' },
  '12-11': { name: 'Hari Tasyrik', type: 'islamic' },
  '12-12': { name: 'Hari Tasyrik', type: 'islamic' },
  '12-13': { name: 'Hari Tasyrik', type: 'islamic' },
};

// Gregorian national holidays (month-day as key)
export const NATIONAL_DATES: Record<string, ImportantDate> = {
  '1-1': { name: 'Tahun Baru Masehi', type: 'national' },
  '5-1': { name: 'Hari Buruh', type: 'national' },
  '6-1': { name: 'Hari Lahir Pancasila', type: 'national' },
  '8-17': { name: 'Hari Kemerdekaan RI', type: 'national' },
  '10-28': { name: 'Hari Sumpah Pemuda', type: 'national' },
  '11-10': { name: 'Hari Pahlawan', type: 'national' },
  '12-25': { name: 'Hari Natal', type: 'national' },
};

export const HIJRI_MONTHS: Record<number, string> = {
  1: 'Muharram',
  2: 'Safar',
  3: 'Rabiul Awal',
  4: 'Rabiul Akhir',
  5: 'Jumadil Awal',
  6: 'Jumadil Akhir',
  7: 'Rajab',
  8: "Sya'ban",
  9: 'Ramadhan',
  10: 'Syawal',
  11: "Dzulqa'dah",
  12: 'Dzulhijjah',
};
