// Models
const Message = require('@models/message');

// Utilities
const { throwError, passError, handleValidationErrors } = require('@util/errors');
const { checkUpdatesValid, applyUpdates } = require('@util/updates');

// App

// Get all my messages
exports.getMyMessages = async (req, res, next) => {
   try {
      let messages = await Message.find({ recipient: req.user._id });

      if (!messages) {
         throwError('No messages found', 422);
      }

      res.status(200).json(messages);
   } catch (err) {
      passError(err, next);
   }
};

// Get single message
exports.getSingle = async (req, res, next) => {
   try {
      let message = await Message.findOne({ _id: req.params.id, recipient: req.user._id });

      if (!message) {
         throwError('No message found', 422);
      }

      res.status(200).json(message);
   } catch (err) {
      passError(err, next);
   }
};

// Toggle message read
exports.toggleRead = async (req, res, next) => {
   try {
      const message = await Message.findByIdAndUpdate(req.params.id, req.body);

      if (!message) {
         throwError('Message status not toggled', 422);
      }

      res.status(200).json({ status: 'Message status toggled' });
   } catch (e) {
      res.status(500).send();
   }
};

// Remove message
exports.remove = async (req, res, next) => {
   try {
      const message = await Message.findByIdAndDelete(req.params.id);

      if (!message) {
         throwError('Message not removed', 422);
      }

      res.status(200).json({ status: 'Message removed' });
   } catch (e) {
      res.status(500).send();
   }
};
