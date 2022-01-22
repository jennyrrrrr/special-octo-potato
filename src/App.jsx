import { scaleLinear, scaleBand, extent, line, symbol, csv } from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import census from "./census";
import { range } from "lodash";

function App() {
  const chartSize = 1350;
  const offset_top = 400;
  const margin = 30;
  const legendPadding = 200;
  const ages = range(0, 91, 5)
  const _scaleAges = scaleBand()
    .domain(ages)
    .range([0, 1250]);
  const dataByAge = {};
  const years = [2000, 1900, 2000, 1900]
  const colors = ["#e0cdcf", "#a27e7e", "#c1cbd7", "#8696a7"];
  const num = [68, 68, 40, 40]
  var max_num = 0

  for (var i = 0; i < census.length; i+=1) {
    if (!dataByAge[census[i].Age]) {
      dataByAge[census[i].Age] = [];
    }
    var cur = census[i].People;
    if (max_num < cur){
      max_num = cur;
    }
    dataByAge[census[i].Age].push(census[i].People); // Male 1900, Male 2000, Female 1900, Female 2000.
  };

  const _scaleY = scaleLinear()
    .domain([0, max_num])
    .range([offset_top, 50]);

  return (
    <div style={{ margin: 20 }}>
      <div style={{ display: "flex" }}>
        <svg
          width={chartSize + legendPadding}
          height={425}
        >
          {colors.map((color, j)=>{
            return ages.map((age, i)=>{
              return (
                <rect
                  x={num[j]+i*65+50} 
                  y={offset_top-dataByAge[age][3-j]/(max_num/(offset_top-50))} 
                  width="25" 
                  height={dataByAge[age][3-j]/(max_num/(offset_top-50))} 
                  fill={color}
                />
              );
            })
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
          <text x="1080" y="80" fontSize={15}>Female</text>
          <text x="1090" y="140" fontSize={15}>Male</text>
          <text x="1325" y={offset_top+20} fontSize={15}>Age</text>
          <text x="10" y="40" fontSize={15}>Number of People</text>

          <line x1={chartSize} y1={offset_top} x2="60" y2={offset_top} stroke="black" />
          <line x1="60" y1={offset_top} x2="60" y2={50} stroke="black" />

          {colors.map((color, j)=>{
            return (
              <circle cx="1150" cy={60+j*30} r="10" fill={color}></circle>
            );
          })} 
          {years.map((year, j)=>{
            return (
              <text x="1170" y={65+j*30} fontSize={15}>{year}</text>
            );
          })} 
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
      <p> All codes can be found on <a href="https://github.com/jennyrrrrr/special-octo-potato">github</a>.
      </p>
    </div>
  );
}
export default App;
