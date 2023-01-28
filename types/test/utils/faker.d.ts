export class Faker {
    _chance: any;
    email(): any;
    uid(): any;
    string(length?: number): any;
    firstName(): any;
    lastName(): any;
    mobilePhone(): any;
    appleId(): any;
    integer({ min, max }: {
        min?: number | undefined;
        max?: number | undefined;
    }): any;
    country(): any;
    state(): any;
    city(): any;
    hash(length?: number): any;
    password(length?: number): string;
    url(): any;
}
export const faker: Faker;
