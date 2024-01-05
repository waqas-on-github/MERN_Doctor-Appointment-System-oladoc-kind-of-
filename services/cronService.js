import cron from "node-cron"
import { seedTimestemps } from "../controlers/slotTimestempsControlers/createTimestemps.js";

const runCron = () => {

cron.schedule('* * * * *', () => {
    // Your code to be executed every second goes here
     seedTimestemps()
    console.log("running crn");


  });

}


export{
  runCron
}