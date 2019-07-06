const mongoose = require('mongoose');

export const favSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    flower: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Flower'

    }
});


favSchema.index({ user: 1, flower: 1 }, { unique: true });


// export const makeFavSchema = {
//     type: "object",
//     required: ['flowerId'],
//     properties: {
//         flowerId: {
//             type: 'string'
//         }
//     }
// }

// export const getFavSchema = {
//     type: "object",
//     required: ['userId'],
//     properties: {
//         userId: {
//             type: 'string'
//         }
//     }
// }


export const FavModel = mongoose.model('FavFlower', favSchema);

exports.FavModel = FavModel;