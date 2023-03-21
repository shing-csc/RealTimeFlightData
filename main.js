// Probably add a function to wrap the fetch while taking in the date as the parameter
// And then adding it to the url of the fetch function by {}

async function departure(current_date,isArrival){
  
//Level 1: All data of all days => we need to access one by one 
await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
  .then(response => { 
    if (response.status == 200){
      

      //ADD SOME CODE BEFORE

      //This will return a response object
      response.json() 
      .then(flightData => { //Level 2: The whole day data
        
        flightData.forEach((section,index) => { //Level 3: The two sections level in a 

          //const eachSection = document.createElement('div');
          //eachSection.classList.add('sections')      //For setting the borders of the box
          //document.getElementById("lists").appendChild(eachSection)
          let n = 0
          let section_index = index 

          section.list.forEach(flightTime => { //Level 4: Different timeslots in a section

            let current_time = new Date()
            let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()

            let fHours = parseInt(flightTime.time.substring(0,2))
            let fMin = parseInt(flightTime.time.substring(3,5))

            let fTime = fHours*60+ fMin

            
            if ((fTime >= currentTimeInNum) && (n<10) && (section_index == 1)){
              n += 1
            //How about we create everything based on the flight no
            const eachTimeSlot = document.createElement('div')
            eachTimeSlot.classList.add('timeslot')
            document.getElementById("lists").appendChild(eachTimeSlot)

            const multiAirplanes = document.createElement('div')
            multiAirplanes.classList.add('multiAirplanes')
            

            let listOfAirplane = " " 

            flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
              listOfAirplane += " " + airplane.no
              
            })

            multiAirplanes.innerHTML = listOfAirplane
            eachTimeSlot.appendChild(multiAirplanes)

            const scheduledTime = document.createElement('div')
            scheduledTime.classList.add('scheduledTime')
            scheduledTime.innerHTML = section.date + " " + flightTime.time
            eachTimeSlot.appendChild(scheduledTime)

            let destination_compare = flightTime.destination[0]
            
            let partial_place = " "
            let partial_airport = " "

            const destination = document.createElement('div')
            destination.classList.add('destination')
            
            
            
            fetch("iata.json")
            .then(response => {
              if (response.status == 200){
                response.json()
                .then(iata_data => {


                  iata_data.forEach(partial_data => {
                    if (destination_compare == partial_data.iata_code){
                      partial_place = partial_data.municipality
                      partial_airport = partial_data.name
                      destination.innerHTML = partial_place + "  (" + partial_airport +")"
                    }
                  })
                
                  })

                }
              })
            .catch(error => console.error('Error:', error))
            

            eachTimeSlot.appendChild(destination)

            const terminal = document.createElement('div')
            terminal.classList.add('terminal')
            terminal.innerHTML = flightTime.terminal
            eachTimeSlot.appendChild(terminal)

            const status = document.createElement('div')
            status.classList.add('status')
            status.innerHTML = flightTime.status
            eachTimeSlot.appendChild(status)
            }
          })
        })
      })
    }
    
  })
  .catch(error => console.error('Error in the first fetch: ', error))

}

