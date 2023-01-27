export namespace driverDto {
    const type: string;
    namespace properties {
        namespace id {
            const type_1: string;
            export { type_1 as type };
        }
        namespace createdAt {
            const type_2: string;
            export { type_2 as type };
            export const format: string;
        }
        namespace updatedAt {
            const type_3: string;
            export { type_3 as type };
            const format_1: string;
            export { format_1 as format };
        }
        namespace driverLicenceId {
            const type_4: string;
            export { type_4 as type };
            export const pattern: string;
        }
        namespace userId {
            const type_5: string;
            export { type_5 as type };
        }
    }
}
export type DriverDto = {
    id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    driverLicenceId: string;
    userId: number;
};
