import { loadFixture } from "@nomicfoundation/hardhat-toolbox";

import { expect } from "chai"

import { deployCrossChainNameService } from "../scripts/deploy";
//definining functions

describe("CrossChainNameService", function () {
    const DNS = 'alice.ccns';

    describe("Cross-chain name service registration and lookup", function () {
        it("it should correctly register and lookup the ccs DNS name", async function () {
            const {
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
            } = await loadFixture(deployCrossChainNameService);

            //before anything lets set the ccns addresses for source and destination
            await CrossChainNameServiceLookup.connect(deployer).setCrossChainNameServiceAddress(CrossChainNameServiceRegister.target);
            await ICrossChainNameServiceLookup.connect(deployer).setCrossChainNameServiceAddress(CrossChainNameServiceReceiver.target)

            await ICrossChainNameServiceRegister.connect(deployer).enableChain(setup.chainSelector_, CrossChainNameServiceReceiver.target, GAS_LIMIT)
            //register alices's details using her account
            await CrossChainNameServiceRegister.connect(alice).regsiter(DNS);
            //looking up the registered name on the destination chain
            const registeredAddress = await ICrossChainNameServiceLookup.lookup(DNS)
            //confirm that the look returns alice's addresss
            expect(registeredAddress).to.equal(alice.address, "The address was not registered correctly")

        })
    })
})