const houses = require("../db.json");
let globalId = 4;

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body;
        if (!address || !price || !imageURL){
            res.sendStatus(400);
        }
        const copy = {...req.body, id: globalId};
        houses.push(copy);
        globalId++;
        res.status(200).send(houses)

        
    },

    updateHouse:(req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        const idx = houses.findIndex(house => house.id === +id);
        let updatePrice = +houses[idx].price;
        if(type === "plus") {
            updatePrice += 10000;
            houses[idx].price = updatePrice;
            res.status(200).send(houses);
        } else if(type === "minus" && updatePrice > 9999){
            updatePrice -= 10000;
            houses[idx].price = updatePrice;
            res.status(200).send(houses);
        }
    },

    deleteHouse: (req, res) => {
        const { id } = req.params;
        const idx = houses.findIndex(house => house.id === +id);
        if (idx >= 0){
            houses.splice(idx, 1)
            res.status(200).send(houses)
        }
    }
}