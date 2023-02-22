export function createDriver(deps: Deps, payload: any): void;
export function initDriverService(deps: Deps): {
    /** @type {CreateDriver} */
    createDriver: CreateDriver;
};
export type Deps = object;
export type CreateDriver = () => any;
export type DriverService = {
    createDriver: CreateDriver;
};
