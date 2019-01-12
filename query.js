const { FileSystemWallet, Gateway } = require('fabric-network');
const fabricNetwork = require('fabric-network');

const fs = require('fs');
const wallet = new FileSystemWallet('./hfc-key-store');
const identityName = 'newAdmin';
const connectionProfile = require('./IBPCerts/creds.json');
let certificatePath = fs.readFileSync('./IBPCerts/cert').toString();
let privateKeyPath = fs.readFileSync('./IBPCerts/priv').toString();

async function main() {

  // A gateway defines the peers used to access Fabric networks
  const gateway = new Gateway();

  try {

    //set our membership service provider
    const mspid = connectionProfile.organizations.org1.mspid;
    
    //import our IBP (IBM Blockchain Platform) certificates: public + private key
    await wallet.import(identityName, fabricNetwork.X509WalletMixin.createIdentity(mspid, certificatePath, privateKeyPath));

    //object that enables us to connect to our cloud network, using the new 
    // identity we create in the line above
    let connectionOptions = {
      identity: identityName,
      wallet: wallet
    };

    // connect to our cloud network
    await gateway.connect(connectionProfile, connectionOptions);

    //get our channel
    const network = await gateway.getNetwork('defaultchannel');
    //get our contract
    const contract = await network.getContract('demoContract');

    // the first arg should be the query method, the second will be the key 
    // you want to query the value for
    let res = await contract.evaluateTransaction('query', 'ginny@ibm.com');

    console.log('query response: ')

    console.log(JSON.parse(res.toString()))

  } catch (error) {
      console.log(`Error processing transaction. ${error}`);
      console.log(error.stack);
  } finally {
      // Disconnect from the gateway
      console.log('Disconnect from Fabric gateway.');
      gateway.disconnect();
}


}
main().then(()=>{
  console.log('done');
}).catch((e)=>{
  console.log('Final error checking.......');
  console.log('error: ')
  console.log(e);
  console.log(e.stack);
  process.exit(-1);
});