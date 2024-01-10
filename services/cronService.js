import cron from "node-cron"
import { seedTimestemps } from "../controlers/slotTimestempsControlers/updateTimestemps.js";
import { createMultimpeTimeStempsByAppCall } from "../controlers/slotTimestempsControlers/createMultipleTimestemps.js";


const runUpdateCron = () => {

cron.schedule(' 0 0  * * *', () => {
    // Your code to be executed every second goes here
     seedTimestemps()
     console.log("running update  cron");


  });

}



const runCreateCron = () => {

  cron.schedule(' 0 1  * * *', () => {
      // Your code to be executed every second goes here
         createMultimpeTimeStempsByAppCall()
         console.log("running create  crn");
  })
    
  };
  




export{
  runUpdateCron,
  runCreateCron
}