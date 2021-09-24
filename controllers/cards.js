const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
  .then((cards) => {
    res.status(200).send(cards);
  })
  .catch((err) => {
    console.log(err);
  });
};

const createCard = (req, res) => {
  const { text, link } = req.body;
  const owner = req.user._id;
  Card.create({text, link})
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    console.log(err);
  })
}

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    res.status(200).send(card)
  })
  .catch();
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id }
  },
  {new: true},
  )
  .then((like) => {
    res.status(200).send(like)
  })
  .catch()
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {likes: req.user._id}
  },
  {
    new: true
  },
  )
  .then((like) => {
    res.status(200).send(like)
  })
  .catch()
}

module.exports = { createCard, getCards, deleteCard, likeCard, dislikeCard };
