import client from '../client'
import { WalletEndpoint } from '../endpoints'
import { isMockEnabled, MOCK_DELAY, MockEndpoint } from '../mocks'
import { randomByPercent } from '@renderer/lib/utils'
import { HttpMethod } from '@renderer/constants'

type WalletInfo = {
  walletId: string
  walletAddress: string
  walletName: string
  balance: string
}

export type WalletInfoList = WalletInfo[]

export interface GetWalletsResponse {
  wallets: WalletInfoList
}

export const getWallets = async (): Promise<GetWalletsResponse | null> => {
  if (isMockEnabled) {
    if (randomByPercent(1)) {
      const res = await client.request<GetWalletsResponse>({
        method: HttpMethod.GET,
        url: MockEndpoint.UNAUTHORIZED
      })
      return res.data
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          wallets: [
            {
              walletId: 'wallet-1',
              walletAddress: '8MaVa9kdt3NW4Q5HyNAm1X5LbR8PQRVDc1W8NMVK88D5',
              walletName: '主钱包',
              balance: '1000'
            },
            {
              walletId: 'wallet-2',
              walletAddress: '43F2D1C0B9A8E7F6D5C4B3A2B1A0E9D8C7B6A5F4E3D2',
              walletName: '副钱包A',
              balance: '500'
            },
            {
              walletId: 'wallet-3',
              walletAddress: '9B8A7C6D5E4F3G2H1I0J9K8L7M6N5O4P3Q2R1S0T9U8V',
              walletName: '副钱包B',
              balance: '750'
            }
          ]
        })
      }, MOCK_DELAY)
    })
  }

  const res = await client.request<GetWalletsResponse>({
    method: HttpMethod.GET,
    url: WalletEndpoint.GET_WALLETS
  })
  return res.data
}