async function arrival(current_date,isArrival){
  
await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
  .then(response => { 
    if (response.status == 200){
      

      //ADD SOME CODE BEFORE

      //This will return a response object
      response.json() 
      .then(flightData => { //Level 2: The whole day data

        flightData.forEach((section, index) => { //Level 3: The two sections level in a 


          let n = 0
          let section_index = index 
          //const eachSection = document.createElement('div');
          //eachSection.classList.add('sections')      //For setting the borders of the box
          //document.getElementById("lists").appendChild(eachSection)

          section.list.forEach(flightTime => { //Level 4: Different timeslots in a section


            let current_time = new Date()
            let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()

            let fHours = parseInt(flightTime.time.substring(0,2))
            let fMin = parseInt(flightTime.time.substring(3,5))

            let fTime = fHours*60+ fMin
            
            

            if ((fTime >= currentTimeInNum) && (n<10) && (section_index!=0)){
              n += 1
            //How about we create everything based on the flight no
            const eachTimeSlot = document.createElement('div')
            eachTimeSlot.classList.add('timeslot')
            document.getElementById("lists").appendChild(eachTimeSlot)

            const multiAirplanes = document.createElement('div')
            multiAirplanes.classList.add('multiAirplanes')

            let listOfAirplane = " " 

            flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
              listOfAirplane += (" " + airplane.no)
              
            })
            multiAirplanes.innerHTML = listOfAirplane
            eachTimeSlot.appendChild(multiAirplanes)

            const scheduledTime = document.createElement('div')
            scheduledTime.classList.add('scheduledTime')
            scheduledTime.innerHTML = section.date + " " + flightTime.time
            eachTimeSlot.appendChild(scheduledTime)

            //===================================================
            let origin_compare = flightTime.origin[0]
            
            let partial_place = " "
            let partial_airport = " "

            const origin = document.createElement('div')
            origin.classList.add('origin')
            
            
            
            fetch("iata.json")
            .then(response => {
              if (response.status == 200){
                response.json()
                .then(iata_data => {


                  iata_data.forEach(partial_data => {
                    if (origin_compare == partial_data.iata_code){
                      partial_place = partial_data.municipality
                      partial_airport = partial_data.name
                      origin.innerHTML = partial_place + "  (" + partial_airport +")"
                    }
                  })
                
                  })

                }
              })
            .catch(error => console.error('Error:', error))
            

            eachTimeSlot.appendChild(origin)

            const parking = document.createElement('div')
            parking.classList.add('parking')
            parking.innerHTML = flightTime.stand
            eachTimeSlot.appendChild(parking)

            const hall = document.createElement('div')
            hall.classList.add('hall')
            hall.innerHTML = " " + flightTime.hall
            eachTimeSlot.appendChild(hall)

            const belt = document.createElement('div')
            belt.classList.add('belt')
            belt.innerHTML = " " + flightTime.baggage
            eachTimeSlot.appendChild(belt)


            const status = document.createElement('div')
            status.classList.add('status')
            status.innerHTML = flightTime.status
            eachTimeSlot.appendChild(status)
            
            
            }
          })
        })
      })
    }
    
  })
  .catch(error => console.error('Error in the first fetch: ', error))

}

const mySwitch = document.querySelector('input')
let current_date = new Date().toISOString().slice(0, 10)


if (mySwitch.checked){
  arrival(current_date,true)
}
else{
  departure(current_date,false)
}

mySwitch.addEventListener('change', () => {

  if (mySwitch.checked){
    document.getElementById("lists").innerHTML=""; /** This basically refreshes */
    arrival(current_date,true)
    buttonOne.style.display = "block"
    buttonTwo.style.display = "block"
   
  }
  else{
    document.getElementById("lists").innerHTML="";
    departure(current_date,false)
    buttonOne.style.display = "block"
    buttonTwo.style.display = "block"
    
    
  }
})

//===============================================================================
// BELOW ARE FOR THE BUTTON IMPLEMENTATION
//

