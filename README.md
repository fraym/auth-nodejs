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

### Config

Use a `.env` file or env variables to configure cte clients and the command:

```env
AUTH_SERVER_ADDRESS=127.0.0.1:9000
```

## JWT functions

### Create a new JWT for usage with fraym

```typescript
const jwt = await generateJwt(appSecret, tenantId, scopes, data, expirationTime);
```

Parameters:

-   `appSecret`: the secret used to sign the jwt
-   `tenantId`: the id of the tenant to use
-   `scopes`: (optional) list of scopes available in this token
-   `data`: (optional) data added to the `data` field of the token
-   `expirationTime`: (optional) string is resolved to a time span and added to the current timestamp to calculate the expiration time

### Add data to an existing JWT

Note: this will validate the existing token first.

```typescript
const jwt = await addDataToJwt(appSecret, token, data);
```

Parameters:

-   `appSecret`: the secret used to sign the jwt
-   `token`: the existing jwt
-   `data`: (optional) data added to the `data` field of the token, existing fields in the data object will be overwritten

### Validate the token and get associated data

Get scopes:

```typescript
const { scopes, userId, exp } = await getTokenData(appSecret, token, requireUserId);
```

Parameters:

-   `appSecret`: the secret used to sign the jwt
-   `token`: the existing jwt
-   `requireUserId`: (optional, default: `true`) If set to true the function will throw an error if it cannot determine the id of the user that owns the jwt

## Client Usage

### Create the client

```typescript
const managementClient = await newManagementClient();
```

## Get all roles

```typescript
const roles = await managementClient.getRoles("TENANT_ID");
```

## Upsert a role

You can create roles without providing a role-id. The id of the new role will be returned:

```typescript
const roleId = await managementClient.upsertRole("TENANT_ID", [
    {
        scopeName: "PERMISSION_NAME",
        // optional: clientId: If none is given the default client will be used
    },
]);
```

You can also upsert a role by providing the role-id:

```typescript
const roleId = await managementClient.upsertRole(
    "TENANT_ID",
    [
        {
            scopeName: "PERMISSION_NAME",
            // optional: clientId: If none is given the default client will be used
        },
    ],
    "ROLE_ID"
);
```

## Delete a role

```typescript
await managementClient.deleteRole("TENANT_ID", "ROLE_ID");
```

## Create a user

When creating a user and not providing a `password`, the create function will return a `setInitialPasswordToken`. This string can be used to authorize the initial password change of a user. Use it within the graphql api to change the passwort of a user.

Required parameters:

```typescript
const { id, setInitialPasswordToken } = await managementClient.createUser("TENANT_ID", "E-MAIL", [
    "ROLE_ID",
]);
```

With all optional parameters:

```typescript
const isActive = true;
const blockedUntil = new Date();
const {id, setInitialPasswordToken} = await managementClient.createUser("TENANT_ID", "E-MAIL", ["ROLE_ID"]. "LOGIN_NAME", "DISPLAY_NAME", "PASSWORD", isActive, blockedUntil);
```

`LOGIN_NAME`: A name used for login instead of the email address.
`DISPLAY_NAME`: A name to display in the applications.
`PASSWORD`: Set the initial password of the user or leave empty if you want the user to set it.
`isActive`: Activate or deactivate a user.
`blockedUntil`: Block a user until a specific date.

## Update a user

When updating a user and not providing a `password`, the password will stay the same. Otherwise it will be changed to the given password.

Required parameters:

```typescript
await managementClient.updateUser("TENANT_ID", "USER_ID", "E-MAIL", ["ROLE_ID"]);
```

With all optional parameters:

```typescript
const isActive = true;
const blockedUntil = new Date();
await managementClient.createUser("TENANT_ID", "USER_ID", "E-MAIL", ["ROLE_ID"]. "LOGIN_NAME", "DISPLAY_NAME", "PASSWORD", isActive, blockedUntil);
```

`LOGIN_NAME`: A name used for login instead of the email address.
`DISPLAY_NAME`: A name to display in the applications.
`PASSWORD`: Use this to reset the password of a user.
`isActive`: Activate or deactivate a user.
`blockedUntil`: Block a user until a specific date.

## Delete a user

```typescript
await managementClient.deleteUser("TENANT_ID", "USER_ID");
```

## Get all users

```typescript
const users = await managementClient.getUsers("TENANT_ID");
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
