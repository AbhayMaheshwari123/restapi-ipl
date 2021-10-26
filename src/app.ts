import express, {Request, Response} from 'express'
import morgan from 'morgan'
import fileSystem from 'fs'
import path from 'path'
import swaggerUI from 'swagger-ui-express';
import teams from './routes/teams';
import teamDetails from './routes/team-details';
import specs from './swagger.json'

const app = express();
app.use(express.json());
app.use(morgan('combined', {
    stream: fileSystem.createWriteStream(
        path.join(__dirname, '../logger/access.log'), {flags: 'a'})
}))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use('/teams', teams)
app.use('/teams', teamDetails)
app.use("*", function (_req: Request, res: Response) {
    res.status(404).send("Page Not Found, Unknown URL!");
})

export default app;