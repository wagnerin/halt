import { findRaceResultSession } from "../data";
import { mapRaceResultToDto } from "./result-session.mapper";
import type { ResultSessionDetailDto } from "./result-session.types";
import { parseResultSessionParams } from "./result-session.validation";

export async function getRaceResultSessionDetail(
  input: unknown
): Promise<ResultSessionDetailDto | null> {
  const params = parseResultSessionParams(input);
  if (!params) {
    return null;
  }

  const record = await findRaceResultSession(params.tournamentSlug, params.resultId);
  if (!record) {
    return null;
  }

  return mapRaceResultToDto(record);
}
