

// Function to calculate blood alcohol concentration (BAC)
function calculateBAC() {
  const startDrinkingTime = new Date(getFirstDrinkTime().getTime()).addHours(-1);

  var soberInterval = new Date(0);

  // console.log(startDrinkingTime);

  // Initialize arrays for chart data
  const labels = [];
  const bacData = [];

  // d is the density of alcohol (= 0.789 grams per millilitre, constant)
  const d = 0.789458;

  // a is the proportion of the alcohol absorbed
  const a = 0.95; // we assume to absorb 95% of the alcohol

  // BMI is the Body Mass Index
  let BMI = weight / Math.pow(height, 2);

  // r is the subject's proportion of body water in litres/kilogram, divided by the proportion of water in blood in litres/litre (Widmark Factor)
  var r;
  if (biologicalSex == "Men" || biologicalSex == "Attack helicopter") {
    r = 1.0181 - 0.01213 * BMI;
  }
  else if (biologicalSex == "Women") {
    r = 0.9367 - 0.01240 * BMI;
  }
  // M is the mass of the subject, in kilograms
  M = weight;

  // B is the subject's elimination rate, in mg% per hour
  const B = 14.8; // can be an aproximation

  // calculate each point of the graph for different times
  let i = startDrinkingTime;
  while ( i < addDates(startDrinkingTime, chartLength) ) {

    const alcoholMassSum = drinks.reduce((sum, drink) => {
      const drinkAlcoholMass = drink.volume * drink.alcohol/100 * d;
      return sum + (drink.drinkTime.greaterThan(i) ? 0 : drinkAlcoholMass);
    }, 0); // UNIT : mL * % * g/mL = g

    // time is the duration from the start of the session to the relevant time, in hours
    const time = (i-startDrinkingTime)/(60*60*1000);

    // console.log("time=", time, "soberInterval=", soberInterval, "new_time=", new_time);
    
    // BAC FORMULA :
    const C = (1/100)*(((100*alcoholMassSum*a)/(r*M)-B*(time - soberInterval.toHours()))).toFixed(3); //(1/100)*mg% => g/L

    var bac;
    if (C > 0) {
      
      bac = C;
    }
    else {
      bac = 0;
      soberInterval = addDates(soberInterval, interval);
    }

    // console.log("bac=", bac);

    labels.push(i.toTimeString().split(' ')[0].slice(0, 5));
    bacData.push(bac);

    i = addDates(i, interval);
  }

  return { labels, bacData };
}



