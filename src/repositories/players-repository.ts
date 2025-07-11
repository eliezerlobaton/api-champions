import fs from "fs/promises";
import type PlayerModel from "../models/player-model";
import type { StatisticsModel } from "../models/statistics-model";

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  const data = await fs.readFile("./src/data/players.json", "utf-8");
  const players = JSON.parse(data);
  return players;
};

export const findPlayersById = async (
  id: number,
): Promise<PlayerModel | undefined> => {
  const players = await findAllPlayers();
  return players.find((player) => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
  const players = await findAllPlayers();
  players.push(player);
  await fs.writeFile(
    "./src/data/players.json",
    JSON.stringify(players, null, 2),
  );
};

export const deleteOnePlayerById = async (id: number) => {
  let players = await findAllPlayers();
  const index = players.findIndex((p) => p.id === id);

  if (index !== -1) {
    players.splice(index, 1);
    await fs.writeFile(
      "./src/data/players.json",
      JSON.stringify(players, null, 2),
    );
    return true;
  }

  return false;
};

export const findAndModifyPlayer = async (
  id: number,
  statistics: StatisticsModel,
): Promise<PlayerModel> => {
  let players = await findAllPlayers();
  const index = players.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Player with ID ${id} not found`);
  }

  const player = players[index] as PlayerModel;

  player.statistics = statistics;

  await fs.writeFile(
    "./src/data/players.json",
    JSON.stringify(players, null, 2),
  );

  return player;
};
