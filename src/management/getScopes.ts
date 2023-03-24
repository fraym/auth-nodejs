import { ClientConfig } from "config/config";

export const getAllScopes = async (clientId: string, config: ClientConfig): Promise<string[]> => {
    const response = await fetch(`${config.httpServerAddress}/management/scopes/list`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${config.httpApiToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId,
        }),
    });

    const data = await response.json();

    return data.scopes;
};
