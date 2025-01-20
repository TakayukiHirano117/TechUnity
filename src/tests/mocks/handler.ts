// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

const recruits = [
  {
    id: "1",
    title: "React Developer",
    content: "React Developer wanted",
    description: "React Developer wanted",
    created_at: "2022-01-01T00:00:00.000Z",
    updated_at: "2022-01-01T00:00:00.000Z",
    creatorId: "1",
    is_published: true,
  },
];

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:3000/api/recruits", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(recruits, { status: 200 });
  }),
];
