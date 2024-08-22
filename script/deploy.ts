import { ethers } from "hardhat";
import { CrossChainNameServiceLookup } from '../typechain-types/contracts/CrossChainNameServiceLookup';
import { CrossChainNameServiceRegister } from '../typechain-types/contracts/CrossChainNameServiceRegister';
import { CrossChainNameServiceReceiver } from '../typechain-types/contracts/CrossChainNameServiceReceiver';
import { ICrossChainNameServiceLookup } from '../typechain-types/contracts/ICrossChainNameServiceLookup';
import config from '../hardhat.config';

interface Setup {
    chainSelector: bigint;
    sourceRouter: string;
    destinationRouter: string;
    wrappedNative: string;
    linkToken: string;
    ccipB: string;
    ccipL: string;
}
interface Deploymentreturns {
    localSimulator: any;
    CrossChainNameServiceLookup: any;
    CrossChainNameServiceRegister: any;
    ICrossChainNameServiceRegister: any;
    ICrossChainNameServiceLookup: any;
    CrossChainNameServiceReceiver: any;
    Setup: any;
    GAS_LIMIT: number;
    deployer: any;
    alice: any;

}

//lets deploy the crossChainNameservice
export async function deployCrossChainNameService(): Promise<Deploymentreturns> {
    const [deployer, alice] = await ethers.getSigners();
    const GAS_LIMIT = 1_000_000;

    //deploy the local simulator
    const localSimulatorFactory = await ethers.getContractFactory("CCIPLocalSimulator")
    const localSimulator = await localSimulatorFactory.deploy();
    const setup: Setup = await localSimulator.configuration();

    //deploy crosschainNameServiceloopup contracts for both the source and destinatiom
    const CrossChainNameService = await ethers.getContractFactory(" CrossChainNameServiceLookup");
    const CrossChainNameServiceLookup = await CrossChainNameService.connect(deployer).deploy();
    const ICrossChainNameServiceLookup = await CrossChainNameService.connect(deployer).deploy();

//deploy the crosschainservice register for both the source and destination
 const CrossChainNameServiceRegister=await ethers.getContractFactory("CrossChainNameServiceRegister")
 const CrossChainNameServiceRegisterSource=await CrossChainNameServiceRegister.connect(deployer).deploy(
    setup.sourceRouter,
    CrossChainNameServiceLookup.target,
 )
 const 



    return {
        localSimulator,
        CrossChainNameServiceLookup,
        CrossChainNameServiceRegister,
        CrossChainNameServiceReceiver,
        ICrossChainNameServiceLookup,
        Setup,
        GAS_LIMIT,
        deployer,
        alice,
    }

}
