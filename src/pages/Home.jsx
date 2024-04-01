import { jh_logo } from '../assets'
import { Footer } from '../components'

const Home = () => {
  return (
    <div>
        <section className='relative flex lg:flex-row flex-col max-container h-[100lvh]'>
            <div className='flex-1 min-w-[50%] flex flex-col'>
                <div className='absolute w-[100%] top-[50%] translate-y-[-50%] grid grid-cols-2 md:grid-cols-4'>
                    <div className='hidden-md' />
                    <div className='col-span-2 md:col-span-1'>
                        <div className='h-[300px] w-[300px] relative left-[50%] translate-x-[-50%]'>
                            <img className='h-[100%]' src={jh_logo}/>
                        </div>
                    </div>
                    <div className='text-wrap p-12 col-span-2  md:col-span-1'>
                        <div className='h-[300px] w-[300px] relative left-[50%] translate-x-[-50%]'>
                            <h1 className='p-0 m-0 font-minecraft text-[4rem] text-wrap font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] bg-clip-text text-transparent text-center md:text-left'>JHCoin</h1>
                            <p className='text-justify indent-4 p-0 m-0'>A cool random useless blockchain demonstration that I just experimented with, feel free to test it. Data will be stored in the local storage of your browser.</p>
                        </div>
                    </div>
                    <div className='hidden-md' />
                </div>
            </div>
        </section>
        <Footer className="absolute bottom-0 text-center" />
    </div>
  )
}

export default Home