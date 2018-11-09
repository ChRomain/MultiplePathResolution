## multiple Path Resol

*(prisma 15.3 and test with prisma 20.1)*

Received an error when try to query parents data for two types but with one missing in the first type.

Error message received from query: "Whoops. Looks like an internal server error. Search your server logs for request ID: local:api:{ID}"

**Repoducibility/Probability :**
  always fail

## To reproduce:
**Clone the repository:**
1. git clone https://github.com/ChRomain/MultiplePathResolution.git
2. cd multiplePathResol/
3. npm install

**Start the server**
npm-run prisma deploy

**get prisma token and copy in the index.js**
npm-run prisma token

**run test**
node index.js

**result of test**

**Test1**
1. Create 1 group with a car and a truck.
2. Create 1 characteristic with the previous car and previous truck.
3. Query the previous group and get the same parents data for the car and truck.
**OK**

**Test2**
1. Create 1 group with a car and a truck.
2. Create 1 characteristic with the previous car and previous truck.
3. Query the previous group and get different parents data for the car and truck.
**KO**
Observe trace  received from Query :
  "errors": [
    {
      "message": "Whoops. Looks like an internal server error. Search your server logs for request ID: local:api:cjoa36t7ia8zr0986iat0x0vx",
      "path": [
        "KO",
        "truck",
        "referencedByCharacteristicDatas",
        0,
        "parentCharacteristic",
        "name"
      ],