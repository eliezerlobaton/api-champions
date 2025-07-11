import * as ClubRepository from "../repositories/clubs-repository";
import * as HttpResponse from "../utils/http-helpers";

export const getClubService = async () => {
  const data = await ClubRepository.findAllClubs();
  let response = null;

  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }

  return response;
};
