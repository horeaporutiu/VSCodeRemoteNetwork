'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {

  //update ledger with a greeting 
  async instantiate(ctx) {
    let greeting = { text: 'Instantiate was called!' };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
  }

  async init(ctx) {
    let greeting = { text: 'Instantiate was called!' };
    await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
  }

  //add a member along with their email, name, address, and number
  async addMember(ctx, email, name, address, phoneNumber) {
    let member = {
      name: name,
      address: address,
      number: phoneNumber,
      email: email
    };
    await ctx.stub.putState(email, Buffer.from(JSON.stringify(member)));
    return JSON.stringify(member);
  }

  // look up data by key
  async query(ctx, key) {
    console.info('querying for key: ' + key  );
    let returnAsBytes = await ctx.stub.getState(key);
    let result = JSON.parse(returnAsBytes);
    return JSON.stringify(result);
  }

}

module.exports = MyContract;