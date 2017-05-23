const axios = require('axios');

module.exports = {
    httpHandler: function (request, reply) {
        var orderMessage = request.payload.order;

        var chunk = orderMessage.split(' ');

        if (chunk.length !== 4) {
            reply({
                message: 'Missing information'
            }).code(400);
            return;
        }

        if (!orderMessage.toLowerCase().includes('give me a beer')) {
            reply({
                message: 'Missing information'
            }).code(400);
            return;
        }

        axios.get('http://csnb655.carsales.office:8000/bierbot/order')
            .then(res => {
                reply({
                    message: res.data === 'ready' ? 'Order received' : 'Beer delivery in progress. Please try again later.'
                });
            })
            .catch((err) => {
                reply({
                    message: 'Error when trying to make an order'
                }).code(400);
            });
    }
};
