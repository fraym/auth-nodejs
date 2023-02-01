import { ManagementServiceClient } from "@fraym/auth-proto";

export interface Role {
    id: string;
    allowedScopes: RoleScope[];
}

export interface RoleScope {
    clientId: string;
    scopeName: string;
}

export const getAllRoles = async (
    tenantId: string,
    serviceClient: ManagementServiceClient
): Promise<Role[]> => {
    return new Promise<Role[]>((resolve, reject) => {
        serviceClient.getRoles(
            {
                tenantId,
            },
            (error, response) => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve(response.roles);
            }
        );
    });
};
