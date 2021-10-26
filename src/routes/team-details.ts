import express, {Request, Response} from 'express'
import {getTeamDetails, setTeamDetails} from '../controller/team-details';

const teamDetails = express.Router();

teamDetails.get('/:id', async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            res.status(200).send(await getTeamDetails(id))
        } catch (err) {
            res.status(404).send("Page Not Found");
        }
    }
);

teamDetails.post('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    const {team, players} = req.body
    try {
        res.status(201).send(await setTeamDetails(id, team, players));
    } catch {
        res.status(500).send("Internal Server Error");
    }
})

export default teamDetails