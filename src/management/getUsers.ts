import { ServiceClient } from "@fraym/proto/freym/auth/management";

export interface User {
    id: string;
    login: string;
    email: string;
    displayName: string;
    assignedRoleIds: string[];
    active: boolean;
    failedAttempts: number;
    lastAttempt: number;
    blockedUntil: number;
}

export const getAllUsers = async (
    tenantId: string,
    serviceClient: ServiceClient
): Promise<User[]> => {
    return new Promise<User[]>((resolve, reject) => {
        serviceClient.getUsers(
            {
                tenantId,
            },
            (error, response) => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve(response.users);
            }
        );
    });
};
