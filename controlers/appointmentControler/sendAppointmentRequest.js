import asyncHandler from "../../utils/asyncHandler.js";
import CustomError from "../../utils/CustomError.js";
import Prisma from "../../prisma.js";


/*
...................APPLICATION LOGIC SENARIOS............

...REQUIREMENTS TO SEND APPIONTMENT REQUEST 
 ... patientId 
 ... doctorId
 ... timeStemps you wanna book for  --> date can  be extrected from timeStemps if needed   

...............IMPLEMENTATION LOGIC..............
 after sendig apointment  request some actions we need do 

  in slotstemps Table set record  "requsetedTobook : true" so other user can not reaplly which timestemp is 
  already likned/intented to booked by some user/patient


 """"""""if doctor accept appointment request from patient"""""

    --->set "doseDoctorAccepted" :true in crosponding appointment row 
    ---> set "status":"SECDULED"  in crosponding appointment row

     ---> get timespempes by timstempId provided by patient  wichih blongs to this doctor and provided/desired by patient 
     -->  then set booked : true , get startTime and endTime  
          and create new record in appointmentSlot and privide 
          start and end time  to create record 
          if---> insertion get successfull  you can set them into null value or leave as it is 

    """"""""""""""""""""""""""if doctor reject  just return responce of rejection 


 if doctor fullfill appointement 
      ---> update  that timestemps to null  from "slotTimestemps" table 

 if doctor canceled  appointement 
    -->delete time related data  insertd in "appointmentSlot" and set back that data in "slotTimestemps"


.........................NOTIFICATION SENARIOS ....................

when appointment requested by user succeed. doctor will get email
then if  appointment will be accepted"SCHEDULED"  by doctor patient should alos get email notification
     ---> if canceled then patient should also be notified/emailed or get sms/whatsapp sms 

-->doctor sould get email when more then 3 appointment requested   
*/


const sendAppointmentRequets = asyncHandler(async(req, res) => {



})





export{ 
    sendAppointmentRequets
}