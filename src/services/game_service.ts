//Define Functions that perform CRUD operations on users

import { CommonService } from '../services'
export class GameService extends CommonService {
  expReq?: any

  expRes?: any

  constructor(_user: any) {
    super(_user)
  }

  public async getAllGames(): Promise<any> {
    return await this.getRows('select id, name from games', [])
  }
}

export default GameService
