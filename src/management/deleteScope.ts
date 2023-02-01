import { ManagementServiceClient } from "@fraym/auth-proto";

export const deleteExistingScope = async (
    name: string,
    clientId: string,
    serviceClient: ManagementServiceClient
): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        serviceClient.deleteScope(
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
