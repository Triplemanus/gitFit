const currentDate = () => {
  let fullDate = new Date();
  //let newDate = fullDate.getDate();
  let twoDigitDate = 
    fullDate.getDate()  >= 10 ? fullDate.getDate() : '0' + fullDate.getDate();
  var twoDigitMonth =
    fullDate.getMonth() + 1 >= 10
      ? (fullDate.getMonth() + 1)
      : "0" + (fullDate.getMonth() + 1);
  var currentDate =
    `${fullDate.getFullYear()}/${twoDigitMonth}/${twoDigitDate}`
  return currentDate;
};

const asideDate = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let current_datetime = new Date();
  let formatted_date =
    days[current_datetime.getDay()] +
    " - " +
    months[current_datetime.getMonth()] +
    " " +
    current_datetime.getDate() +
    ", " +
    current_datetime.getFullYear();
  return formatted_date;
};

// $( document ).ready( () => {
//   console.log( "document loaded" );
// });

$( window ).on( "load", () => {
  var newIDs = [];
  for (let i = 1; newIDs.length < 5; i++) {
    const randomID = Math.floor(Math.random() * userData.length) + 1;
   // const randomID = Math.floor(Math.random() * 10) + 1; //Temporary fixed userData length for sample data file
    if (newIDs.indexOf(randomID) === -1) {
      newIDs.push(randomID);
    }
  }

  const randomID = newIDs[0];

  //const user = new User();
  const userRepository = new UserRepository ();
  const sleepRepository = new SleepRepository(randomID);
  const sleep = new Sleep(randomID);
  const activityRepository = new ActivityRepository(randomID);
  const activity = new Activity(randomID);
  const hydrationRepository = new HydrationRepository(randomID);
  const hydration = new Hydration(randomID);

  populateActivityNums();
  populateHydrationNums();


  //$(".aside__welcome-name").html(user.getUserNameFromID(1));

  $(".aside__user-name").html(userRepository.returnUserData(randomID).name.split(' ')[0]);
  $(".section_full-user-name").html(userRepository.returnUserData(randomID).name);
  $(".section__address").html(userRepository.returnUserData(randomID).address);
  $(".section__email").html(userRepository.returnUserData(randomID).email);
  $(".section__stride-length").html(userRepository.returnUserData(randomID).strideLength);
  $(".aside__date").html(asideDate());
  // populateAvgActivityChart();



  function populateActivityNums() {
    $(".activity__steps-stepNum").html(activity.returnSteps("2019/06/15"));
    $(".activity__minsActive-minsActive").html(activity.returnMinutesActive("2019/06/15"));
    $(".activity__distance-distanceNum").html(activity.returnMilesWalked("2019/06/15"));
  }

  function populateHydrationNums() {
    $(".hydration__steps-ozNum").html(hydration.returnSpecificDayOz("2019/06/15"));
  }

/////////////////////////////Activity Section Charts/////////////////////////////////
  
  let avgActivityChart = new Chart($('.activity__chart-day-allUsers'), {
    type: 'bar',
    data: {
      labels: ["Number of steps", "Minutes active", "Flights of stairs climbed"],
      datasets: [
        {
          label: "Your stats",
          backgroundColor: "#3e95cd",
          data: [
            activity.returnSteps("2019/06/15")/50, 
            activity.returnMinutesActive("2019/06/15"), 
            activity.returnFlightsOfStairs("2019/06/15")
          ]
        }, {
            label: "The average stats of all users",
            backgroundColor: "#8e5ea2",
            data: [
            activityRepository.returnAvgSteps("2019/06/15")/50, 
            activityRepository.returnAvgMins("2019/06/15"), 
            activityRepository.returnAvgStairs("2019/06/15")
          ]
          }
        ]
      },
      options: {
      title: {
        display: true,
        text: 'How you stack up to all users'
      }
    }
  });

  let userWeeklySteps = new Chart($(".activity__chart-weeklySteps-oneUser"), {
    type: 'line',
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        { 
          data: [
            activity.returnSteps("2019/06/15"),
            activity.returnSteps("2019/06/16"),
            activity.returnSteps("2019/06/17"),
            activity.returnSteps("2019/06/18"),
            activity.returnSteps("2019/06/19"),
            activity.returnSteps("2019/06/20"),
            activity.returnSteps("2019/06/21")
          ],
          label: "Your step count",
          borderColor: "#3e95cd",
          fill: false
        }  
      ]
      },
    options: {
      title: {
        display: true,
        text: 'Your weekly step oveview'
      }
    }
  });

  let userWeeklyMins = new Chart($(".activity__chart-weeklyMins-oneUser"), {
    type: 'line',
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [{ 
          data: [
          activity.returnMinutesActive("2019/06/15"),
          activity.returnMinutesActive("2019/06/16"),
          activity.returnMinutesActive("2019/06/17"),
          activity.returnMinutesActive("2019/06/18"),
          activity.returnMinutesActive("2019/06/19"),
          activity.returnMinutesActive("2019/06/20"),
          activity.returnMinutesActive("2019/06/21")
          ],
          label: "Your minutes active",
          borderColor: "#3cba9f",
          fill: false
        } 
      ]
      },
      options: {
        title: {
        display: true,
        text: 'Your weekly minutes active oveview'
      }
    }
  });

  let userWeeklyStairs = new Chart($(".activity__chart-weeklyStairs-oneUser"), {
    type: 'line',
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [{ 
        data: [
          activity.returnFlightsOfStairs("2019/06/15"),
          activity.returnFlightsOfStairs("2019/06/16"),
          activity.returnFlightsOfStairs("2019/06/17"),
          activity.returnFlightsOfStairs("2019/06/18"),
          activity.returnFlightsOfStairs("2019/06/19"),
          activity.returnFlightsOfStairs("2019/06/20"),
          activity.returnFlightsOfStairs("2019/06/21")
        ],
        label: "Your flights of stairs climbed",
        borderColor: "#8e5ea2",
        fill: false
      }  
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Your weekly flights of stairs climbed oveview'
      }
    }
  });

