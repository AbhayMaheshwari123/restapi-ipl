import mongoose from 'mongoose';

const teams = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    winningYears: Array,
    venue: String
});

const teamModel = mongoose.model('teams', teams)
export default teamModel;