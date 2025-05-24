// Sample contractor data (first 50 of 405 total contractors)
export interface Contractor {
  YEAR: number
  ACCOUNT_NUMBER: number
  CUSTOMER_NAME: string
  BADGE_NUMBER: string
  ADDRESS: string
  JANUARY: number
  FEBRUARY: number
  MAR: number
  APR: number
  MAY: number
  JUNE: number
  JULY: number
  AUGUST: number
  SEPTEMBER: number
  OCTOBER: number
  NOVEMBER: number
  DECEMBER: number
}

// Sample data - in production, this would include all 405 contractors
export const contractorData: Contractor[] = [
  {
    "YEAR": 2025,
    "ACCOUNT_NUMBER": 4300001,
    "CUSTOMER_NAME": "Royal Court Affairs",
    "BADGE_NUMBER": "B244A138641",
    "ADDRESS": "Z5 017",
    "JANUARY": 112,
    "FEBRUARY": 80,
    "MAR": 81,
    "APR": 90,
    "MAY": 11,
    "JUNE": 0,
    "JULY": 0,
    "AUGUST": 0,
    "SEPTEMBER": 0,
    "OCTOBER": 0,
    "NOVEMBER": 0,
    "DECEMBER": 0
  },
  {
    "YEAR": 2025,
    "ACCOUNT_NUMBER": 4300002,
    "CUSTOMER_NAME": "Al-Thabat Holding Company",
    "BADGE_NUMBER": "B244A141813",
    "ADDRESS": "Z3 042",
    "JANUARY": 32,
    "FEBRUARY": 46,
    "MAR": 19,
    "APR": 62,
    "MAY": 11,
    "JUNE": 0,
    "JULY": 0,
    "AUGUST": 0,
    "SEPTEMBER": 0,
    "OCTOBER": 0,
    "NOVEMBER": 0,
    "DECEMBER": 0
  },
  {
    "YEAR": 2025,
    "ACCOUNT_NUMBER": 4300003,
    "CUSTOMER_NAME": "Shakir Mohamed Nurali Merali & Madiha Raza",
    "BADGE_NUMBER": "B244A141787",
    "ADDRESS": "Z3 046(5)",
    "JANUARY": 5,
    "FEBRUARY": 0,
    "MAR": 0,
    "APR": 0,
    "MAY": 0,
    "JUNE": 0,
    "JULY": 0,
    "AUGUST": 0,
    "SEPTEMBER": 0,
    "OCTOBER": 0,
    "NOVEMBER": 0,
    "DECEMBER": 0
  },
  {
    "YEAR": 2025,
    "ACCOUNT_NUMBER": 4300004,
    "CUSTOMER_NAME": "Taekwon Kim & Soon Bun Seo ",
    "BADGE_NUMBER": "B244A141411",
    "ADDRESS": "Z3 049(3)",
    "JANUARY": 10,
    "FEBRUARY": 15,
    "MAR": 11,
    "APR": 13,
    "MAY": 9,
    "JUNE": 0,
    "JULY": 0,
    "AUGUST": 0,
    "SEPTEMBER": 0,
    "OCTOBER": 0,
    "NOVEMBER": 0,
    "DECEMBER": 0
  },
  {
    "YEAR": 2025,
    "ACCOUNT_NUMBER": 4300005,
    "CUSTOMER_NAME": "Maqbool Mohamed Abdul Rahman Al-Lawati & Khawla Hamood Al Waaili",
    "BADGE_NUMBER": "B244A142105",
    "ADDRESS": "Z3 053",
    "JANUARY": 101,
    "FEBRUARY": 148,
    "MAR": 74,
    "APR": 70,
    "MAY": 91,
    "JUNE": 0,
    "JULY": 0,
    "AUGUST": 0,
    "SEPTEMBER": 0,
    "OCTOBER": 0,
    "NOVEMBER": 0,
    "DECEMBER": 0
  }
]

// Note: This is sample data. The full dataset contains 405 contractors.
// To load the complete dataset, you would need to implement server-side data fetching
// or use a more efficient data storage solution.
