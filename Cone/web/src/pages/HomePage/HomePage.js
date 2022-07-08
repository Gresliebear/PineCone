import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { NodeComponent } from 'src/components/NodeComponent'
import { TopNavBar } from 'src/components/TopNavBar'
import { FileSystem } from 'src/components/FileSystem'
import { Footer } from 'src/components/Footer'

import Inspector from 'src/components/Inspector'
import { Console } from 'src/components/Console'
import ViewPort from 'src/components/Viewport'

const HomePage = () => {
  return (
    <div className='bg-slate-100 h-screen'>
      <MetaTags title="Home" description="Home page" />
      <TopNavBar/>
  <div className="flex flex-row">
  <div className="basis-2/6 border-2 border-black h-screen">01
      <NodeComponent>
      </NodeComponent>
      <FileSystem>
      </FileSystem>
  </div>
  <div className="basis-5/6 border-2 border-black h-screen">
    <ViewPort/>
    <Console></Console>
  </div>
  <div className="basis-2/6 border-2 border-black h-screen">03
    <Inspector>

    </Inspector>
  </div>
</div>
    <Footer></Footer>
    </div>
  )
}

export default HomePage
