import { ServiceClient } from "@fraym/proto/freym/auth/management";

export const deleteExistingUser = async (
    tenantId: string,
    id: string,
    serviceClient: ServiceClient
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
