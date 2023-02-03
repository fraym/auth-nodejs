#! /usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { config } from "dotenv";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLEnumType, GraphQLSchema } from "graphql";
import { newManagementClient } from "../management/client";

const run = async () => {
    config();

    const argv = await yargs(hideBin(process.argv))
        .config({
            schemaGlob: "./src/**/*.graphql",
            serverAddress: "127.0.0.1:9000",
        })
        .pkgConf("auth").argv;

    let schemaGlob: string = argv.schemaGlob as string;
    let serverAddress: string = argv.serverAddress as string;

    if (process.env.AUTH_SCHEMA_GLOB) {
        schemaGlob = process.env.AUTH_SCHEMA_GLOB;
    }

    if (process.env.AUTH_SERVER_ADDRESS) {
        serverAddress = process.env.AUTH_SERVER_ADDRESS;
    }

    const schema = await loadSchema(`${schemaGlob}`, {
        loaders: [new GraphQLFileLoader()],
    });

    const permissions = getSchemaPermissions(schema);

    await migratePermissions(permissions, serverAddress);
};

const getSchemaPermissions = (schema: GraphQLSchema): string[] => {
    const permissions: string[] = [];

    schema.toConfig().types.forEach(t => {
        if (!(t instanceof GraphQLEnumType)) {
            return;
        }

        const name = t.toString();

        if (name !== "Permission") {
            return;
        }

        t.astNode?.values?.forEach(value => {
            permissions.push(value.name.value);
        });
    });

    return permissions;
};

const migratePermissions = async (permissions: string[], serverAddress: string) => {
    const managementClient = await newManagementClient({ serverAddress });
    const existingPermissions = (await managementClient.getScopes()).filter(
        permission => !permission.startsWith("FRAYM_")
    );

    console.log("existingPermissions", existingPermissions);

    const permissionsToCreate = permissions.filter(
        permission => !existingPermissions.includes(permission)
    );
    const permissionsToDelete = existingPermissions.filter(
        permission => !permissions.includes(permission)
    );

    if (permissionsToCreate.length > 0) {
        console.log(
            `Creating ${permissionsToCreate.length} permissions: ${permissionsToCreate}...`
        );
        for (let i = 0; i < permissionsToCreate.length; i++) {
            await managementClient.createScope(permissionsToCreate[i]);
        }
        console.log(`Created ${permissionsToCreate.length} permissions`);
    }

    if (permissionsToDelete.length > 0) {
        console.log(
            `Removing ${permissionsToDelete.length} permissions: ${permissionsToDelete}...`
        );
        for (let i = 0; i < permissionsToDelete.length; i++) {
            await managementClient.deleteScope(permissionsToDelete[i]);
        }
        console.log(`Removed ${permissionsToDelete.length} permissions`);
    }
};

run();
