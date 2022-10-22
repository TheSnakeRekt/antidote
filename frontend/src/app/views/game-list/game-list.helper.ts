import { Card } from "src/models/card";

export function mapGames(gameResponse: any): Card[]{
  return gameResponse.results.map((game: any) => {
    return {
      gameName:game.name,
      img:game.background_image,
      releaseDate: game.released
    }
  });
}
