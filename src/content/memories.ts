import { PersonalityDetail, TimelineAct, ClosingLetter } from '../types';
import { editorialPhotographs } from './photographs';

export const personalityProfile = {
  headline: "A WOMAN OF MANY BEAUTIFUL THINGS.",
  subtitle: "Module A: The Profile",
  readTime: "3 min read",
  body: [
    "To describe Tosin is to speak of equilibrium. In an era that often rewards frantic motion and performative spectacle, she represents the quiet magnetism of intentional living. She moves through life not with hurry, but with an unmistakable poise—a woman grounded in self-awareness and guided by profound empathy.",
    "Her character is formed from a harmony of contrasting gifts: an analytical, razor-sharp intellect coupled with an intuitive emotional depth; a taste for understated luxury that never sacrifices soulfulness; and a formidable inner resolve dressed in effortless warmth.",
    "Those who know her well will tell you about her listening. When Tosin engages in a conversation, distractions vanish. She listens with her whole being, processing not just what is said, but the delicate sentiments underneath. She is the friend who remembers the milestone nobody else marked, who sends the unprompted message on the difficult day, and whose discernment serves as a compass for those in her orbit.",
    "Over thirty-two years, she has authored her life with courage. She has pursued excellence without losing her gentleness, loved wholeheartedly without losing her boundaries, and evolved continuously while remaining fiercely faithful to her roots. She does not chase elegance; elegance simply follows wherever she steps.",
  ],
  definingQuote: {
    quote: "True beauty does not clamor for the spotlight; it commands the room through stillness, kindness, and unwavering self-possession.",
    attribution: "Issue 032 Editorial Board",
  },
};

export const littleThings: PersonalityDetail[] = [
  {
    id: "sunday",
    prompt: "Her Perfect Sunday",
    response: "Sun streaming through linen curtains, a freshly brewed roast, gentle jazz in the background, followed by an uninterrupted afternoon with a captivating novel and good food.",
    detailType: "Rituals",
  },
  {
    id: "saying",
    prompt: "Something She Always Says",
    response: "'Everything will align exactly as it should—take a breath, we've got this.'",
    detailType: "Mantras",
  },
  {
    id: "pastime",
    prompt: "Her Favourite Pastime",
    response: "Candid dinners that stretch four hours past closing, deep conversations with trusted friends, and planning unexpected travel itineraries.",
    detailType: "Passions",
  },
  {
    id: "laughter",
    prompt: "Something That Makes Her Laugh",
    response: "Unscripted inside jokes, dry British humour, and re-enacting chaotic everyday moments with her sisters.",
    detailType: "Humour",
  },
  {
    id: "habit",
    prompt: "Her Signature Habit",
    response: "Adjusting her rings while in deep thought, and sending perfectly curated voice notes when words in text just won't suffice.",
    detailType: "Quirks",
  },
  {
    id: "admiration",
    prompt: "Something People Admire About Her",
    response: "Her unshakable emotional maturity under pressure. When the unexpected occurs, she is always the steady hand at the wheel.",
    detailType: "Virtues",
  },
  {
    id: "place",
    prompt: "A Place She Loves",
    response: "Quiet coastal escapes where the sea breeze clears the mind, paired with stylish, sun-drenched European cafes.",
    detailType: "Sanctuaries",
  },
  {
    id: "passion",
    prompt: "Something She Is Passionate About",
    response: "Mentoring young women, curating thoughtful spaces, fine art, and championing every venture her friends embark upon.",
    detailType: "Drives",
  },
];

export const timelineActs: TimelineAct[] = [
  {
    act: "ACT I",
    title: "THE BEGINNING",
    era: "Formative Foundations",
    description: "Childhood photographs, early family memories, and the spark of curiosity that seeded an extraordinary journey.",
    photos: editorialPhotographs.filter(p => ["photo-13", "photo-14", "photo-15"].includes(p.id)),
  },
  {
    act: "ACT II",
    title: "FINDING HER WAY",
    era: "The Youthful Bloom",
    description: "Teenage years, classroom dreams, enduring friendships, and the first taste of independence.",
    photos: editorialPhotographs.filter(p => ["photo-17", "photo-18", "photo-19", "photo-20"].includes(p.id)),
  },
  {
    act: "ACT III",
    title: "BECOMING",
    era: "The Decisive Twenties",
    description: "Her twenties: adventures across cities, career strides, quiet triumphs, and the deliberate shaping of her character.",
    photos: editorialPhotographs.filter(p => ["photo-21", "photo-22", "photo-24", "photo-25", "photo-26"].includes(p.id)),
  },
  {
    act: "ACT IV",
    title: "HERE SHE IS",
    era: "Thirty-Two & Radiating",
    description: "A celebration of the woman she has become at 32: fulfilled, centered, profoundly loved, and ready for all that awaits.",
    photos: editorialPhotographs.filter(p => ["photo-04", "photo-06", "photo-09", "photo-12"].includes(p.id)),
  },
];

export const memoryCollections = [
  {
    id: "unposed",
    name: "The Unposed Moments",
    caption: "Candid laughter, unscripted glances, and life in its truest authenticity.",
    photos: editorialPhotographs.filter(p => ["photo-02", "photo-10", "photo-16", "photo-27", "photo-29", "photo-30"].includes(p.id)),
  },
  {
    id: "adventures",
    name: "The Adventures",
    caption: "Wanderlust, scenic road trips, golden hours, and spontaneous horizons.",
    photos: editorialPhotographs.filter(p => ["photo-03", "photo-05", "photo-19", "photo-26"].includes(p.id)),
  },
  {
    id: "people",
    name: "The People",
    caption: "The anchors, the sisters, the family, and the friendships that hold her tight.",
    photos: editorialPhotographs.filter(p => ["photo-08", "photo-17", "photo-18", "photo-20"].includes(p.id)),
  },
  {
    id: "celebrations",
    name: "The Celebrations",
    caption: "Toasts, milestones, elegant gatherings, and reasons to dance until midnight.",
    photos: editorialPhotographs.filter(p => ["photo-23", "photo-24", "photo-31", "photo-32", "photo-33"].includes(p.id)),
  },
];

export const closingLetterContent: ClosingLetter = {
  title: "AND THE STORY CONTINUES.",
  headline: "AN EPILOGUE FOR CHAPTER 32",
  statement: "THE BEST IS YET TO COME.",
  subStatement: "HAPPY 32ND BIRTHDAY, TOSIN. WITH ALL OUR LOVE.",
  closingPhotograph: "/images/epilogue-master.jpg",
  body: [
    "As you reach the end of this private edition, look back for just a moment over these pages. Every portrait, every letter, every memory recorded here is evidence of something undeniable: you are deeply, unconditionally loved.",
    "You have spent thirty-two years giving so much of your spirit to everyone lucky enough to be near you. You have been our safe shelter, our favorite companion, our confidante, and our inspiration.",
    "Today, the spotlight is entirely yours. We hope you feel the fullness of our gratitude for your life. As you step into your thirty-second year, may your path be paved with peace, profound joy, exhilarating new triumphs, and love that never grows cold.",
    "Thank you for being yourself. Happy 32nd Birthday, Tosin.",
  ],
  signature: "CURATED WITH LOVE, FROM YOUR ENTIRE CIRCLE.",
};

