import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BlockChain } from './objects/BlockChain'
import { Block } from './objects/Block'
import { MineBlock } from './objects/MineBlock'

function App() {
  const [blockChain, setBlockChain] = useState(new BlockChain([]))

  useEffect(()=>{
    (async () => {
      const bc = new BlockChain([]);

      const block1 = new Block();
      block1.AddTransaction("Jay bought 1 bitcoin")
      block1.AddTransaction("Dylan bought 10 bitcoin")
      const block1_mined = await MineBlock(block1);
      block1.SetHash(block1_mined.GetHash())

      const block2 = new Block();
      block2.AddTransaction("Jay transferred 1 bitcoin to Pia")
      block2.AddTransaction("Dylan transferred 5 bitcoin to Jay")
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
          {blockChain.blocks.map((block, index) => 
            (
              <div key={index} className='border'>
                <div>
                  <p>ID: {block.ID}</p>
                  <p>Nonce: {block.GetNonce()}</p>
                  <p>Transactions: {block.GetTransactions().map((t, i) => {
                    return <p key={i}>{t}</p>
                  })}</p>
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
