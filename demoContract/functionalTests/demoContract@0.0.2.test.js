/*
* Use this file for functional testing of your smart contract. 
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here 
* to generate tests, including those functions that would 
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building 
* further functional tests to run as part of a continuous 
* integration pipeline, or for debugging locally deployed smart 
* contracts by invoking/submitting individual transactions. 
*/
/*
* Generating this test file will also trigger an npm install 
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are 
* required for this test file to be run locally. 
*/

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const yaml = require('js-yaml');
const fs = require('fs-extra');

describe('demoContract@0.0.2' , () => {

    const gateway = new fabricNetwork.Gateway();
    let connectionProfile;
    const wallet = new fabricNetwork.InMemoryWallet();
    const identityName = 'demoContract@0.0.2';
    
    before(async () => {
        const connectionProfilePath = '/Users/Horea.Porutiu@ibm.com/.fabric-vscode/local_fabric/connection.json';
        const certificatePath = '/Users/Horea.Porutiu@ibm.com/.fabric-vscode/local_fabric/certificate';
        const privateKeyPath = '/Users/Horea.Porutiu@ibm.com/.fabric-vscode/local_fabric/privateKey';

        const connectionProfileContents = await fs.readFile(connectionProfilePath, 'utf8');
        if (connectionProfilePath.endsWith('.json')) {
            connectionProfile = JSON.parse(connectionProfileContents);
        } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
            connectionProfile = yaml.safeLoad(connectionProfileContents);
        };
        const certificate = await fs.readFile(certificatePath, 'utf8');
        const privateKey = await fs.readFile(privateKeyPath, 'utf8');

        const clientOrganization = connectionProfile.client.organization;
        const mspid = connectionProfile.organizations[clientOrganization].mspid;
        await wallet.import(identityName, fabricNetwork.X509WalletMixin.createIdentity(mspid, certificate, privateKey));

    });

    beforeEach(async () => {
        await gateway.connect(connectionProfile, {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: true
            }
        });
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    it('instantiate', async () => {
        // TODO: Update with parameters of transaction
        const args = [''];

        const response = await submitTransaction('instantiate', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    it('addMember', async () => {
        // TODO: Update with parameters of transaction
        const args = [''];

        const response = await submitTransaction('addMember', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    it('query', async () => {
        // TODO: Update with parameters of transaction
        const args = [''];

        const response = await submitTransaction('query', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    async function submitTransaction(functionName, args) {
        // Submit transaction
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('demoContract');
        const responseBuffer = await contract.submitTransaction(functionName, ...args);
        return responseBuffer;
    }

});