import { mapRaceResultToDto, parseResultSessionParams, type ResultSessionDetailDto } from "../api";
import { findRaceResultSession } from "../data";

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
