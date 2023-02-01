import { ManagementServiceClient } from "@fraym/auth-proto";
import { credentials } from "@grpc/grpc-js";
import { ClientConfig, useConfigDefaults } from "../config/config";
import { createNewScope } from "./createScope";
import { deleteExistingRole } from "./deleteRole";
import { deleteExistingScope } from "./deleteScope";
import { getAllRoles, Role } from "./getRoles";
import { getAllScopes } from "./getScopes";
import { createOrUpdateRole, UpsertRoleScope } from "./upsertRole";

export interface ManagementClient {
    createScope: (name: string, clientId?: string) => Promise<void>;
    deleteScope: (name: string, clientId?: string) => Promise<void>;
    getScopes: (clientId?: string) => Promise<string[]>;
    upsertRole: (tenantId: string, id: string, allowedScopes: UpsertRoleScope[]) => Promise<void>;
    deleteRole: (tenantId: string, id: string) => Promise<void>;
    getRoles: (tenantId: string) => Promise<Role[]>;
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

    const createScope = async (name: string, clientId: string = "") => {
        await createNewScope(name, clientId, serviceClient);
    };

    const deleteScope = async (name: string, clientId: string = "") => {
        await deleteExistingScope(name, clientId, serviceClient);
    };

    const getScopes = async (clientId: string = "") => {
        return await getAllScopes(clientId, serviceClient);
    };

    const upsertRole = async (tenantId: string, id: string, allowedScopes: UpsertRoleScope[]) => {
        return await createOrUpdateRole(tenantId, id, allowedScopes, serviceClient);
    };

    const deleteRole = async (tenantId: string, id: string) => {
        return await deleteExistingRole(tenantId, id, serviceClient);
    };

    const getRoles = async (tenantId: string) => {
        return await getAllRoles(tenantId, serviceClient);
    };

    const close = async () => {
        serviceClient.close();
    };

    return {
        createScope,
        deleteScope,
        getScopes,
        upsertRole,
        deleteRole,
        getRoles,
        close,
    };
};
