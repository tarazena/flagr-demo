import dotenv from "dotenv"
import { FlagrEvaluateRequest, FlagrEvaluateResponse, FlagrFlag } from "./interfaces";



const env = dotenv.config();

const FLAGR_API_URL = env.parsed?.FLAGR_API_URL || "http://flagr:18000/api/v1";


export async function evaluateFeature(body: FlagrEvaluateRequest): Promise<FlagrEvaluateResponse> {
  const evalResult = await fetch(`${FLAGR_API_URL}/evaluation`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const result = await evalResult.json();
  return result;
}


export async function evaluateFlag(id: number): Promise<FlagrFlag> {
  const evalResult = await fetch(`${FLAGR_API_URL}/flags/${id}`);

  const result = await evalResult.json();
  return result;
}