async function arrivalCaseOne(current_date,isArrival){
  
  await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
    .then(response => { 
      if (response.status == 200){
        
  
        //ADD SOME CODE BEFORE
  
        //This will return a response object
        response.json() 
        .then(flightData => { //Level 2: The whole day data
  
          flightData.forEach((section, index) => { //Level 3: The two sections level in a 
  
  
            let n = 0
            let section_index = index 
            //const eachSection = document.createElement('div');
            //eachSection.classList.add('sections')      //For setting the borders of the box
            //document.getElementById("lists").appendChild(eachSection)
  
            section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
  
  
              let current_time = new Date()
              let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
  
              let fHours = parseInt(flightTime.time.substring(0,2))
              let fMin = parseInt(flightTime.time.substring(3,5))
  
              let fTime = fHours*60+ fMin
              
              
  
              if ((fTime <= currentTimeInNum) || section_index == 0){
                
              //How about we create everything based on the flight no
              const eachTimeSlot = document.createElement('div')
              eachTimeSlot.classList.add('timeslot')
              document.getElementById("lists").appendChild(eachTimeSlot)
  
              const multiAirplanes = document.createElement('div')
              multiAirplanes.classList.add('multiAirplanes')
  
              let listOfAirplane = " " 
  
              flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                listOfAirplane += (" " + airplane.no)
                
              })
              multiAirplanes.innerHTML = listOfAirplane
              eachTimeSlot.appendChild(multiAirplanes)
  
              const scheduledTime = document.createElement('div')
              scheduledTime.classList.add('scheduledTime')
              scheduledTime.innerHTML = section.date + " " + flightTime.time
              eachTimeSlot.appendChild(scheduledTime)
  
              //===================================================
              let origin_compare = flightTime.origin[0]
              
              let partial_place = " "
              let partial_airport = " "
  
              const origin = document.createElement('div')
              origin.classList.add('origin')
              
              
              
              fetch("iata.json")
              .then(response => {
                if (response.status == 200){
                  response.json()
                  .then(iata_data => {
  
  
                    iata_data.forEach(partial_data => {
                      if (origin_compare == partial_data.iata_code){
                        partial_place = partial_data.municipality
                        partial_airport = partial_data.name
                        origin.innerHTML = partial_place + "  (" + partial_airport +")"
                      }
                    })
                  
                    })
  
                  }
                })
              .catch(error => console.error('Error:', error))
              
  
              eachTimeSlot.appendChild(origin)
  
              const parking = document.createElement('div')
              parking.classList.add('parking')
              parking.innerHTML = flightTime.stand
              eachTimeSlot.appendChild(parking)
  
              const hall = document.createElement('div')
              hall.classList.add('hall')
              hall.innerHTML = " " + flightTime.hall
              eachTimeSlot.appendChild(hall)
  
              const belt = document.createElement('div')
              belt.classList.add('belt')
              belt.innerHTML = " " + flightTime.baggage
              eachTimeSlot.appendChild(belt)
  
  
              const status = document.createElement('div')
              status.classList.add('status')
              status.innerHTML = flightTime.status
              eachTimeSlot.appendChild(status)
              
              
              }
            })
          })
        })
      }
      
    })
    .catch(error => console.error('Error in the first fetch: ', error))
  
  }

  async function arrivalCaseTwo(current_date,isArrival){
  
    await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
      .then(response => { 
        if (response.status == 200){
          
    
          //ADD SOME CODE BEFORE
    
          //This will return a response object
          response.json() 
          .then(flightData => { //Level 2: The whole day data
    
            flightData.forEach((section, index) => { //Level 3: The two sections level in a 
    
    
              let n = 0
              let section_index = index 
              //const eachSection = document.createElement('div');
              //eachSection.classList.add('sections')      //For setting the borders of the box
              //document.getElementById("lists").appendChild(eachSection)
    
              section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
    
    
                let current_time = new Date()
                let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
    
                let fHours = parseInt(flightTime.time.substring(0,2))
                let fMin = parseInt(flightTime.time.substring(3,5))
    
                let fTime = fHours*60+ fMin
                
    
                if ((fTime >= currentTimeInNum) && (section_index!=0)){
                 
                //How about we create everything based on the flight no
                const eachTimeSlot = document.createElement('div')
                eachTimeSlot.classList.add('timeslot')
                document.getElementById("lists").appendChild(eachTimeSlot)
    
                const multiAirplanes = document.createElement('div')
                multiAirplanes.classList.add('multiAirplanes')
    
                let listOfAirplane = " " 
    
                flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                  listOfAirplane += (" " + airplane.no)
                  
                })
                multiAirplanes.innerHTML = listOfAirplane
                eachTimeSlot.appendChild(multiAirplanes)
    
                const scheduledTime = document.createElement('div')
                scheduledTime.classList.add('scheduledTime')
                scheduledTime.innerHTML = section.date + " " + flightTime.time
                eachTimeSlot.appendChild(scheduledTime)
    
                //===================================================
                let origin_compare = flightTime.origin[0]
                
                let partial_place = " "
                let partial_airport = " "
    
                const origin = document.createElement('div')
                origin.classList.add('origin')
                
                
                
                fetch("iata.json")
                .then(response => {
                  if (response.status == 200){
                    response.json()
                    .then(iata_data => {
    
    
                      iata_data.forEach(partial_data => {
                        if (origin_compare == partial_data.iata_code){
                          partial_place = partial_data.municipality
                          partial_airport = partial_data.name
                          origin.innerHTML = partial_place + "  (" + partial_airport +")"
                        }
                      })
                    
                      })
    
                    }
                  })
                .catch(error => console.error('Error:', error))
                
    
                eachTimeSlot.appendChild(origin)
    
                const parking = document.createElement('div')
                parking.classList.add('parking')
                parking.innerHTML = flightTime.stand
                eachTimeSlot.appendChild(parking)
    
                const hall = document.createElement('div')
                hall.classList.add('hall')
                hall.innerHTML = " " + flightTime.hall
                eachTimeSlot.appendChild(hall)
    
                const belt = document.createElement('div')
                belt.classList.add('belt')
                belt.innerHTML = " " + flightTime.baggage
                eachTimeSlot.appendChild(belt)
    
    
                const status = document.createElement('div')
                status.classList.add('status')
                status.innerHTML = flightTime.status
                eachTimeSlot.appendChild(status)
                
                
                }
              })
            })
          })
        }
        
      })
      .catch(error => console.error('Error in the first fetch: ', error))
    
    }

    async function arrivalCaseThree(current_date,isArrival){
  
      await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
        .then(response => { 
          if (response.status == 200){
            
      
            //ADD SOME CODE BEFORE
      
            //This will return a response object
            response.json() 
            .then(flightData => { //Level 2: The whole day data
      
              flightData.forEach((section, index) => { //Level 3: The two sections level in a 
      
      
                let n = 0
                let section_index = index 
                //const eachSection = document.createElement('div');
                //eachSection.classList.add('sections')      //For setting the borders of the box
                //document.getElementById("lists").appendChild(eachSection)
      
                section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
      
      
                  let current_time = new Date()
                  let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
      
                  let fHours = parseInt(flightTime.time.substring(0,2))
                  let fMin = parseInt(flightTime.time.substring(3,5))
      
                  let fTime = fHours*60+ fMin
                  
                  
      
                  
                  //How about we create everything based on the flight no
                  const eachTimeSlot = document.createElement('div')
                  eachTimeSlot.classList.add('timeslot')
                  document.getElementById("lists").appendChild(eachTimeSlot)
      
                  const multiAirplanes = document.createElement('div')
                  multiAirplanes.classList.add('multiAirplanes')
      
                  let listOfAirplane = " " 
      
                  flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                    listOfAirplane += (" " + airplane.no)
                    
                  })
                  multiAirplanes.innerHTML = listOfAirplane
                  eachTimeSlot.appendChild(multiAirplanes)
      
                  const scheduledTime = document.createElement('div')
                  scheduledTime.classList.add('scheduledTime')
                  scheduledTime.innerHTML = section.date + " " + flightTime.time
                  eachTimeSlot.appendChild(scheduledTime)
      
                  //===================================================
                  let origin_compare = flightTime.origin[0]
                  
                  let partial_place = " "
                  let partial_airport = " "
      
                  const origin = document.createElement('div')
                  origin.classList.add('origin')
                  
                  
                  
                  fetch("iata.json")
                  .then(response => {
                    if (response.status == 200){
                      response.json()
                      .then(iata_data => {
      
      
                        iata_data.forEach(partial_data => {
                          if (origin_compare == partial_data.iata_code){
                            partial_place = partial_data.municipality
                            partial_airport = partial_data.name
                            origin.innerHTML = partial_place + "  (" + partial_airport +")"
                          }
                        })
                      
                        })
      
                      }
                    })
                  .catch(error => console.error('Error:', error))
                  
      
                  eachTimeSlot.appendChild(origin)
      
                  const parking = document.createElement('div')
                  parking.classList.add('parking')
                  parking.innerHTML = flightTime.stand
                  eachTimeSlot.appendChild(parking)
      
                  const hall = document.createElement('div')
                  hall.classList.add('hall')
                  hall.innerHTML = " " + flightTime.hall
                  eachTimeSlot.appendChild(hall)
      
                  const belt = document.createElement('div')
                  belt.classList.add('belt')
                  belt.innerHTML = " " + flightTime.baggage
                  eachTimeSlot.appendChild(belt)
      
      
                  const status = document.createElement('div')
                  status.classList.add('status')
                  status.innerHTML = flightTime.status
                  eachTimeSlot.appendChild(status)
                  
                  
                  
                })
              })
            })
          }
          
        })
        .catch(error => console.error('Error in the first fetch: ', error))
      
      }

      async function departureCaseOne(current_date,isArrival){
  
        //Level 1: All data of all days => we need to access one by one 
        await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
          .then(response => { 
            if (response.status == 200){
              
        
              //ADD SOME CODE BEFORE
        
              //This will return a response object
              response.json() 
              .then(flightData => { //Level 2: The whole day data
                
                flightData.forEach((section,index) => { //Level 3: The two sections level in a 
        
                  //const eachSection = document.createElement('div');
                  //eachSection.classList.add('sections')      //For setting the borders of the box
                  //document.getElementById("lists").appendChild(eachSection)
                  let n = 0
                  let section_index = index 
        
                  section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
        
                    let current_time = new Date()
                    let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
        
                    let fHours = parseInt(flightTime.time.substring(0,2))
                    let fMin = parseInt(flightTime.time.substring(3,5))
        
                    let fTime = fHours*60+ fMin
        
                    
                    if ((fTime <= currentTimeInNum) || section_index ==0){
                      
                    //How about we create everything based on the flight no
                    const eachTimeSlot = document.createElement('div')
                    eachTimeSlot.classList.add('timeslot')
                    document.getElementById("lists").appendChild(eachTimeSlot)
        
                    const multiAirplanes = document.createElement('div')
                    multiAirplanes.classList.add('multiAirplanes')
                    
        
                    let listOfAirplane = " " 
        
                    flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                      listOfAirplane += " " + airplane.no
                      
                    })
        
                    multiAirplanes.innerHTML = listOfAirplane
                    eachTimeSlot.appendChild(multiAirplanes)
        
                    const scheduledTime = document.createElement('div')
                    scheduledTime.classList.add('scheduledTime')
                    scheduledTime.innerHTML = section.date + " " + flightTime.time
                    eachTimeSlot.appendChild(scheduledTime)
        
                    let destination_compare = flightTime.destination[0]
                    
                    let partial_place = " "
                    let partial_airport = " "
        
                    const destination = document.createElement('div')
                    destination.classList.add('destination')
                    
                    
                    
                    fetch("iata.json")
                    .then(response => {
                      if (response.status == 200){
                        response.json()
                        .then(iata_data => {
        
        
                          iata_data.forEach(partial_data => {
                            if (destination_compare == partial_data.iata_code){
                              partial_place = partial_data.municipality
                              partial_airport = partial_data.name
                              destination.innerHTML = partial_place + "  (" + partial_airport +")"
                            }
                          })
                        
                          })
        
                        }
                      })
                    .catch(error => console.error('Error:', error))
                    
        
                    eachTimeSlot.appendChild(destination)
        
                    const terminal = document.createElement('div')
                    terminal.classList.add('terminal')
                    terminal.innerHTML = flightTime.terminal
                    eachTimeSlot.appendChild(terminal)
        
                    const status = document.createElement('div')
                    status.classList.add('status')
                    status.innerHTML = flightTime.status
                    eachTimeSlot.appendChild(status)
                    }
                  })
                })
              })
            }
            
          })
          .catch(error => console.error('Error in the first fetch: ', error))
        
        }

        async function departureCaseTwo(current_date,isArrival){
  
          //Level 1: All data of all days => we need to access one by one 
          await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
            .then(response => { 
              if (response.status == 200){
                
          
                //ADD SOME CODE BEFORE
          
                //This will return a response object
                response.json() 
                .then(flightData => { //Level 2: The whole day data
                  
                  flightData.forEach((section,index) => { //Level 3: The two sections level in a 
          
                    //const eachSection = document.createElement('div');
                    //eachSection.classList.add('sections')      //For setting the borders of the box
                    //document.getElementById("lists").appendChild(eachSection)
                    let n = 0
                    let section_index = index 
          
                    section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
          
                      let current_time = new Date()
                      let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
          
                      let fHours = parseInt(flightTime.time.substring(0,2))
                      let fMin = parseInt(flightTime.time.substring(3,5))
          
                      let fTime = fHours*60+ fMin
          
                      
                      if ((fTime >= currentTimeInNum) && (section_index!=0)){
                        
                      //How about we create everything based on the flight no
                      const eachTimeSlot = document.createElement('div')
                      eachTimeSlot.classList.add('timeslot')
                      document.getElementById("lists").appendChild(eachTimeSlot)
          
                      const multiAirplanes = document.createElement('div')
                      multiAirplanes.classList.add('multiAirplanes')
                      
          
                      let listOfAirplane = " " 
          
                      flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                        listOfAirplane += " " + airplane.no
                        
                      })
          
                      multiAirplanes.innerHTML = listOfAirplane
                      eachTimeSlot.appendChild(multiAirplanes)
          
                      const scheduledTime = document.createElement('div')
                      scheduledTime.classList.add('scheduledTime')
                      scheduledTime.innerHTML = section.date + " " + flightTime.time
                      eachTimeSlot.appendChild(scheduledTime)
          
                      let destination_compare = flightTime.destination[0]
                      
                      let partial_place = " "
                      let partial_airport = " "
          
                      const destination = document.createElement('div')
                      destination.classList.add('destination')
                      
                      
                      
                      fetch("iata.json")
                      .then(response => {
                        if (response.status == 200){
                          response.json()
                          .then(iata_data => {
          
          
                            iata_data.forEach(partial_data => {
                              if (destination_compare == partial_data.iata_code){
                                partial_place = partial_data.municipality
                                partial_airport = partial_data.name
                                destination.innerHTML = partial_place + "  (" + partial_airport +")"
                              }
                            })
                          
                            })
          
                          }
                        })
                      .catch(error => console.error('Error:', error))
                      
          
                      eachTimeSlot.appendChild(destination)
          
                      const terminal = document.createElement('div')
                      terminal.classList.add('terminal')
                      terminal.innerHTML = flightTime.terminal
                      eachTimeSlot.appendChild(terminal)
          
                      const status = document.createElement('div')
                      status.classList.add('status')
                      status.innerHTML = flightTime.status
                      eachTimeSlot.appendChild(status)
                      }
                    })
                  })
                })
              }
              
            })
            .catch(error => console.error('Error in the first fetch: ', error))
          
          }

          async function departureCaseThree(current_date,isArrival){
  
            //Level 1: All data of all days => we need to access one by one 
            await fetch(`flight.php?date=${current_date}&lang=en&cargo=false&arrival=${isArrival}`)
              .then(response => { 
                if (response.status == 200){
                  
            
                  //ADD SOME CODE BEFORE
            
                  //This will return a response object
                  response.json() 
                  .then(flightData => { //Level 2: The whole day data
                    
                    flightData.forEach((section,index) => { //Level 3: The two sections level in a 
            
                      //const eachSection = document.createElement('div');
                      //eachSection.classList.add('sections')      //For setting the borders of the box
                      //document.getElementById("lists").appendChild(eachSection)
                      let n = 0
                      let section_index = index 
            
                      section.list.forEach(flightTime => { //Level 4: Different timeslots in a section
            
                        let current_time = new Date()
                        let currentTimeInNum = current_time.getHours()*60 + current_time.getMinutes()
            
                        let fHours = parseInt(flightTime.time.substring(0,2))
                        let fMin = parseInt(flightTime.time.substring(3,5))
            
                        let fTime = fHours*60+ fMin
            
                        
                        
                          
                        //How about we create everything based on the flight no
                        const eachTimeSlot = document.createElement('div')
                        eachTimeSlot.classList.add('timeslot')
                        document.getElementById("lists").appendChild(eachTimeSlot)
            
                        const multiAirplanes = document.createElement('div')
                        multiAirplanes.classList.add('multiAirplanes')
                        
            
                        let listOfAirplane = " " 
            
                        flightTime.flight.forEach((airplane, index) => { //Level 5: Different airplanes in a time
                          listOfAirplane += " " + airplane.no
                          
                        })
            
                        multiAirplanes.innerHTML = listOfAirplane
                        eachTimeSlot.appendChild(multiAirplanes)
            
                        const scheduledTime = document.createElement('div')
                        scheduledTime.classList.add('scheduledTime')
                        scheduledTime.innerHTML = section.date + " " + flightTime.time
                        eachTimeSlot.appendChild(scheduledTime)
            
                        let destination_compare = flightTime.destination[0]
                        
                        let partial_place = " "
                        let partial_airport = " "
            
                        const destination = document.createElement('div')
                        destination.classList.add('destination')
                        
                        
                        
                        fetch("iata.json")
                        .then(response => {
                          if (response.status == 200){
                            response.json()
                            .then(iata_data => {
            
            
                              iata_data.forEach(partial_data => {
                                if (destination_compare == partial_data.iata_code){
                                  partial_place = partial_data.municipality
                                  partial_airport = partial_data.name
                                  destination.innerHTML = partial_place + "  (" + partial_airport +")"
                                }
                              })
                            
                              })
            
                            }
                          })
                        .catch(error => console.error('Error:', error))
                        
            
                        eachTimeSlot.appendChild(destination)
            
                        const terminal = document.createElement('div')
                        terminal.classList.add('terminal')
                        terminal.innerHTML = flightTime.terminal
                        eachTimeSlot.appendChild(terminal)
            
                        const status = document.createElement('div')
                        status.classList.add('status')
                        status.innerHTML = flightTime.status
                        eachTimeSlot.appendChild(status)
                        
                      })
                    })
                  })
                }
                
              })
              .catch(error => console.error('Error in the first fetch: ', error))
            
            }
