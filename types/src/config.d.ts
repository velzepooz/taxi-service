export type Config = {
  server: {
    host: string;
    port: number;
  };
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    logger: {
      db: Function;
      debug: Function;
    }
  };
};