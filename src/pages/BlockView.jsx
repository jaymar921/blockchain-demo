import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import useBlockchain from "../hooks/useBlockchain";
import { Block } from "../objects/Block";
import { IsMobile } from "../utilities/utility";
import {
  getAccountByWalletAddress,
  loadBlockchain,
} from "../utilities/datahandler";
import useAccount from "../hooks/useAccount";

function BlockView() {
  const getParam = useParams();
  const [blockchain, setBlockchain] = useState(undefined);
  const loggedInUser = useAccount();
  const [currentBlock, setCurrentBlock] = useState(new Block(1, [], undefined));
  const [userWalletAddress, setUserWalletAddress] = useState(undefined);

  if (getParam.id === "" || getParam.id === "undefined") location.href = "/";

  /**
   *
   * @param {Block} block
   */
  const ValidBlock = (block) => {
    if (!new String(block.GetHash()).startsWith(IsMobile() ? "00" : "000"))
      return false;
    if (
      !new String(block.GetPreviousHash()).startsWith(IsMobile() ? "00" : "000")
    )
      return false;
    if (!blockchain.GetBlock(block.GetPreviousHash()) && !block.ID === 1)
      return false;
    return true;
  };

  useEffect(() => {
    const load = async () => {
      const blockchain = await loadBlockchain(
        IsMobile() ? 2 : 3,
        5,
        false,
        true
      );
      const foundBlock = blockchain.GetBlock(getParam.id);
      setCurrentBlock(foundBlock);

      console.log(foundBlock);
      setBlockchain(blockchain);
    };
    load();
  }, [getParam]);

  useEffect(() => {
    if (loggedInUser) {
      setUserWalletAddress(loggedInUser.WalletAddress);
    }
  }, [loggedInUser]);

  return (
    <div className="relative flex lg:flex-row flex-col max-container h-[100%]">
      <div className="relative left-[50%] translate-x-[-50%] h-[100%] w-[95%] md:w-[750px] mt-[10lvh] font-minecraft overflow-hidden">
        <NavLink to="/blockchain" className="underline">
          Back
        </NavLink>

        {currentBlock && (
          <div className="border border-dashed my-8">
            <div className="p-2">
              <p>
                Block# {currentBlock.ID}{" "}
                {ValidBlock(currentBlock) ? (
                  <i
                    title="This block is valid"
                    className="fa-solid fa-check text-green-400"
                  ></i>
                ) : (
                  <i
                    title="Mining currentBlock... this will take sometime"
                    className="fa-solid fa-list-check text-orange-400 fa-fade"
                  ></i>
                )}
              </p>
              <p className="truncate" title={currentBlock.GetPreviousHash()}>
                Previous Hash: {currentBlock.GetPreviousHash()}
              </p>
              <p className="truncate" title={currentBlock.GetHash()}>
                Current Hash: {currentBlock.GetHash()}
              </p>
            </div>
            <div className="px-2 mb-2">
              <p className="text-center">Transactions</p>
              <table className="table-fixed w-[100%] border">
                <thead className="text-[0.8rem] md:text-[1rem]">
                  <th>Amount</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Timestamp</th>
                  <th>-</th>
                </thead>
                <tbody>
                  {currentBlock.GetTransactions().map((tr) => (
                    <tr
                      key={tr.timestamp + new String(Math.random() * 999999)}
                      className={`text-center text-[0.8rem] md:text-[1rem] ${
                        (userWalletAddress === tr.from ||
                          userWalletAddress === tr.to) &&
                        "text-yellow-200"
                      } `}
                    >
                      <td>{tr.amount} JHC</td>
                      <td className="truncate" title={tr.from}>
                        {getAccountByWalletAddress(tr.from)?.Username ??
                          "System"}
                      </td>
                      <td className="truncate" title={tr.to}>
                        {getAccountByWalletAddress(tr.to)?.Username ?? "System"}
                      </td>
                      <td title={new Date(tr.timestamp).toLocaleTimeString()}>
                        {new Date(tr.timestamp).toLocaleDateString()}
                      </td>
                      <td title={`Signature: ${tr.signature}`}>
                        <i className="fa-solid fa-lock text-green-400"></i>
                      </td>
                    </tr>
                  ))}
                  {currentBlock.GetTransactions().length === 0 ? (
                    <tr>
                      <td className="text-center" colSpan={5}>
                        No transaction
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlockView;
