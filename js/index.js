$(document).ready(function () {

    getItemButtons();

    $('#dollar-button').click(function (event) {
        var userCash = $('#user-cash').val();
        var cashInt = parseFloat(userCash);
        if (!cashInt) {
            var newValue = `1`;
            $('#user-cash').val(newValue);
        } else {
            cashInt += 1.00;
            cashInt = cashInt.toFixed(2);
            $('#user-cash').val(cashInt);
        }
    });

    $('#quarter-button').click(function (event) {
        var userCash = $('#user-cash').val();
        var cashInt = parseFloat(userCash)
        if (!cashInt) {
            var newValue = `0.25`;
            $('#user-cash').val(newValue);
        } else {
            cashInt += 0.25;
            cashInt = cashInt.toFixed(2);
            $('#user-cash').val(cashInt);
        }
    });

    $('#dime-button').click(function (event) {
        var userCash = $('#user-cash').val();
        var cashInt = parseFloat(userCash)
        if (!cashInt) {
            var newValue = `0.10`;
            $('#user-cash').val(newValue);
        } else {
            cashInt += 0.10;
            cashInt = cashInt.toFixed(2);
            $('#user-cash').val(cashInt);
        }
    });

    $('#nickel-button').click(function (event) {
        var userCash = $('#user-cash').val();
        var cashInt = parseFloat(userCash)
        if (!cashInt) {
            var newValue = `0.05`;
            $('#user-cash').val(newValue);
        } else {
            cashInt += 0.05;
            cashInt = cashInt.toFixed(2);
            $('#user-cash').val(cashInt);
        }
    });

});

function getItemButtons() {
    
    var itemDiv = $('#items-div');

    $.ajax({
        type: 'GET',
        url: 'https://safe-citadel-78971.herokuapp.com/items',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var btn = `<button class='snack-button' id='${id}' value='${id}'>`;
                btn += `<h4>${id}</h4>`
                btn += `<h4>${name}</h4>`;
                btn += `<h4>$${price}</h4>`;
                btn += `<h4>Quantity: ${quantity}</h4>`;
                btn += `</button>`;
                itemDiv.append(btn);
            });

            $('.snack-button').click(function (event) {
                var itemId = $(this).val();
                $('#item-form').empty();
                $('#item-form').val(itemId);
            });

        }
    });
}

$('#change-return-button').click(function (e) {
    var nickels, dimes, quarters = 0;

    var temp = $('#user-cash').val();
    quarters = Math.floor(100 * parseFloat(temp) / 25);
    temp = temp % .25;
    dimes = Math.floor(100 * parseFloat(temp) / 10);
    temp = temp % .10;
    nickels = Math.round(100 * parseFloat(temp) / 5);
    temp = temp % .05;

    $('#user-cash').val(0.00);
    $('#change-return').val(quarters + ` quarters, ` + dimes + ` dimes, `
    + nickels + ` nickels`);
});

$('#purchase-button').click(function (e) {

    var id = $('#item-form').val();
    var amount = $('#user-cash').val() || 0;

    $.ajax({
        type: 'GET',
        url: `https://safe-citadel-78971.herokuapp.com/money/${amount}/item/${id}`,
        success: function (data, status) {
            $('#items-div').empty();
            $('#message-form').val('');
            var changeString = data.quarters + ' quarters, '
             + data.dimes + 'dimes, ' + data.nickels + 'nickels';
            $('#change-return').val(changeString);
            $('#user-cash').val(0.00);
            getItemButtons();
        },
        error: function(data) {
            $('#message-form').val('');
            $('#message-form').val(data.responseJSON.message);
        }

    });
});