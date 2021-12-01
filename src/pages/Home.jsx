import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"

const Home = () => {
	const services = [
		{ name: "Showcase", url: "https://vincipit.com" },
		{ name: "API", url: "https://api.server.vincipit.com" },
		{ name: "OpenVVRT", url: "https://api.openvivi.com" },
		{ name: "Dashboard", url: "https://dashboard.vincipit.com" },
		{ name: "God view", url: "https://god.vincipit.com" },
		{ name: "X.A.N.A", url: "https://xana.vincipit.com" },
	]
	const Card = ({ service }) => {
		const [isOnline, setIsOnline] = useState(false)

		useEffect(() => {
			// fetch(service.url).then(res => {
				// if (res)
					// setIsOnline(true)
			// })
		// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [])

    return (
      <div className="w-11/12 xl:w-12/25 h-1/6 xl:h-auto mt-4 md:mt-9 xl:mt-6 flex flex-col shadow-xl rounded-xl p-2 bg-darkBlue">
        <div className="font-itc text-center mb-3 mt-3" href={service.url}>
          <div className={`bg-${isOnline ? "viviGreen" : "viviRed"} h-4 w-4 rounded-full mr-3 float-right`}></div>
					<a href={service.url}>{service.name}</a>
				</div>
				<Line data={canvas => {
					const ctx = canvas.getContext("2d");
					const chartColor = '#FFFFFF';
					const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
					gradientStroke.addColorStop(0, '#80b6f4');
					gradientStroke.addColorStop(1, chartColor);

					const gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
					gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
					gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
					return {
						labels: ["t-10", "t-9", "t-8", "t-7", "t-6", "t-5", "t-4", "t-3", "t-2", "t-1", "t"],
						datasets: [{
							label: "Response time",
							borderColor: "#f96332",
							pointBorderColor: "#FFF",
							pointBackgroundColor: "#f96332",
							pointBorderWidth: 2,
							pointHoverRadius: 4,
							pointHoverBorderWidth: 1,
							pointRadius: 4,
							fill: true,
							backgroundColor: gradientFill,
							borderWidth: 2,
							data: []
						}]
					}
				}
				} />
			</div>
		)
	}

  return (
    <div className="text-white h-auto flex flex-row flex-wrap justify-evenly bg-grayBlue xl:mb-6 md:mb-9 mb-4">
      {services.map((service, idx) => {
        return <Card service={service} key={idx}/>
      })}
    </div>
  )
}

export default Home
