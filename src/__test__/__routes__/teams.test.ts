import request from 'supertest';
import app from '../../app';

jest.mock('../../controller/teams.ts',()=>{
        return {
            getAllTeamData:()=>{return Promise.resolve('done')},
            setAllTeamData:(id:String,teamName:String,winningYears:Array<number>,venue:String)=>{return Promise.resolve('done')}
        }
});

describe('/teams',()=>{
    it('should return status code 200 on GET method',async()=>{
        const response=await request(app).get('/teams')
        expect(response.statusCode).toBe(200)
    }),
    it('should return status code 201 on POST method',async()=>{
        const res=await request(app).post('/teams').send({id:'test'})
        expect(res.statusCode).toBe(201)
    })
})

