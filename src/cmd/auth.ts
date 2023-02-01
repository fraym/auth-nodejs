#! /usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { config } from "dotenv";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";

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

    // @todo: migrate scopes
    console.log(serverAddress, schema);
};

run();
