# vNext

# v0.7.1

-   (bug) Fix api

# v0.7.0

-   (bc) Use new protobuf lib

# v0.6.1

-   (improvement) Add clockTolerance of 5 seconds when verifying a jwt

# v0.6.0

-   (bc) Remove scopes http api
-   (bc) Remove migration command

# v0.5.3

-   (bug) Add missing data to `getTokenData`

# v0.5.2

-   (bug) Add missing tenantId to `getTokenData`

# v0.5.1

-   (bug) Fix user id extraction

# v0.5.0

-   (bc) Remove token util from index export
-   (bc) Use http migration api

# v0.4.0

-   (feature) Add `generateJwt` function
-   (feature) Add `addDataToJwt` function
-   (feature) Add `getTokenData` function

# v0.3.1

-   (bug) Use latest version of @grpc/grpc-js

# v0.3.0

-   (bc) Make role id optional in `upsertRole`
-   (feature) Return id of upserted role

# v0.2.1

-   (bug) Remove debug code

# v0.2.0

-   (feature) User management API

# v0.1.0

-   (feature) Add `auth` cli command
-   (feature) Roles and scopes management API
