import request from 'supertest';
import { TemplateLiteralType } from 'typescript';
import app from '../../app';
interface teamType {
    captainId: string,
    wicketKeeperId: string
}
interface playerType {
    id: string,
    image: string,
    name: string,
    nationality: string,
    stats: {
        matches: number,
        runs: number,
        wickets: number
    }
}
jest.mock('../../controller/team-details.ts',()=>{
    return {
        getTeamDetails:()=>{return Promise.resolve('done')},
        setTeamDetails:(id:String,team:teamType,players:Array<playerType>)=>{return Promise.resolve('done')}
    }
});

describe('/teams/:name',()=>{
    it('should return status code 200 on GET method',async()=>{
        const response=await request(app).get('/teams/chennai-super-kings')
        expect(response.statusCode).toBe(200)
    }),
    it('should return status code 201 on POST method',async()=>{
        const res=await request(app).post('/teams/chennai-super-kings').send({id:'test'})
        expect(res.statusCode).toBe(201)
    })
})