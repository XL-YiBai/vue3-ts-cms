import xlRequest from '../../index'

enum DashboardAPI {
  amountList = '/goods/amount/list',
  goodsSaleTop10 = '/goods/sale/top10',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getAmountList() {
  return xlRequest.get({
    url: DashboardAPI.amountList
  })
}

export function getGoodsSaleTop10() {
  return xlRequest.get({
    url: DashboardAPI.goodsSaleTop10
  })
}

export function getCategoryGoodsCount() {
  return xlRequest.get({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return xlRequest.get({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return xlRequest.get({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return xlRequest.get({
    url: DashboardAPI.addressGoodsSale
  })
}
