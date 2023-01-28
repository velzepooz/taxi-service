export function initAuthModule({ queryBuilder, config }: Deps): Module;
export type Database = import('metasql').Database;
export type Module = import('../app.module').AppModule;
export type Config = import('../config').Config;
export type Deps = {
    queryBuilder: Database;
    config: Config;
};
