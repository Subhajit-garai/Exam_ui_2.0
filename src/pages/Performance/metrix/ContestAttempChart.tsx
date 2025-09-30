import { motion } from "motion/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {useIsMobile} from "@repo/hooks/isMobile"

const ContestAttempData = [
	{ name: "Attemp", value: 80 ,color:"#00C49F"},
	{ name: "Un-Attemp", value: 13 ,color:"#0088FE"},
];

const ContestAttemptChart = () => {
	let ismobile = useIsMobile()
	return (
		<motion.div
			className='bg-s2 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-4 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='md:text-xl font-semibold text-gray-100 mb-4'>Contest Attempt</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<PieChart>
						<Pie
							data={ContestAttempData}
							cx='50%'
							cy='50%'
							outerRadius={ismobile ?40 :80}
							fill='#8884d8'
							dataKey='value'
							label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
						>
							{ContestAttempData.map((entry, index) => (
								<Cell key={`cell-${index}`} fill={entry.color} />
							))}
						</Pie>
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default ContestAttemptChart;
