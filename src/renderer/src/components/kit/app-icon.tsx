import * as React from 'react'
import icon from '@renderer/assets/icon.png'

const AppIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 32,
  className = ''
}) => (
  <img
    src={icon}
    alt="App Icon"
    width={size}
    height={size}
    className={className}
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  />
)

export default AppIcon
