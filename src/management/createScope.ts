import { ManagementServiceClient } from "@fraym/auth-proto";

export const createNewScope = async (
    name: string,
    clientId: string,
    serviceClient: ManagementServiceClient
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        serviceClient.createScope(
            {
                name,
                clientId,
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
