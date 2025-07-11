import type { Request, Response } from "express";
import * as PlayerService from "../services/players-service";
import type { StatisticsModel } from "../models/statistics-model";

// busca os jogadores
export const getPlayer = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const httpResponse = await PlayerService.getPlayerService();
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

// busca os jogadores por ID
export const getPlayerByID = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return void res.status(400).json({ error: "ID inválido" });
  }

  const httpResponse = await PlayerService.getPlayerByIdService(parseInt(id));
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

// cria um novo jogador
export const postPlayer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bodyValue = req.body;
  const httpResponse = await PlayerService.createPlayerService(bodyValue);

  if (httpResponse) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  }
};

// exclui um jogador específico
export const deletePlayer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
    return void res.status(400).json({ error: "ID inválido" });
  }

  const httpResponse = await PlayerService.deletePlayerService(parseInt(id));
  res.status(httpResponse.statusCode).json(httpResponse.body);
};

// atualiza as informações de um jogador
export const updatePlayer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const bodyValue: StatisticsModel = req.body;

  if (!id || isNaN(parseInt(id))) {
    return void res.status(400).json({ error: "ID inválido" });
  }

  const httpResponse = await PlayerService.updatePlayerService(
    parseInt(id),
    bodyValue,
  );
  res.status(httpResponse.statusCode).json(httpResponse.body);
};
