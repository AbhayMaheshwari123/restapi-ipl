import team from "../models/teams";

const getAllTeamData = async () => {
    return await team.find({}, {_id: 0, __v: 0})
        .then((data) => data).catch(() => {
            return Error
        });
}
const setAllTeamData = async (id: string, teamName: string, winningYears: Array<number>, venue: string) => {
    const teamDocument = new team({
        id: id,
        teamName: teamName,
        winningYears: winningYears,
        venue: venue
    })
    try {
        return await teamDocument.save()
    } catch (err) {
        return err
    }
}
export {getAllTeamData, setAllTeamData}
