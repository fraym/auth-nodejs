import { ServiceClient } from "@fraym/proto/freym/auth/management";

export interface CreateUserResponse {
    id: string;
    setInitialPasswordToken: string;
}

export const createNewUser = async (
    tenantId: string,
    login: string,
    email: string,
    displayName: string,
    password: string,
    assignedRoleIds: string[],
    active: boolean,
    blockedUntil: Date,
    serviceClient: ServiceClient
): Promise<CreateUserResponse> => {
    return new Promise<CreateUserResponse>((resolve, reject) => {
        serviceClient.createUser(
            {
                tenantId,
                login,
                email,
                displayName,
                password,
                active,
                assignedRoleIds,
                blockedUntil: blockedUntil.getTime().toString(),
            },
            (error, response) => {
                if (error) {
                    reject(error.message);
                    return;
                }

                resolve({
                    id: response.id,
                    setInitialPasswordToken: response.setInitialPasswordToken,
                });
            }
        );
    });
};
