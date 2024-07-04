const Player = require('../models/player');

exports.getPlayer = async (req, res, next) => {
    const { name } = req.params;
    try{
        const player = await Player.findAll({ where: {name: name}});
        res.json(player);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.createPlayer = async (req, res, next) => {
    const { name, dob, photoUrl, birthPlace, noOfMatches, score, fifties, hundreds, wicket, average} = req.body;
    try{
        const newPlayer = await Player.create({ name, dob, photoUrl, birthPlace, noOfMatches, score, fifties, hundreds, wicket, average});
        res.status(201).json(newPlayer);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.updatePlayer = async (req, res, next) => {
    const { id } = req.params;
    const { name, dob, photoUrl, birthPlace, noOfMatches, score, fifties, hundreds, wicket, average} = req.body;
    try{
        const player = await Player.findByPk(id);
        if(!player){
            return res.status(404).json({ message: 'Player not found!'});
        }

        player.name = name;
        player.dob = dob;
        player.photoUrl = photoUrl;
        player.birthPlace = birthPlace;
        player.noOfMatches = noOfMatches;
        player.score = score;
        player.fifties = fifties;
        player.hundreds = hundreds;
        player.wicket = wicket;
        player.average = average;

        await player.save();
        res.json(player);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.deletePlayer = async (req, res, next) => {
    const { id } = req.params;
    try{
        const player = await Player.findByPk(id);
        if(!player){
            return res.status(404).json({ message: 'Player not Found!'});
        }
        await player.destroy();
        res.json({message: 'Player deleted successfully'});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};