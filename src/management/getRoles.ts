import { ServiceClient } from "@fraym/proto/freym/auth/management";

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
    serviceClient: ServiceClient
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
