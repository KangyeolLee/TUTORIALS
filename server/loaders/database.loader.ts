import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import connectionOptions from '../ormconfig';

class MySQLDB {
  private options: ConnectionOptions;

  constructor() {
    this.options = connectionOptions;
  }

  connect(): Promise<Connection> {
    return createConnection(this.options);
  }
}

export default new MySQLDB();
