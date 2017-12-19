/**
 * Created by Jarek on 2017/12/11.
 */
class HOrderItem extends Polymer.Element {
    static get is() {
        return "h-order-item";
    }

    static get properties() {
        return {
            orderId: {
                type: Number,
                value: function () {
                    return 2
                }
            },
            goodsList: { // 商品列表
                type: Array,
                value: function () {
                    return []
                }
            },
            summaryInformation: { // 汇总信息
                type: Object,
                value: function () {
                    return {}
                }
            }
        }
    }


      


    static get observers() {
        return [
            '_goodsPriceChange(goodsList.*)'
        ]
    }

    constructor() {
        super()
        this._getGoodsList()
    }

    /**
     * 获取货物列表
     * @private
     */
    _getGoodsList() {
        const self = this
        window.$.ajax({
            url: '/src/order/data/goods-list.json',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                self.goodsList = data[self.orderId]
            },
            error: function (XMLHttpRequest) {
                console.log(XMLHttpRequest)
            }
        })
    }

    /**
     * 获取总价格
     * @param goodsListChangeObject
     * @returns {Object}
     * @private
     */
    _goodsPriceChange(goodsListChangeObject) {
        const goodsList = goodsListChangeObject.base
        const totalAmount = this._getTotalAmountByGoodsList(goodsList)
        const noPayGoodsList = goodsList.filter(item => {
            return item.status === '未付款'
        })
        const noPayAmount = this._getTotalAmountByGoodsList(noPayGoodsList)
        const payAmount = totalAmount - noPayAmount
        this.set('summaryInformation', {totalAmount: totalAmount, noPayAmount: noPayAmount, payAmount: payAmount})
    }

    /**
     * 根据商品列表获取商品总金额
     * @param goodsList
     * @returns {*}
     * @private
     */
    _getTotalAmountByGoodsList(goodsList) {
        if (goodsList.length === 0) return 0
        const _totalAmount = goodsList.reduce((itemA, itemB) => {
            itemA.totalAmount = itemA.price * itemA.quantity
            itemB.totalAmount = itemB.price * itemB.quantity
            const totalAmount = itemA.totalAmount + itemB.totalAmount
            return {price: totalAmount, quantity: 1}
        })
        return _totalAmount.price
    }

    

    /**
     * 获取货物列表项的 css
     * @param goods
     */
    getGoodsItemClass(goods) {
        if (goods.status === '未付款') {
            return 'no-pay-status'
        } else if (goods.status === '已发货') {
            return 'success-status'
        } else {
            return ''
        }
    }

    onConfirm(event) {
        const goodsName = event.detail.name
        const msg = `这是自定事件(confirm),被点击的商品是${goodsName}`
        window.alert(msg)
    }
}
customElements.define(HOrderItem.is, HOrderItem);