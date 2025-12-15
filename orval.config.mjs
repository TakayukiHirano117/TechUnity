import { defineConfig } from "orval";

export default defineConfig({
  techunity: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      target: "./src/generated/api.ts",
      client: "react-query",
      mode: "tags",
      baseUrl: "/api",
      override: {
        query: {
          useQuery: true,
          useMutation: true,
          useSuspenseQuery: false,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