// LOAD EARLY FLIGHTS

let buttonOne = document.createElement('button')
buttonOne.id = "buttonOne"
buttonOne.innerHTML = "Load Early Flights"
buttonOne.style.height= "50px"
buttonOne.style.width= "auto"

buttonOne.style.backgroundColor="yellow"
buttonOne.style.position="absolute"
buttonOne.style.top="50px"
buttonOne.style.left="42%"

buttonOne.style.borderStyle="solid"
buttonOne.style.borderColor="rgba(225, 150, 20, 0.336)"
buttonOne.style.boxShadow="0 0 10px darkblue"


buttonOne.addEventListener('click', ()=> {
    document.getElementById("lists").innerHTML="";

    if (mySwitch.checked){
      document.getElementById("lists").innerHTML=""; /** This basically refreshes */
      
      if (buttonTwo.clicked != true){
        // Arrival Case 1: Arrival, buttonOne clicked, buttonTwo unclicked
        arrivalCaseOne(current_date,true)
      }
      else{
        // Arrival Case 3: Arrival, buttonOne clicked, buttonTwo clicked
        console.log("3")
        arrivalCaseThree(current_date,true)
      }
    }
    else{
      document.getElementById("lists").innerHTML="";
      
      if (buttonTwo.clicked != true){
        // Departure Case 1: Departure, buttonOne clicked, buttonTwo unclicked
        departureCaseOne(current_date,false)
      }
      else{
        // Departure Case 3: Departure, buttonOne clicked, buttonTwo clicked
        departureCaseThree(current_date,false)
      }
      
      
    }
    buttonOne.style.display="none"
})

