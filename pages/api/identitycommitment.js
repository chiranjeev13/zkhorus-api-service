// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

require("dotenv").config();
const ethers = require("ethers");
export default function handler(req, res) {
  try {
    const { wallet } = req.query;
    const hash = ethers.sha256(new Uint8Array([wallet, process.env.KEY]));
    res.status(200).json({
      hash,
    });
  } catch (err) {
    res.status(405).end();
  }
}
