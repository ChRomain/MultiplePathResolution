const { exec } = require('child_process');
const { GraphQLClient } = require('graphql-request');


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJsaW5rZWRMaXN0QGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1NDE3NTU1MTQsImV4cCI6MTU0MjM2MDMxNH0.G_2-faPKQ1Ax9fG2SH42CcdLLju86xABrPEwhOM6tms"


const client = new GraphQLClient('http://localhost:4466/multiplPathRes/dev', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})


var isDebugMode = false;

console.debug = function (args) {
  if (isDebugMode) {
    console.log(args);
  }
}

async function createGroup() {
  return await client.request(`mutation {
    createGroup (
      data: {
        name: "nameGroup"
        car: {
          create: {
            name: "nameCar"
          }
        }
        truck: {
          create: {
            name: "nameTruck"
          }
        }
      }) 
    {
      id
      car {
        id
      }
      truck {
        id
      }
    }
  }`);
}

async function createCharacteristic(carId, truckId) {
  return await client.request(`mutation {
    createCharacteristic (
      data: {
        name: "nameCharact"
          datas: {
          create: {
            carValue: {connect: {id: "${carId}"}}
            truckValue: {connect: {id: "${truckId}"}}
          }
        }
      })
    {
      id
    }
  }`);
}

async function queryOK(groupId) {
  return await client.request(`{
    OK: group (where: {id:"${groupId}"}) {
      id
      car {
        referencedByCharacteristicDatas {
          parentCharacteristic {
            id
            name
          }
        }
      }
      truck {    
          referencedByCharacteristicDatas {
          parentCharacteristic {
              id
              name
          }
          }
      }
    }
  }`);
}

async function queryKO(groupId) {
  return await client.request(`{
    KO: group (where: {id:"${groupId}"}) {
      id
      car {
        referencedByCharacteristicDatas {
          parentCharacteristic {
            id
            
          }
        }
      }
      truck {    
          referencedByCharacteristicDatas {
          parentCharacteristic {
              id
              name
          }
          }
      }
    }
  }`);
}

async function main() {

  const group = await createGroup();
  const groupId = group.createGroup.id;
  const carId = group.createGroup.car.id;
  const truckId = group.createGroup.truck.id;

  const characteristic = await createCharacteristic(carId, truckId);
  const characteristicId = characteristic.createCharacteristic.id;

  await queryOK(groupId);
  await queryKO(groupId);
}

main();
