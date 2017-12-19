/**
 * Created by Jarek on 2017/12/4.
 */
// import Greeter from './Greeter.js'

// import './main.css'
// document.querySelector('#root').appendChild(Greeter.test())
//

import $ from 'jquery'
$.ajax({
    url: '/api/demo/string.html',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data)
    },
    error: function (XMLHttpRequest) {
    }
})

document.querySelector('body').appendChild(new MyApp())