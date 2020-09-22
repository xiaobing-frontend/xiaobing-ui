import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import '../components/button/style'
import '../components/switch/style'
import '../components/spin/style'
import '../components/audio/style'
import { Button, Audio, Switch, Spin, Icon } from '../components'

const App = () => {
  const [checked, setChecked] = useState<boolean>(false)
  const handleSiwtch = (check: boolean) => {
    setChecked(check)
  }
  return (
    <div>
      <Button type="primary" danger>
        primary
      </Button>
      <Button type="dashed" danger>
        dashed
      </Button>
      <Button type="primary" disabled>
        disabled
      </Button>
      <div style={{marginTop: '100px'}}><Audio id="xxxx" src="http://mp3.9ku.com/hot/2009/08-27/186947.mp3" /></div>
      <Switch defaultChecked checked={checked} onChange={handleSiwtch} />
      <Spin />
      <br />
      <Spin size="large" />
      <Icon icon="ad" size="2x" theme="primary" />
    </div>
  )
}

export default hot(App)
