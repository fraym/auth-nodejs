import { ManagementServiceClient } from "@fraym/auth-proto";
import { credentials } from "@grpc/grpc-js";
import { ClientConfig, useConfigDefaults } from "../config/config";

export interface ManagementClient {
    // @todo: add more functions
    close: () => Promise<void>;
}

export const newManagementClient = async (config?: ClientConfig): Promise<ManagementClient> => {
    config = useConfigDefaults(config);
    const serviceClient = new ManagementServiceClient(
        config.serverAddress,
        credentials.createInsecure(),
        {
            "grpc.keepalive_time_ms": config.keepaliveInterval,
            "grpc.keepalive_timeout_ms": config.keepaliveTimeout,
            "grpc.keepalive_permit_without_calls": 1,
        }
    );

    const close = async () => {
        serviceClient.close();
    };

    return {
        close,
    };
};
