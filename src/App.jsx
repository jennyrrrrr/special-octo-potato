import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import census from "./census";
import { range } from "lodash";

function App() {
  const chartSize = 1350;
  const offset_top = 400;
  const margin = 30;
  const legendPadding = 200;
  var max_num = 0
  const ages = range(0, 91, 5)
  const _scaleAges = scaleBand()
    .domain(ages)
    .range([0, 1250]);
  const dataByGender = {};

  for (var i = 0; i < census.length; i+=1) {
    if (!dataByGender[census[i].Age]) {
      dataByGender[census[i].Age] = [];
    }
    var cur = census[i].People;
    if (max_num < cur){
      max_num = cur;
    }
    dataByGender[census[i].Age].push(census[i].People);
  };
  console.log(max_num)
  const _scaleY = scaleLinear()
    .domain([0, 11635647])
    .range([offset_top, 50]);

  return (
    <div style={{ margin: 20 }}>
      <div style={{ display: "flex" }}>
        <svg
          width={chartSize + legendPadding}
          height={425}
        >
          {ages.map((ages, i) => {
            return (
              <rect
                x={40+i*65+50} 
                y={offset_top-dataByGender[ages][1]/33245} 
                width="25" 
                height={dataByGender[ages][1]/33245} 
                fill="#C1CBD7" 
              />
            );
          })}
          {ages.map((ages, i) => {
            return (
              <rect
                x={40+i*65+50} 
                y={offset_top-dataByGender[ages][0]/33245} 
                width="25" 
                height={dataByGender[ages][0]/33245} 
                fill="#8696A7"
              />
            );
          })}
          {ages.map((ages, i) => {
            return (
              <rect
                x={68+i*65+50} 
                y={offset_top-dataByGender[ages][3]/33245} 
                width="25" 
                height={dataByGender[ages][3]/33245} 
                fill="#e0cdcf"
              />
            );
          })}
          {ages.map((ages, i) => {
            return (
              <rect
                x={68+i*65+50} 
                y={offset_top-dataByGender[ages][2]/33245} 
                width="25" 
                height={dataByGender[ages][2]/33245} 
                fill="#a27e7e"
              />
            );
          })}
          <AxisBottom
            strokeWidth={0}
            top={offset_top}
            left={margin+52}
            scale={_scaleAges}
            tickValues={ages}
            fontSize={25}
          />
          <AxisLeft strokeWidth={0} left={margin+30} scale={_scaleY} />

          <text x="450" y="20" fontSize={25}>U.S. Population, 1900 vs. 2000, Male vs. Female</text>

          <text x="1090" y="80" fontSize={15}>Male</text>
          <text x="1080" y="140" fontSize={15}>Female</text>

          <text x="1325" y={offset_top+20} fontSize={15}>Age</text>
          <text x="10" y="40" fontSize={15}>Number of People</text>

          <line x1={chartSize} y1={offset_top} x2="60" y2={offset_top} stroke="black" />
          <line x1="60" y1={offset_top} x2="60" y2={50} stroke="black" />

          <circle cx="1150" cy="60" r="10"fill="#C1CBD7"></circle> 
          <text x="1170" y="65" fontSize={15}>2000</text>
          <circle cx="1150" cy="90" r="10"fill="#8696A7"></circle>
          <text x="1170" y="95" fontSize={15}>1900</text>
          <circle cx="1150" cy="120" r="10"fill="#e0cdcf"></circle>
          <text x="1170" y="125" fontSize={15}>2000</text>
          <circle cx="1150" cy="150" r="10"fill="#a27e7e"></circle>
          <text x="1170" y="155" fontSize={15}>1900</text>
        </svg>

      </div>
      <p> This visualization is using the 1900 and 2000  U.S. population data collected by the census bureau. 
        This visualization is to show the comparison of the population of 1900 and 2000. 
        As well as comparing the population of males and females over the ages from 0 - 90 years old in 1900 and 2000. </p>
      <p> For the design of the visualization, I choose to create a bar chart. 
        The x-axis is the ages, grouped by 5 years, from 0 to 90 years old. 
        The y-axis is the number of people. Range from 0 to 11,000,000+. 
        The colors I choose to represent the two sex are blue and red. 
        Dark blue represents the population of males in 1900; 
        Dark red represents the colors for females in 1900. 
        Lighter blue and red are representing the male and female population for 2000. 
        The choice of the contrasting colors is showing a comparison between the sex. 
        The similar colors scheme but different darkness is showing the comparison between the two years. </p>
      <p> From this visualization, we can learn that: </p>
      <ol>
        <li> In 1900, the population is showing a linearly descending pattern. 
          The population of younger people is more than the population of older people.
        </li>
        <li> In 2000, the population of people aged from 0 to 30 is about the same, around 10,000,000. 
          The number of people from 35 to 90 also looks linearly descending. 
        </li>
        <li> Comparing the population of 1900 and 2000, the population of 2000 is a lot more than 1900. 
            From 0 to 25 years old, the population of 2000 is about twice as much as 1900. 
            From 30 to 90, the population of 2000 is about four times as much as of 1900.
        </li>
        <li> Comparing the population between males and females. 
          In 1900, the number of males is slightly higher than the number of women for most of the age bins.
        </li>
        <li> In 2000, in the 0-30 age range, the number of males is higher than the number of women; And for the age of 35 - 90, 
          the number of women is clearly higher than the number of men.
          Especially for the age range from 70 to 90, the number of women is a lot higher than the number of men. 
        </li>
      </ol>
       <p> We may conclude that the U.S. population of 2000 is a lot higher than the population of 1900.
          And from 1900 to 2000, the distribution of the population over the years is getting more evenly distributed. 
          We may also infer that our society and medical technology are providing us with better life that there are much more newborns and longevity people in 2000 than in 1900. 
      </p>
      <p> All codes can be found on <a href="https://github.com/jennyrrrrr/special-octo-potato">github</a>
      </p>
    </div>
  );
}
export default App;
