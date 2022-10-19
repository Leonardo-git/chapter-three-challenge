import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder()
      .where("title ilike :param", { param :`%${param}%` })
      .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('SELECT count(id) as count FROM games');
    // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.users", "users", "games.id = :id", { id })
      .select([
        "users.id as id",
        "users.first_name as first_name",
        "users.last_name as last_name",
        "users.email as email",
        "users.created_at as created_at",
        "users.updated_at as updated_at"
      ])
      .getRawMany();
      // Complete usando query builder
  }
}
