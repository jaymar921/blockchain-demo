import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BlockChain } from './objects/BlockChain'
import { Block } from './objects/Block'
import { MineBlock } from './objects/MineBlock'
import { UserRepository } from './objects/UserRepository'
import { Transaction } from './objects/Transaction'

function App() {
  const [blockChain, setBlockChain] = useState(new BlockChain([]))
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    (async () => {
      const bc = new BlockChain([]);
      const usRepo = new UserRepository();

      const jay = usRepo.GetUser("Jayharron");
      await jay.GenerateKeys();
      const pia = usRepo.GetUser("Pia")
      await pia.GenerateKeys();
      const dylan = usRepo.GetUser("Dylan")
      await dylan.GenerateKeys();
      const xerxes = usRepo.GetUser("Xerxes")
      await xerxes.GenerateKeys();
      setUsers([jay, pia, dylan, xerxes])

      const block1 = new Block();
      // transaction 1
      const transaction1 = new Transaction(10, jay.Fullname, pia.Fullname);
      await transaction1.sign(jay.PrivateKey);
      block1.AddTransaction(transaction1)

      const transaction2 = new Transaction(15, jay.Fullname, dylan.Fullname);
      await transaction2.sign(jay.PrivateKey);
      block1.AddTransaction(transaction2)

      const block1_mined = await MineBlock(block1);
      block1.SetHash(block1_mined.GetHash())

      const block2 = new Block();
      const transaction3 = new Transaction(3, dylan.Fullname, jay.Fullname);
      await transaction3.sign(dylan.PrivateKey);
      block2.AddTransaction(transaction3)

      const transaction4 = new Transaction(7, dylan.Fullname, xerxes.Fullname);
      await transaction4.sign(dylan.PrivateKey);
      block2.AddTransaction(transaction4)
      
      const block2_mined = await MineBlock(block2);
      block2.SetHash(block2_mined.GetHash())
      console.log(block2.GetHash())

      bc.AddBlock(block1);
      bc.AddBlock(block2)
      setBlockChain(bc)
    })()
  },[]);
  return (
    <>
        <div className=''>
          <h1>Block Chain</h1>
          {blockChain.blocks.map((block, index) => 
            (
              <div key={index} className='border w-[800px] m-4 p-2'>
                <div>
                  <p className='text-lg font-bold'>Block #: {block.ID}</p>
                  <div className='px-[20px]'>
                    <p className='text-left'>Transactions</p>
                    <div className='p-[20px]'>
                      <table className='table-fixed border w-[100%]'>
                        <thead>
                          <th>Amount</th>
                          <th>From</th>
                          <th>To</th>
                        </thead>
                        <tbody>
                          {block.GetTransactions().map((t, i) => {
                            return <tr key={i}>
                              <td>{t.amount}</td>
                              <td>{t.from}</td>
                              <td>{t.to}</td>
                          </tr>
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p>PrevHash: {block.GetPreviousHash()}</p>
                  <p>Hash: {block.GetHash()}</p>
                  </div>
              </div>
            )
          )}
        </div>
    </>
  )
}

export default App
