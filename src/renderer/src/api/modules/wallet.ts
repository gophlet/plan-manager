import client from '../client'
import { WalletEndpoint } from '../endpoints'
import { isMockEnabled, MOCK_DELAY, MockEndpoint } from '../mocks'
import { randomByPercent } from '@renderer/lib/utils'
import { HttpMethod } from '@renderer/constants'

type WalletInfo = {
  walletId: string
  walletAddress: string
  walletName: string
}

type WalletInfoList = WalletInfo[]

export interface GetWalletsResponse {
  wallets: WalletInfoList
}

export const getWallets = async (): Promise<GetWalletsResponse | null> => {
  if (isMockEnabled) {
    if (randomByPercent(5)) {
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
      }, MOCK_DELAY)
    })
  }

  const res = await client.request<GetWalletsResponse>({
    method: HttpMethod.GET,
    url: WalletEndpoint.GET_WALLETS
  })
  return res.data
}
