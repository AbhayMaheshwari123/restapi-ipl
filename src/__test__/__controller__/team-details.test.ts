import mongoose from 'mongoose';
import config from 'dotenv';
import { getTeamDetails,setTeamDetails } from '../../controller/team-details';

const mockTeamData={
    team:{
        captainId:'2101',wicketKeeperId:'2109'
    },
    id:'chennai-super-kings',
    players:[
        {
            id: "2101",
            name: "MS Dhoni",
            nationality: "Indian",
            image: "https://iplstatic.s3.amazonaws.com/players/210/1.png",
            stats: {
                matches: 15,
                runs: 416,
                wickets: 0
            }
        }
    ]
}

beforeAll(async()=>{
    config.config();
    const url=process.env.db || 'unknown';
    await mongoose.connect(url);
});

it('should getTeamDetails fetch data of particular team',async()=>{
    const data=await getTeamDetails('chennai-super-kings');
    expect(data).not.toBe(null);
})

it('should setTeamDetails add data of particular team',async()=>{
    const data=await setTeamDetails(mockTeamData.id,mockTeamData.team,mockTeamData.players);
    expect(data.id).toBe('chennai-super-kings');
})

afterAll(async()=>{
    await mongoose.connection.close;
})
