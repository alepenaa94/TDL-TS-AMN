import { CommonService } from '../services'

export class GameService extends CommonService {
  public async getAllGames(): Promise<any> {
    return await this.getRows('SELECT id, name FROM games', [])
  }
}
