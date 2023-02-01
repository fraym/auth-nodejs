# auth-nodejs

Client implementation in javascript for the [auth service](https://github.com/fraym/auth).

## Installation

```shell
npm i @fraym/auth
```

## GraphQL

You can access the graphQL api at `http://auth:3000/management/graphql`.
There is a sandbox available at `http://auth:3000/management/graphql/sandbox`.

You need to add the `Tenant-Id` header in order to use the graphQL Endpoint and the sandbox.

## CLI command

Use the `auth` cli command to automatically apply your permissions to the auth service.

You can specify the address (and port) of the auth service instance you use in the `AUTH_SERVER_ADDRESS` env variable (default: `127.0.0.1:9000`).

The needed schema for auth is a simple enum containing all your permissions. Example:

```graphql
enum Permission {
    USER_READ
    USER_WRITE
}
```

### Config

Use a `.env` file or env variables to configure cte clients and the command:

```env
AUTH_SERVER_ADDRESS=127.0.0.1:9000
```

## Usage

### Create the client

management client:

```typescript
const managementClient = await newManagementClient();
```

### Gracefully close the clients

You won't lose any data if you don't. Use it for your peace of mind.

```typescript
client.close();
```

## Development

You'll need the following apps for a smooth development experience:

-   minikube
-   lens
-   okteto
-   helm

### Running the dev environment

-   Start minikube if not already done:

```shell
minikube start
```

-   add mongodb and minio to your lokal kubernetes
    -   use Makefiles in `./.dev/*`
-   copy `.env.build` to `.env.build.local`
    -   add your personal access token (needs read access for private fraym org repositories)
-   deploy the app to your cluster

```
make init
```

-   start okteto

```
make dev
```

-   connect your IDE to that okteto instance
