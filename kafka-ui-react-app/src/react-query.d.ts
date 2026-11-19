import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      onError?: (error: unknown) => void;
    };
  }
}
