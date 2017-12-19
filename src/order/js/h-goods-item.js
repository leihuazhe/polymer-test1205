/**
 * Created by Jarek on 2017/12/11.
 */
class HGoodsItem extends Polymer.Element {
    static get is() {
        return "h-goods-item";
    }
    static get properties() {
        return {
            goodsItem: {
                type: Object,
                value: function () {
                    return {}
                },
                reflectToAttribute: true
            }
        }
    }

    static get observers() {
        return [
            '_goodsQuantityChange(goodsList.*)'
        ]
    }




    itemClick() {
        // 我们创建了一个自定义的事件对象，并且调用  dispatchEvent   来分发该事件  --> 传往 父组件
        this.dispatchEvent(new CustomEvent('confirm', {detail: this.goodsItem}))
    }
    addressClick() {
        const address = this.$.address.innerText //获取span里的值
        alert(address)
    }

    quantityClick() {
        const quantity = this.$.quantity.innerText //获取span里的值
        
        this.set('goodsItem.quantity',parseInt(quantity) + 1)


    }

   


}
customElements.define(HGoodsItem.is, HGoodsItem);