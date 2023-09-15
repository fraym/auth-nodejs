import { ServiceClient } from "@fraym/proto/freym/auth/management";

export const deleteExistingRole = async (
    tenantId: string,
    id: string,
    serviceClient: ServiceClient
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        serviceClient.deleteRole(
            {
                tenantId,
                id,
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
