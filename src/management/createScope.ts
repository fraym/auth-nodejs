import { ClientConfig } from "config/config";

export const createNewScope = async (
    name: string,
    clientId: string,
    config: ClientConfig
): Promise<void> => {
    await fetch(`${config.httpServerAddress}/management/scopes`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.httpApiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId,
            name,
        }),
    });
};
