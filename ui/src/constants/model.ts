// Provider definitions
export const PROVIDERS = {
  OPENAI: "openai",
  GROQ: "groq",
} as const;

export type Provider = (typeof PROVIDERS)[keyof typeof PROVIDERS];

export const PROVIDER_DISPLAY_NAMES: Record<Provider, string> = {
  [PROVIDERS.OPENAI]: "OpenAI",
  [PROVIDERS.GROQ]: "Groq",
};

export const DEFAULT_PROVIDER: Provider = PROVIDERS.OPENAI;

// OpenAI models
export const OPENAI_MODELS = {
  GPT_5: "gpt-5",
  GPT_4O: "gpt-4o",
  GPT_4_1: "gpt-4.1",
  AUTO: "auto",
} as const;

export const GROQ_MODELS = {
  GPT_OSS_120B: "openai/gpt-oss-120b",
} as const;

// Combined models (for backward compatibility)
export const CHAT_MODELS = {
  ...OPENAI_MODELS,
  ...GROQ_MODELS,
} as const;

export type ChatModel = (typeof CHAT_MODELS)[keyof typeof CHAT_MODELS];

// Model display names
export const OPENAI_MODEL_DISPLAY_NAMES: Record<
  keyof typeof OPENAI_MODELS,
  string
> = {
  GPT_5: "GPT-5",
  GPT_4O: "GPT-4o",
  GPT_4_1: "GPT-4.1",
  AUTO: "Auto",
};

export const GROQ_MODEL_DISPLAY_NAMES: Record<
  keyof typeof GROQ_MODELS,
  string
> = {
  GPT_OSS_120B: "GPT OSS 120B",
};

export const CHAT_MODEL_DISPLAY_NAMES: Record<ChatModel, string> = {
  ...Object.fromEntries(
    Object.entries(OPENAI_MODELS).map(([key, value]) => [
      value,
      OPENAI_MODEL_DISPLAY_NAMES[key as keyof typeof OPENAI_MODELS],
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(GROQ_MODELS).map(([key, value]) => [
      value,
      GROQ_MODEL_DISPLAY_NAMES[key as keyof typeof GROQ_MODELS],
    ]),
  ),
} as Record<ChatModel, string>;

export const DEFAULT_MODEL: ChatModel = OPENAI_MODELS.AUTO;

// Helper functions to get models by provider
export const getModelsByProvider = (provider: Provider): ChatModel[] => {
  switch (provider) {
    case PROVIDERS.OPENAI:
      return Object.values(OPENAI_MODELS);
    case PROVIDERS.GROQ:
      return Object.values(GROQ_MODELS);
    default:
      return Object.values(OPENAI_MODELS);
  }
};

export const getDefaultModelForProvider = (provider: Provider): ChatModel => {
  switch (provider) {
    case PROVIDERS.OPENAI:
      return OPENAI_MODELS.AUTO;
    case PROVIDERS.GROQ:
      return GROQ_MODELS.GPT_OSS_120B;
    default:
      return OPENAI_MODELS.AUTO;
  }
};

export const CHAT_MODE = {
  AGENT: "agent",
  CHAT: "chat",
} as const;

export type ChatMode = (typeof CHAT_MODE)[keyof typeof CHAT_MODE];

export const DEFAULT_MODE: ChatMode = CHAT_MODE.AGENT;
