import { ManagementServiceClient } from "@fraym/auth-proto";

export const deleteExistingUser = async (
    tenantId: string,
    id: string,
    serviceClient: ManagementServiceClient
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        serviceClient.deleteUser(
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