import { ManagementServiceClient } from "@fraym/auth-proto";

export const getAllScopes = async (
    clientId: string,
    serviceClient: ManagementServiceClient
): Promise<string[]> => {
    return new Promise<string[]>((resolve, reject) => {
        serviceClient.getScopes(
            {
                clientId,
            },
            (error, response) => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve(response.scopes);
            }
        );
    });
};
