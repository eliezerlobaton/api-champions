import type PlayerModel from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";
import * as PlayerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helpers";

// função responsável por retornar todos os jogadores
export const getPlayerService = async () => {
  // chama o repo
  const data = await PlayerRepository.findAllPlayers();
  let response = null;

  // verificação de dados
  if (data) {
    response = await HttpResponse.ok(data);
  } else {
    response = await HttpResponse.noContent();
  }
  return response;
};

export const getPlayerByIdService = async (id: number) => {
  const data = await PlayerRepository.findPlayersById(id);
  let response = null;

  if (data) {
    response = HttpResponse.ok(data);
  } else {
    response = HttpResponse.noContent();
  }

  return response;
};

export const createPlayerService = async (player: PlayerModel) => {
  let response = null;

  if (Object.keys(player).length !== 0) {
    await PlayerRepository.insertPlayer(player);
    response = HttpResponse.created();
  } else {
    response = HttpResponse.badRequest();
  }

  return response;
};

export const deletePlayerService = async (id: number) => {
  let response = null;
  const isDeleted = await PlayerRepository.deleteOnePlayerById(id);

  if (isDeleted) {
    response = HttpResponse.ok({ message: "deleted" });
  } else {
    response = HttpResponse.badRequest();
  }
  return response;
};

export const updatePlayerService = async (
  id: number,
  statistics: StatisticsModel,
) => {
  const data = await PlayerRepository.findAndModifyPlayer(id, statistics);
  let response = null;

  if (Object.keys(data).length === 0) {
    response = await HttpResponse.badRequest();
  } else {
    response = HttpResponse.ok(data);
  }
  return response;
};
