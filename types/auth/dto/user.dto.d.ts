export namespace userDto {
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
        namespace firstName {
            const type_4: string;
            export { type_4 as type };
        }
        namespace lastName {
            const type_5: string;
            export { type_5 as type };
        }
        namespace email {
            const type_6: string;
            export { type_6 as type };
            const format_2: string;
            export { format_2 as format };
        }
        namespace phone {
            const type_7: string;
            export { type_7 as type };
            export const minLength: number;
            export const maxLength: number;
        }
        namespace password {
            const type_8: string;
            export { type_8 as type };
            const minLength_1: number;
            export { minLength_1 as minLength };
            const maxLength_1: number;
            export { maxLength_1 as maxLength };
        }
        namespace dateOfBirth {
            const type_9: string;
            export { type_9 as type };
            const format_3: string;
            export { format_3 as format };
        }
        namespace refreshToken {
            const type_10: string;
            export { type_10 as type };
        }
    }
}
export type UserDto = {
    id: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    dateOfBirth: Date;
    refreshToken?: string | null | undefined;
};