/////////////////////////////Hydration Section Chart/////////////////////////////////

let userWeeklyHydration = new Chart($(".hydration__chart-weeklyOz-oneUser"), {
  type: 'line',
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [{ 
      data: [
        hydration.returnSpecificDayOz("2019/06/15"),
        hydration.returnSpecificDayOz("2019/06/16"),
        hydration.returnSpecificDayOz("2019/06/17"),
        hydration.returnSpecificDayOz("2019/06/18"),
        hydration.returnSpecificDayOz("2019/06/19"),
        hydration.returnSpecificDayOz("2019/06/20"),
        hydration.returnSpecificDayOz("2019/06/21"),
      ],
      label: "Water you consumed each day (oz)",
      borderColor: "#8e5ea2",
      fill: false
    }  
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Your weekly water consumption overview'
    }
  }
});

/*---------------Sleep Section Chart-------------------*/

  let dailySleepData = new Chart($('.sleep-hours-quality__chart'), {
    type: 'bar',
    data: {
      labels: ["Hours slept", "Quality of Sleep"],
      datasets: [
        {
          label: "Your data for the day",
          backgroundColor: "#51768C",
          data: [
            sleep.getHoursSleptOnDay(randomID, currentDate()),
            sleep.getSleepQualityOnDay(randomID, currentDate()) 
          ],
          yAxisID: 'YourData',
        },
        {
          label: "Your averages",
          backgroundColor: "#D96459",
          data: [
            sleep.getAvgHoursSlept(randomID),
            sleep.getAvgSleepQuality(randomID)
          ],
          yAxisID: 'AverageData',
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Sleep data comparison'
      },
      scales: {
        yAxes: [{
          id: 'YourData',
          ticks: {
              beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Hours'
          }
        },
        {
          id: 'AverageData',
          position: 'right',
          ticks: {
              beginAtZero: true,
          },
          scaleLabel: {
            display: true,
            labelString: 'Quality'
          }
        }]
      }
    }
  });

  let weeklySleepData = new Chart($(".sleep-hours-quality-weekly__chart"), {
    type: 'bar',
    data: {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [{ 
        data: 
          sleepRepository.getHoursSleptForWeek(randomID, currentDate()),
        label: "Your hours slept each day",
        backgroundColor: "#548C72",
        borderColor: "#8e5ea2"
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Your hours slept for the week'
      },
      scales: {
        yAxes: {
          id: 'DailySleptHours',
          ticks: {
            beginAtZero: true,
          }
        }
      }     
    }
  });
});

