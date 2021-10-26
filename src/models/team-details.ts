import mongoose from 'mongoose';

const teamDetails = new mongoose.Schema({
    id: String,
    players: {
        type: Array,
        playerObj: {
            id: String,
            image: String,
            name: String,
            nationality: String,
            stats: {
                matches: Number,
                runs: Number,
                wickets: Number
            }
        }
    },
    team: {
        captainId: String,
        wicketKeeperId: String
    }
})

const teamModel = mongoose.model("teamDetails", teamDetails);
export default teamModel;