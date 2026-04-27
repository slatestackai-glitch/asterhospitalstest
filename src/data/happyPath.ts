export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  nextAvailable: string;
  mode: string;
  photoUrl: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  imageUrl: string;
  rating: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-varghese",
    name: "Dr. Sarah Varghese",
    specialty: "Dermatologist",
    hospital: "Aster CMI Hospital, Bangalore",
    nextAvailable: "Tomorrow, 11:30 AM",
    mode: "In-person",
    photoUrl: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "dr-sharma",
    name: "Dr. Rajesh Sharma",
    specialty: "Dermatologist",
    hospital: "Aster RV Hospital, Bangalore",
    nextAvailable: "Wednesday, 02:00 PM",
    mode: "Online / In-person",
    photoUrl: "https://i.pravatar.cc/150?u=rajesh",
  },
];

export const specialties: Specialty[] = [
  {
    id: "derm",
    name: "Dermatology",
    description: "Expert care for skin, hair, and nail conditions.",
  }
];

export const hospitals: Hospital[] = [
  {
    id: "aster-cmi",
    name: "Aster CMI Hospital",
    location: "Hebbal, Bangalore",
    specialties: ["Multi-specialty", "Quaternary Care"],
    imageUrl: "https://images.unsplash.com/photo-1587350846008-0610f9486337?q=80&w=600&h=400&auto=format&fit=crop",
    rating: "4.8"
  },
  {
    id: "aster-rv",
    name: "Aster RV Hospital",
    location: "JP Nagar, Bangalore",
    specialties: ["Comprehensive Care", "Digital Health"],
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&h=400&auto=format&fit=crop",
    rating: "4.7"
  },
  {
    id: "aster-medcity",
    name: "Aster Medcity",
    location: "Kochi, Kerala",
    specialties: ["Global Healthcare", "Advanced Research"],
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&h=400&auto=format&fit=crop",
    rating: "4.9"
  }
];

export type StepId = 
  | 'start'
  | 'need-narrowing'
  | 'mode-selection'
  | 'city-selection'
  | 'intent-narrowing'
  | 'skin-hair-details'
  | 'doctor-selection'
  | 'slot-selection'
  | 'details-form'
  | 'whatsapp-continuation'
  | 'confirmation';

export interface Step {
  id: StepId;
  aiMessage: string[];
  prefilledResponse: string;
  suggestions: string[];
}

export const happyPath: Record<StepId, Step> = {
  'start': {
    id: 'start',
    aiMessage: [
      "Of course. Let's help you find the right appointment.",
      "We can start with a doctor, a speciality, a hospital, or simply what you need help with."
    ],
    prefilledResponse: "I need help choosing the right specialist.",
    suggestions: [
      "I know the doctor.",
      "I know the speciality.",
      "I know the hospital.",
      "I need help choosing the right specialist."
    ]
  },
  'need-narrowing': {
    id: 'need-narrowing',
    aiMessage: [
      "No problem. I can help narrow that down.",
      "Would you prefer an in-person visit or an online consultation?"
    ],
    prefilledResponse: "I'd prefer an in-person visit.",
    suggestions: [
      "I'd prefer an in-person visit.",
      "I'd prefer an online consultation.",
      "Show me both."
    ]
  },
  'mode-selection': {
    id: 'mode-selection',
    aiMessage: [
      "Which city would be most convenient for you?"
    ],
    prefilledResponse: "I'm looking in Bangalore.",
    suggestions: [
      "I'm looking in Bangalore.",
      "I'm looking in Kochi.",
      "Any nearby option is fine."
    ]
  },
  'city-selection': {
    id: 'city-selection',
    aiMessage: [
      "If you're unsure of the speciality, I can help based on what kind of support you need.",
      "What would you like help with?"
    ],
    prefilledResponse: "I need help with skin or hair concerns.",
    suggestions: [
      "I need help with skin or hair concerns.",
      "This is for child health.",
      "I need help with heart-related concerns.",
      "This is for a general consultation.",
      "I need help with women's health."
    ]
  },
  'skin-hair-details': {
    id: 'skin-hair-details',
    aiMessage: [
      "Based on what you shared, dermatology looks like the right place to start."
    ],
    prefilledResponse: "I'd like to book with Dr. Sarah Varghese.",
    suggestions: [] // Cards will handle this
  },
  'doctor-selection': {
    id: 'doctor-selection',
    aiMessage: [
      "Good choice. Here are the earliest available slots."
    ],
    prefilledResponse: "I'll take the 11:30 AM slot tomorrow.",
    suggestions: [] // Slot module handles this
  },
  'slot-selection': {
    id: 'slot-selection',
    aiMessage: [
      "Almost done — I just need a few details to confirm this."
    ],
    prefilledResponse: "Proceed to confirm my details.",
    suggestions: [] // Details form handles this
  },
  'details-form': {
    id: 'details-form',
    aiMessage: [
      "You're all set. Would you like me to save this on WhatsApp so you can revisit or continue later?"
    ],
    prefilledResponse: "Please save this on WhatsApp.",
    suggestions: [
      "Please save this on WhatsApp.",
      "Not now, thank you."
    ]
  },
  'whatsapp-continuation': {
    id: 'whatsapp-continuation',
    aiMessage: [
      "Perfect. I've sent the details to your WhatsApp.",
      "Here is your appointment summary."
    ],
    prefilledResponse: "Great, thanks!",
    suggestions: []
  },
  'confirmation': {
    id: 'confirmation',
    aiMessage: [
      "You're all set! We've sent a confirmation email as well."
    ],
    prefilledResponse: "Restart Journey",
    suggestions: []
  },
  'intent-narrowing': { id: 'intent-narrowing', aiMessage: [], prefilledResponse: '', suggestions: [] }, // Stub
};
