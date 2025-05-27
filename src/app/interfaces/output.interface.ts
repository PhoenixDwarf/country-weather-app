export interface OutputEvent {
  languageFrequency?: LanguageFrequency;
}

export interface LanguageFrequency {
  [key: string]: number;
}
