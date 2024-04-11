import type {
  EosioReaderAbisMap,
  EosioReaderActionFilter,
  EosioReaderConfig,
  EosioReaderTableRowFilter,
  ShipTableDeltaName,
} from '@blockmatic/eosio-ship-reader'

import {
  createEosioShipReader,
} from '@blockmatic/eosio-ship-reader'

import { eosioApi, shipApi, subsribedActions, subsribedTables } from '../config'
import { fetchAbi, getInfo } from './Utils'

const table_rows_whitelist: () => EosioReaderTableRowFilter[] = () => subsribedTables
const actions_whitelist: () => EosioReaderActionFilter[] = () => subsribedActions

export async function loadReader() {
  const info = await getInfo()
  const unique_contract_names = [...new Set(table_rows_whitelist().map(row => row.code)), ...new Set(actions_whitelist().map(row => row.code))]
  const abisArr = await Promise.all(unique_contract_names.map(account_name => fetchAbi(account_name)))

  const contract_abis: () => EosioReaderAbisMap = () => {
    const numap = new Map()
    abisArr.forEach(({ account_name, abi }) => numap.set(account_name, abi))
    return numap
  }

  const delta_whitelist: () => ShipTableDeltaName[] = () => [
    'account_metadata',
    'contract_table',
    'contract_row',
    'contract_index64',
    'resource_usage',
    'resource_limits_state',
  ]

  const eosioReaderConfig: EosioReaderConfig = {
    ws_url: shipApi,
    rpc_url: eosioApi,
    ds_threads: 2,
    ds_experimental: false,
    delta_whitelist,
    table_rows_whitelist,
    actions_whitelist,
    contract_abis,
    request: {
      start_block_num: info.head_block_num + 10,
      end_block_num: 0xFFFFFFFF,
      max_messages_in_flight: 50,
      have_positions: [],
      irreversible_only: false,
      fetch_block: true,
      fetch_traces: true,
      fetch_deltas: true,
    },
    auto_start: true,
  }

  return await createEosioShipReader(eosioReaderConfig)
}
