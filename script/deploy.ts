import { ethers } from "ethers";
import { CrossChainNameServiceLookup } from '../typechain-types/contracts/CrossChainNameServiceLookup';
import { CrossChainNameServiceRegister } from '../typechain-types/contracts/CrossChainNameServiceRegister';
import { CrossChainNameServiceReceiver } from '../typechain-types/contracts/CrossChainNameServiceReceiver';
import { ICrossChainNameServiceLookup } from '../typechain-types/contracts/ICrossChainNameServiceLookup';
import config from '../hardhat.config';

interface Setup{
    chainSelector:bigint;
    sourceRouter:string;
    destinationRouter:string;
    wrappedNative:string;
    linkToken:string;
    ccipB:string;
    ccipL:string;
}
interface  Deployreturns{
    localSimulator:any;
    CrossChainNameServiceLookup:any;
    CrossChainNameServiceRegister:any;
    CrossChainNameServiceReceiver:any;
    ICrossChainNameServiceLookup:any;
    Setup:any;
    deployer:any;
    GAS_LIMIT:number;
    alice:any;
    
}
