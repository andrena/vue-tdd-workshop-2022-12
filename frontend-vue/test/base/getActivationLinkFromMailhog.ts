import { fetch } from "undici";
import { throwError } from "../../throwError";

export interface MailHogContent {
  Body: string;
}

export interface MailHogItem {
  Content: MailHogContent;
}

export interface MailHogResponse {
  items: MailHogItem[];
}

export async function getActivationLinkFromMailhog(
  to: string
): Promise<string> {
  const body = await getMessageBodyAsString(to);
  if (!body) {
    throw new Error("Could not get the activation link.");
  }
  return findLink(body);
}

async function getMessageBodyAsString(to: string) {
  const response = await getMailhogResponse(to);
  return response.items[0]?.Content.Body;
}

async function getMailhogResponse(to: string): Promise<MailHogResponse> {
  const url = new URL("http://localhost:8025/api/v2/search");
  url.searchParams.append("kind", "to");
  url.searchParams.append("query", to);
  const res = await fetch(url);
  return (await res.json()) as MailHogResponse;
}

function findLink(body: string): string {
  const [match] = body.match(/https?:\/\/\S+/) ?? [];
  return match ?? throwError(`Could not find link in ${JSON.stringify(body)}`);
}
