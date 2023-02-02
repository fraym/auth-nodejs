import { ManagementServiceClient } from "@fraym/auth-proto";

export const updateExistingUser = async (
    tenantId: string,
    id: string,
    login: string,
    email: string,
    displayName: string,
    password: string,
    assignedRoleIds: string[],
    active: boolean,
    blockedUntil: Date,
    serviceClient: ManagementServiceClient
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        serviceClient.updateUser(
            {
                tenantId,
                id,
                login,
                email,
                displayName,
                password,
                active,
                assignedRoleIds,
                blockedUntil: blockedUntil.getTime(),
            },
            error => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve();
            }
        );
    });
};
