import request from '../request'

export function electricityPrice() {
    return request({
        url: '/eesa-report/electricityPrice/electricityPricePublic/api/v2.0/getRegionElectricityType',
        method: 'get',
    })
}
