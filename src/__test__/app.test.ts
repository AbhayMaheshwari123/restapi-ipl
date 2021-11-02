import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import config from 'dotenv';
import Teams from '../models/teams';
import Team from '../models/team-details';
beforeAll(async()=>{
    config.config();
    const url=process.env.db || 'unknown';
    await mongoose.connect(url);
});
describe('/teams',()=>{

    it('should return status code 200 on correct path for all teams',async()=>{
        const res=await request(app).get('/teams');
        expect(res.statusCode).toBe(200);
    }),
    
    it('should return status code 404',async()=>{
        const res=await request(app).get('/');
        expect(res.statusCode).toBe(404);
    }),

    it('should return status code 404 on wrong path for all teams',async()=>{
        const res=await request(app).get('/te');
        expect(res.statusCode).toBe(404);
    }),

    it('should save data to databse for all teams',async()=>{
        const res=await request(app).post('/teams').send(
            {
                id: "test-id",
                teamName: "test-name",
                winningYears: [
                  2010,
                  2011,
                  2018
                ],
                venue: "test-venue"
            }
        )
        const teamsresponse=await Teams.findOne({id:"test-id"});
        expect(teamsresponse.id).toBeTruthy();
        expect(res.statusCode).toBe(201);
    })
    
}),
describe('/teams/:name',()=>{

    it('should return status code 200 on correct path for particular team',async()=>{
        const res=await request(app).get('/teams/chennai-super-kings');
        expect(res.statusCode).toBe(200);
    }),

    it('should return status code 404 on wrong path for particular team',async()=>{
        const res=await request(app).get('/teams/chen');
        expect(res.statusCode).toBe(404);
    }),
    
    it('should save data to database for particular team',async()=>{
        const res=await request(app).post('/teams/chennai-super-kings').send(
            {   
                team:{
                    captainId:'testid'
                }
            })
        const teamresponse=await Team.findOne({team:{captainId:'testid'}});
        expect(teamresponse.team.captainId).toBeTruthy();
        expect(res.statusCode).toBe(201);
    })
})

afterAll(async()=>{
    await mongoose.connection.close;
})