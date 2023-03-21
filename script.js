let invoice = '' + (Math.random()*1000000)

window.onload = function () {
    let btn = document.getElementById('payButton')
    btn.addEventListener('click', pay)
}

function pay() {
    let test = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        price: parseFloat(document.getElementById('amount').value),
        payerInfo: document.getElementById('email').value,
        currency: document.querySelector('[name="currency"]').value,
        description: document.getElementById('description').value,
        invoiceId: invoice.substr(0,6),
        phone: document.getElementById('phone').value
    }

    let data = {
        firstName: test.firstName,
        lastName: test.lastName,
        phone: test.phone,
    }

    let recurrent = document.getElementById('recurrent')
    if (recurrent.checked) {
        data.CloudPayments = {
            recurrent: {
                interval: 'Month',
                period: 1
            } 
        }
    }

    let widget = new cp.CloudPayments({
        language: "ru-RU"
    })
    widget.pay('charge', 
        { 
            publicId: 'pk_868362486e40f04ef6517831cc978', 
            description: test.description, 
            amount: test.price, 
            currency: test.currency,
            accountId: test.payerInfo,
            email: test.payerInfo,
            data: data,
            invoiceId: test.invoiceId
        }, {

            onSuccess: function (options) {
                alert('Оплата успешна')
                document.location.reload()
            },
            onFail: function (reason, options) {
                alert('Fail')
                document.location.reload()
            },
            onComplete: function (paymentResult, options) {
            }
        }
    )
}