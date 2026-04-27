import { create } from 'zustand';
import { type StepId, happyPath } from '../data/happyPath';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'doctor-list' | 'specialty' | 'slots' | 'details' | 'confirmation' | 'whatsapp' | 'carousel';
  data?: any;
}

interface ConversationState {
  currentStepId: StepId | 'landing';
  messages: Message[];
  composerValue: string;
  isFirstMessageSent: boolean;
  selectedDoctor: any | null;
  selectedSlot: string | null;
  userDetails: { name: string; phone: string; email: string } | null;
  
  // Actions
  setStep: (stepId: StepId | 'landing') => void;
  setComposerValue: (value: string) => void;
  sendMessage: (content: string) => void;
  addAssistantMessage: (content: string[], type?: string, data?: any) => void;
  reset: () => void;
  selectDoctor: (doctor: any) => void;
  selectSlot: (slot: string) => void;
  submitDetails: (details: { name: string; phone: string; email: string }) => void;
  advanceHappyPath: (currentStepId: StepId | 'landing', userContent: string) => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  currentStepId: 'landing',
  messages: [],
  composerValue: '',
  isFirstMessageSent: false,
  selectedDoctor: null,
  selectedSlot: null,
  userDetails: null,

  setStep: (stepId) => {
    set({ currentStepId: stepId });
  },

  setComposerValue: (value) => set({ composerValue: value }),

  sendMessage: (content) => {
    const { currentStepId, messages } = get();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    };

    set({ 
      messages: [...messages, newUserMessage],
      composerValue: '',
      isFirstMessageSent: true
    });

    // Advance happy path logic
    setTimeout(() => {
      get().advanceHappyPath(currentStepId, content);
    }, 600);
  },

  addAssistantMessage: (contents, type = 'text', data = null) => {
    const newMessages: Message[] = contents.map((content, index) => ({
      id: (Date.now() + index).toString(),
      role: 'assistant',
      content,
      type: index === contents.length - 1 ? (type as any) : 'text',
      data: index === contents.length - 1 ? data : null
    }));

    set((state) => ({
      messages: [...state.messages, ...newMessages]
    }));
  },

  advanceHappyPath: (currentStepId: StepId | 'landing', userContent: string) => {
    const { addAssistantMessage, setStep } = get();

    const lowerContent = userContent.toLowerCase();

    switch (currentStepId) {
      case 'landing':
        if (lowerContent.includes("choosing") || lowerContent.includes("specialist")) {
          const step = happyPath['need-narrowing'];
          addAssistantMessage(step.aiMessage);
          setStep('need-narrowing');
        } else {
          // General entry (Book appointment, Find doctor, etc.)
          const step = happyPath['start'];
          addAssistantMessage(step.aiMessage, 'carousel', { carouselType: 'hospitals' });
          setStep('start');
        }
        break;
      
      case 'start':
        if (lowerContent.includes("choosing") || lowerContent.includes("specialist")) {
          const step = happyPath['need-narrowing'];
          addAssistantMessage(step.aiMessage);
          setStep('need-narrowing');
        } else if (lowerContent.includes("doctor")) {
          // If they know the doctor, we move towards doctor selection or specialty narrowing
          addAssistantMessage(["Great. Let's find your doctor.", "Which city are you looking in?"]);
          setStep('city-selection');
        } else if (lowerContent.includes("speciality")) {
          addAssistantMessage(["Sure, I can help with that.", "Which city is convenient for you?"]);
          setStep('city-selection');
        } else if (lowerContent.includes("hospital")) {
          addAssistantMessage(["Got it. We have multiple hospitals across cities.", "Which city should we look in?"]);
          setStep('city-selection');
        }
        break;
      
      case 'need-narrowing':
        const modeStep = happyPath['mode-selection'];
        addAssistantMessage(modeStep.aiMessage);
        setStep('mode-selection');
        break;

      case 'mode-selection':
        if (lowerContent.includes("bangalore") || lowerContent.includes("kochi") || lowerContent.includes("any")) {
          const cityStep = happyPath['city-selection'];
          addAssistantMessage(cityStep.aiMessage);
          setStep('city-selection');
        }
        break;

      case 'city-selection':
        if (lowerContent.includes("bangalore") || lowerContent.includes("kochi") || lowerContent.includes("any")) {
          const step = happyPath['city-selection'];
          addAssistantMessage(step.aiMessage);
          setStep('city-selection');
        } else if (lowerContent.includes("skin") || lowerContent.includes("hair") || lowerContent.includes("child") || lowerContent.includes("heart")) {
          const detailsStep = happyPath['skin-hair-details'];
          addAssistantMessage(detailsStep.aiMessage, 'specialty', { id: 'derm' });
          setStep('skin-hair-details');
        }
        break;

      case 'skin-hair-details':
        const docStep = happyPath['doctor-selection'];
        addAssistantMessage(docStep.aiMessage, 'carousel', { carouselType: 'doctors' });
        // After showing doctors, we also show slots as part of the flow
        setTimeout(() => {
          addAssistantMessage(["You can pick a specialty or see some of our top doctors above."], 'slots');
        }, 1000);
        setStep('doctor-selection');
        break;

      case 'doctor-selection':
        const slotStep = happyPath['slot-selection'];
        addAssistantMessage(slotStep.aiMessage, 'details');
        setStep('slot-selection');
        break;

      case 'slot-selection':
        const detailsStep = happyPath['details-form'];
        addAssistantMessage(detailsStep.aiMessage, 'whatsapp');
        setStep('details-form');
        break;

      case 'details-form':
        const waStep = happyPath['whatsapp-continuation'];
        addAssistantMessage(waStep.aiMessage, 'confirmation');
        setStep('whatsapp-continuation');
        break;
      
      case 'whatsapp-continuation':
        const finalStep = happyPath['confirmation'];
        addAssistantMessage(finalStep.aiMessage);
        setStep('confirmation');
        break;

      default:
        console.log("No specific happy path advance for", currentStepId);
    }
  },

  selectDoctor: (doctor) => set({ selectedDoctor: doctor }),
  selectSlot: (slot) => set({ selectedSlot: slot }),
  submitDetails: (details) => set({ userDetails: details }),

  reset: () => set({
    currentStepId: 'landing',
    messages: [],
    composerValue: '',
    isFirstMessageSent: false,
    selectedDoctor: null,
    selectedSlot: null,
    userDetails: null
  }),
}));
