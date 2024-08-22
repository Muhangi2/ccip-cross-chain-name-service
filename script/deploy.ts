import { ethers } from "hardhat";

interface Setup {
    chainSelector: bigint;
    sourceRouter: string;
    destinationRouter: string;
    wrappedNative: string;
    linkToken: string;
    ccipB: string;
    ccipL: string;
}

interface DeploymentReturns {
    localSimulator: any;
    CrossChainNameServiceLookup: any;
    CrossChainNameServiceRegister: any;
    ICrossChainNameServiceRegister: any;
    ICrossChainNameServiceLookup: any;
    CrossChainNameServiceReceiver: any;
    setup: Setup;
    GAS_LIMIT: number;
    deployer: any;
    alice: any;
}

async function deployCrossChainNameService(): Promise<DeploymentReturns> {
    const [deployer, alice] = await ethers.getSigners();
    const GAS_LIMIT = 1_000_000;

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the local simulator
    const localSimulatorFactory = await ethers.getContractFactory("CCIPLocalSimulator");
    const localSimulator = await localSimulatorFactory.deploy();
    await localSimulator.deployed();
    console.log("CCIPLocalSimulator deployed to:", localSimulator.address);

    const setup: Setup = await localSimulator.configuration();

    // Deploy CrossChainNameServiceLookup contracts for both the source and destination
    const CrossChainNameService = await ethers.getContractFactory("CrossChainNameServiceLookup");
    const CrossChainNameServiceLookup = await CrossChainNameService.deploy();
    await CrossChainNameServiceLookup.deployed();
    console.log("CrossChainNameServiceLookup deployed to:", CrossChainNameServiceLookup.address);

    const ICrossChainNameServiceLookup = await CrossChainNameService.deploy();
    await ICrossChainNameServiceLookup.deployed();
    console.log("ICrossChainNameServiceLookup deployed to:", ICrossChainNameServiceLookup.address);

    // Deploy the CrossChainNameServiceRegister for both the source and destination
    const CrossChainNameServiceRegisterSource = await ethers.getContractFactory("CrossChainNameServiceRegister");
    const CrossChainNameServiceRegister = await CrossChainNameServiceRegisterSource.deploy(
        setup.sourceRouter,
        CrossChainNameServiceLookup.address
    );
    await CrossChainNameServiceRegister.deployed();
    console.log("CrossChainNameServiceRegister deployed to:", CrossChainNameServiceRegister.address);

    const ICrossChainNameServiceRegister = await CrossChainNameServiceRegisterSource.deploy(
        setup.destinationRouter,
        ICrossChainNameServiceLookup.address
    );
    await ICrossChainNameServiceRegister.deployed();
    console.log("ICrossChainNameServiceRegister deployed to:", ICrossChainNameServiceRegister.address);

    // Deploy CrossChainNameServiceReceiver contract
    const CrossChainNameServiceFactory = await ethers.getContractFactory('CrossChainNameServiceReceiver');
    const CrossChainNameServiceReceiver = await CrossChainNameServiceFactory.deploy(
        setup.sourceRouter,
        ICrossChainNameServiceLookup.address,
        setup.chainSelector
    );
    await CrossChainNameServiceReceiver.deployed();
    console.log("CrossChainNameServiceReceiver deployed to:", CrossChainNameServiceReceiver.address);

    return {
        localSimulator,
        CrossChainNameServiceLookup,
        CrossChainNameServiceRegister,
        CrossChainNameServiceReceiver,
        ICrossChainNameServiceLookup,
        ICrossChainNameServiceRegister,
        setup,
        GAS_LIMIT,
        deployer,
        alice,
    };
}

async function main() {
    try {
        const deployment = await deployCrossChainNameService();
        console.log("Deployment completed successfully");
        console.log(deployment);
    } catch (error) {
        console.error("Error during deployment:", error);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });