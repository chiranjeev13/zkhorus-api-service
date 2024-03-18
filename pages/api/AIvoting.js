const ethers = require("ethers");
const abii = require("../abi.json");

const provider = new ethers.JsonRpcProvider(
  "https://polygon-mumbai-bor-rpc.publicnode.com"
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const abi = abii.abi;
const signer = wallet.connect(provider);

async function tx(contract, proposalId, vote, fullProof, groupId) {
  const contractInstance = new ethers.Contract(contract, abi, signer);
  const txs = await contractInstance.voteOnproposal(
    proposalId,
    vote,
    fullProof.merkleTreeRoot,
    fullProof.nullifierHash,
    fullProof.externalNullifier,
    groupId,
    fullProof.proof
  );

  return txs;
}

export default function handler(req, res) {
  try {
    const { fullProof } = req.query;
    const { proposalId } = req.query;
    const { vote } = req.query;
    const { groupId } = req.query;
    const { contract } = req.query;

    const resp = tx(contract, proposalId, vote, fullProof, groupId);

    res.status(200).json({
      resp,
    });
  } catch (err) {
    res.status(405).end(err);
  }
}