let buttonTwo = document.createElement('button')
buttonTwo.id = "buttonTwo"
buttonTwo.innerHTML = "Load More Flights"
buttonTwo.style.height= "50px"
buttonTwo.style.width= "auto"

buttonTwo.style.backgroundColor="rgba(20, 225, 64, 0.336)"

buttonTwo.style.position="relative"
buttonTwo.style.top="150px"
buttonTwo.style.left="45%"

buttonTwo.style.borderStyle="solid"
buttonTwo.style.borderColor="rgba(225, 150, 20, 0.336)"
buttonTwo.style.boxShadow="0 0 10px orange"

buttonTwo.style.marginBottom="200px"

buttonTwo.addEventListener('click', ()=> {
    document.getElementById("lists").innerHTML="";

    if (mySwitch.checked){
      document.getElementById("lists").innerHTML=""; /** This basically refreshes */
      
      if (buttonOne.clicked != true){
        // Arrival Case 1: Arrival, buttonOne unclicked, buttonTwo clicked
        arrivalCaseTwo(current_date,true)
      }
      else{
        // arrival Case 3: Arrival, buttonOne clicked, buttonTwo clicked
        arrivalCaseThree(current_date,true)
      }
       
     
    }
    else{
      document.getElementById("lists").innerHTML="";
      
      if (buttonOne.clicked != true){
        // Departure Case 2: Departure, buttonOne unclicked, buttonTwo clicked
        departureCaseTwo(current_date,false)
      }
      else{
        // Departure Case 3: Departure, buttonOne clicked, buttonTwo clicked
        departureCaseThree(current_date,false)
      }
    }
    buttonTwo.style.display="none"
})


document.getElementById('automation').append(buttonOne)
document.getElementById('last').append(buttonTwo)