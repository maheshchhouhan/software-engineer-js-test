import { URI } from "../config/constants";

export const fetchQuery = async (query) => {
  return await fetch(URI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  });
};
