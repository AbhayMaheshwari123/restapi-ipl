import mongoose from 'mongoose';
import config from 'dotenv';
import { getAllTeamData,setAllTeamData } from '../../controller/teams';

const mockTeamData={
    id: "chennai-super-kings",
    teamName: "Chennai Super Kings",
    winningYears: [
      2010,
      2011,
      2018
    ],
    venue: "M. A. Chidambaram Stadium"
}

beforeAll(async()=>{
    config.config();
    const url=process.env.db || 'unknown';
    await mongoose.connect(url);
});

it('should setAllTeamData add data for all teams',async()=>{
    const data=await setAllTeamData(mockTeamData.id,mockTeamData.teamName,mockTeamData.winningYears,mockTeamData.venue);
    expect(data.id).toBe('chennai-super-kings');
})

it('should getAllTeamData method fetch data for all teams',async()=>{
    const data=await getAllTeamData();
    expect(data).not.toBe(null);
})

afterAll(async()=>{
    await mongoose.connection.close;
})
