declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MAP_TOKEN: string;
    }
  }
}

export {};
