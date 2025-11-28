export type Language = 'en' | 'lv';

export const translations = {
  en: {
    header: {
      title: 'Age Calculator',
      subtitle: 'Calculate your exact age on any date'
    },
    section: {
      calculateExactAge: 'Calculate Exact Age',
      instructions: 'Enter your birth date and target date to see your exact age'
    },
    labels: {
      birthDate: 'Birth Date',
      targetDate: 'Target Date'
    },
    placeholders: {
      birthDateHelp: 'The date you were born (DD, MM, YYYY)',
      targetDateHelp: 'The date to calculate age for (DD, MM, YYYY)'
    },
    results: {
      heading: 'Your exact age on the target date:',
      years: 'Years',
      months: 'Months',
      days: 'Days',
      detailedBreakdown: 'Detailed Breakdown',
      totalDays: 'Total Days:',
      totalWeeks: 'Total Weeks:',
      totalMonths: 'Total Months:'
    },
    summary: 'On {date}, you were exactly {age} old.',
    buttons: {
      clearDates: 'Clear Dates',
      useToday: 'Use Today',
      shareResult: 'Share Result',
      help: 'Help',
      about: 'About'
    },
    toast: {
      copiedTitle: 'Copied to clipboard!',
      copiedDescription: 'Age calculation result has been copied to your clipboard.',
      errorTitle: 'Unable to copy',
      errorDescription: 'Please copy the result manually.'
    },
    footer: {
      description: 'Calculate your exact age with precision down to the day',
      note: 'All calculations are performed locally in your browser'
    },
    validation: {
      dayRequired: 'Day is required',
      dayRange: 'Day must be between 1 and 31',
      monthRequired: 'Month is required',
      monthRange: 'Month must be between 1 and 12',
      yearRequired: 'Year is required',
      yearInvalid: 'Year must be valid',
      birthAfterTarget: 'Birth date cannot be after the target date'
    }
  },
  lv: {
    header: {
      title: 'Vecuma Kalkulators',
      subtitle: 'Aprēķiniet savu precīzo vecumu jebkurā datumā'
    },
    section: {
      calculateExactAge: 'Aprēķiniet Precīzo Vecumu',
      instructions: 'Ievadiet savu dzimšanas datumu un mērķa datumu, lai redzētu savu precīzo vecumu'
    },
    labels: {
      birthDate: 'Dzimšanas Datums',
      targetDate: 'Mērķa Datums'
    },
    placeholders: {
      birthDateHelp: 'Datums, kad jūs tika dzimis (DD, MM, YYYY)',
      targetDateHelp: 'Datums, kurā aprēķināt vecumu (DD, MM, YYYY)'
    },
    results: {
      heading: 'Jūsu precīzais vecums mērķa datumā:',
      years: 'Gadi',
      months: 'Mēneši',
      days: 'Dienas',
      detailedBreakdown: 'Detalizēts Sadalījums',
      totalDays: 'Kopā dienu:',
      totalWeeks: 'Kopā nedēļu:',
      totalMonths: 'Kopā mēnešu:'
    },
    summary: 'Dienā {date} jums bija precīzi {age} vecs/a.',
    buttons: {
      clearDates: 'Notīrīt Datumus',
      useToday: 'Izmantot Šodien',
      shareResult: 'Dalīties ar Rezultātu',
      help: 'Palīdzība',
      about: 'Par'
    },
    toast: {
      copiedTitle: 'Nokopēts starpliktuvē!',
      copiedDescription: 'Vecuma aprēķina rezultāts ir nokopēts jūsu starpliktuvē.',
      errorTitle: 'Nevar nokopēt',
      errorDescription: 'Lūdzu, manuāli nokopējiet rezultātu.'
    },
    footer: {
      description: 'Aprēķiniet savu precīzo vecumu ar precizitāti līdz dienai',
      note: 'Visi aprēķini tiek veikti lokāli jūsu pārlūkprogrammā'
    },
    validation: {
      dayRequired: 'Diena ir obligāta',
      dayRange: 'Diena jābūt no 1 līdz 31',
      monthRequired: 'Mēnesis ir obligāts',
      monthRange: 'Mēnesis jābūt no 1 līdz 12',
      yearRequired: 'Gads ir obligāts',
      yearInvalid: 'Gads jābūt derīgs',
      birthAfterTarget: 'Dzimšanas datums nevar būt pēc mērķa datuma'
    }
  }
} as const;

export const getTranslation = (language: Language) => translations[language];
