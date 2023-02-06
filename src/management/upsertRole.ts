import { ManagementServiceClient } from "@fraym/auth-proto";

export interface UpsertRoleScope {
    scopeName: string;
    clientId?: string;
}

export const createOrUpdateRole = async (
    tenantId: string,
    id: string,
    allowedScopes: UpsertRoleScope[],
    serviceClient: ManagementServiceClient
): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        serviceClient.upsertRole(
            {
                tenantId,
                id,
                allowedScopes: allowedScopes.map(scope => {
                    return {
                        scopeName: scope.scopeName,
                        clientId: scope.clientId ?? "",
                    };
                }),
            },
            (error, response) => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve(response.id);
            }
        );
    });
};
