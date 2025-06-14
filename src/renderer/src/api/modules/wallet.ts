import client from '../client'
import { WalletEndpoints } from '../endpoints'

const isMock = import.meta.env.MODE === 'development'

type WalletInfo = {
  walletId: string
  walletAddress: string
  walletName: string
}

type WalletInfoList = WalletInfo[]

export interface GetWalletsResponse {
  wallets: WalletInfoList
}

export const getWallets = async (): Promise<GetWalletsResponse> => {
  if (isMock) {
    if (Math.random() < 0.05) {
      const res = await client.get('/status/401', {
        baseURL: 'https://httpbin.org'
      })
      return res.data
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          wallets: [
            {
              walletId: 'wallet-1',
              walletAddress: '0x1234567890abcdef',
              walletName: '主钱包'
            },
            {
              walletId: 'wallet-2',
              walletAddress: '0xabcdef1234567890',
              walletName: '副钱包A'
            },
            {
              walletId: 'wallet-3',
              walletAddress: '0x9876543210fedcba',
              walletName: '副钱包B'
            }
          ]
        })
      }, 400)
    })
  }
  const res = await client.post<GetWalletsResponse>(WalletEndpoints.getWallets)
  return res.data
}
