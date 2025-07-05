import React from 'react'
import {
  TokenBTC,
  TokenETH,
  TokenUSDT,
  TokenUSDC,
  TokenSOL,
  TokenBNB,
  TokenADA,
  TokenDOT,
  TokenLINK,
  TokenMATIC,
  TokenAVAX,
  TokenUNI,
  TokenAPE,
  TokenAXS,
  TokenTRX,
  TokenBCH,
  TokenLTC,
  TokenDAI,
  TokenWBTC,
  TokenTUSD,
  TokenDOGE,
  TokenARB,
  TokenOP,
  TokenFIL,
  TokenMKR,
  TokenSUI,
  TokenINJ,
  TokenRUNE,
  TokenFTM,
  TokenCRO,
  TokenNEAR,
  TokenHBAR,
  TokenQNT,
  TokenAAVE,
  TokenGRT,
  TokenSNX,
  TokenLDO,
  TokenIMX,
  TokenMANA,
  TokenSAND,
  TokenENJ,
  TokenCHZ,
  TokenDYDX,
  Token1INCH,
  TokenENS,
  TokenCOMP,
  TokenCRV,
  TokenYFI,
  TokenCAKE,
  TokenSUSHI,
  TokenGMX,
  TokenLRC,
  TokenZRX,
  TokenBAT,
  TokenOMG,
  TokenRSR,
  TokenBNT,
  TokenOCEAN,
  TokenALGO,
  TokenFLOW,
  TokenXTZ,
  TokenEOS,
  TokenKSM,
  TokenATOM,
  TokenEGLD,
  TokenMINA,
  TokenSTX,
  TokenAPT,
  TokenTON,
  TokenXRP,
  TokenXLM,
  TokenXMR,
  TokenDASH,
  TokenZEC,
  TokenRVN,
  TokenBTG,
  TokenICX,
  TokenONT,
  TokenQTUM,
  TokenWAVES,
  TokenSC,
  TokenAR,
  TokenHOT,
  TokenCELR,
  TokenCKB,
  TokenCVC,
  TokenPOWR,
  TokenREQ,
  TokenSTORJ,
  TokenSYS,
  TokenVET,
  TokenWAN,
  TokenZEN,
  NetworkEthereum,
  NetworkBinanceSmartChain,
  NetworkPolygon,
  NetworkSolana,
  NetworkCardano,
  NetworkPolkadot,
  NetworkAvalanche,
  NetworkOptimism,
  NetworkFantom,
  NetworkCronos,
  NetworkAptos,
  NetworkTron,
  NetworkStellar,
  WalletMetamask,
  WalletCoinbase,
  WalletTrust,
  WalletLedger,
  WalletPhantom,
  WalletRainbow,
  WalletImtoken,
  WalletOkx,
  WalletTokenPocket,
  WalletZerion,
  WalletArgent
} from '@web3icons/react'
import { cn } from '@renderer/lib/utils'

export interface Web3IconBackgroundProps {
  className?: string
}

type Web3IconComponent = React.ComponentType<{
  size?: number
  className?: string
  style?: React.CSSProperties
}>

const WEB3_ICONS: Web3IconComponent[] = [
  TokenBTC,
  TokenETH,
  TokenUSDT,
  TokenUSDC,
  TokenSOL,
  TokenBNB,
  TokenADA,
  TokenDOT,
  TokenLINK,
  TokenMATIC,
  TokenAVAX,
  TokenUNI,
  TokenAPE,
  TokenAXS,
  TokenTRX,
  TokenBCH,
  TokenLTC,
  TokenDAI,
  TokenWBTC,
  TokenTUSD,
  TokenDOGE,
  TokenARB,
  TokenOP,
  TokenFIL,
  TokenMKR,
  TokenSUI,
  TokenINJ,
  TokenRUNE,
  TokenFTM,
  TokenCRO,
  TokenNEAR,
  TokenHBAR,
  TokenQNT,
  TokenAAVE,
  TokenGRT,
  TokenSNX,
  TokenLDO,
  TokenIMX,
  TokenMANA,
  TokenSAND,
  TokenENJ,
  TokenCHZ,
  TokenDYDX,
  Token1INCH,
  TokenENS,
  TokenCOMP,
  TokenCRV,
  TokenYFI,
  TokenCAKE,
  TokenSUSHI,
  TokenGMX,
  TokenLRC,
  TokenZRX,
  TokenBAT,
  TokenOMG,
  TokenRSR,
  TokenBNT,
  TokenOCEAN,
  TokenALGO,
  TokenFLOW,
  TokenXTZ,
  TokenEOS,
  TokenKSM,
  TokenATOM,
  TokenEGLD,
  TokenMINA,
  TokenSTX,
  TokenAPT,
  TokenTON,
  TokenXRP,
  TokenXLM,
  TokenXMR,
  TokenDASH,
  TokenZEC,
  TokenRVN,
  TokenBTG,
  TokenICX,
  TokenONT,
  TokenQTUM,
  TokenWAVES,
  TokenSC,
  TokenAR,
  TokenHOT,
  TokenCELR,
  TokenCKB,
  TokenCVC,
  TokenPOWR,
  TokenREQ,
  TokenSTORJ,
  TokenSYS,
  TokenVET,
  TokenWAN,
  TokenZEN,
  NetworkEthereum,
  NetworkBinanceSmartChain,
  NetworkPolygon,
  NetworkSolana,
  NetworkCardano,
  NetworkPolkadot,
  NetworkAvalanche,
  NetworkOptimism,
  NetworkFantom,
  NetworkCronos,
  NetworkAptos,
  NetworkTron,
  NetworkStellar,
  WalletMetamask,
  WalletCoinbase,
  WalletTrust,
  WalletLedger,
  WalletPhantom,
  WalletRainbow,
  WalletImtoken,
  WalletOkx,
  WalletTokenPocket,
  WalletZerion,
  WalletArgent
]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function getRandomIcon(): Web3IconComponent {
  return WEB3_ICONS[Math.floor(Math.random() * WEB3_ICONS.length)]
}

const IconCell: React.FC = () => {
  const [icon, setIcon] = React.useState<Web3IconComponent>(() => getRandomIcon())
  const [animationDuration] = React.useState(() => `${randomBetween(4, 8)}s`)
  const [animationDelay] = React.useState(() => `${randomBetween(0, 5)}s`)

  const handleAnimationIteration = (): void => {
    setIcon(() => getRandomIcon())
  }

  const IconComponent = icon

  return (
    <div
      className="flex items-center justify-center"
      style={{
        animationName: 'web3-icon-blink',
        animationDuration,
        animationDelay,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
      }}
      onAnimationIteration={handleAnimationIteration}
    >
      <IconComponent size={32} className="text-gray-300/70" style={{ filter: 'blur(0.5px)' }} />
    </div>
  )
}

const Web3IconBackground: React.FC<Web3IconBackgroundProps> = ({ className }) => {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const cellSize = 80

  React.useEffect(() => {
    const update = (): void => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cols = Math.ceil(size.width / cellSize) + 1
  const rows = Math.ceil(size.height / cellSize) + 1
  const total = cols * rows

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
      aria-hidden="true"
      style={{
        animation: 'fade-in-bg 12s cubic-bezier(.4,0,.2,1)'
      }}
    >
      <div
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridAutoRows: `${cellSize}px`
        }}
      >
        {Array.from({ length: total }, (_, i) => (
          <IconCell key={i} />
        ))}
      </div>
      <style>{`
        @keyframes web3-icon-blink {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }
        @keyframes fade-in-bg {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default Web3IconBackground
