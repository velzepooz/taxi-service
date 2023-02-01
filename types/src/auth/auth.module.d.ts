import {Database} from "metasql";
import { Config } from '../config';

export type Deps = {
  queryBuilder: Database;
  config: Config;
}