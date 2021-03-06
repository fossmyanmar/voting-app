import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default ({ poll }) => {
	const colors = [
		['#0082c8', '#00a3fb'],
		['#f58231', '#f7a062'],
		['#911eb4', '#b22adb'],
		['#46f0f0', '#75f4f4'],
		['#f032e6', '#f362ec'],
		['#d2f53c', '#ddf76d'],
		['#fabebe', '#feeded'],
		['#e6194b', '#eb476f'],
		['#3cb44b', '#5bc868'],
		['#ffe119', '#ffe84c'],
		['#008080', '#00b3b3'],
		['#e6beff', '#faf1ff'],
		['#aa6e28', '#d08835'],
		['#fffac8', '#fffffb'],
		['#800000', '#b30000'],
		['#aaffc3', '#ddffe7'],
		['#808000', '#b3b300'],
		['#ffd8b1', '#fff2e4'],
		['#000080', '#0000b3'],
		['#333333', '#4d4d4d']
	]

	if (!poll || (poll.polls && poll.polls.constructor === Array)) {
		return null
	} else {
		const labels = poll.pollOptions.map(datum => datum.name)
		const data = poll.pollOptions.map(datum => datum.quantity)

		const backgroundColor = colors.map(color => color[0])
		const hoverBackgroundColor = colors.map(color => color[1])

		const dataset = {
			labels,
			datasets: [
				{
					data,
					backgroundColor,
					hoverBackgroundColor
				}
			]
		}

		return (
			<Doughnut
				width={60}
				height={50}
				data={dataset}
				legend={{ labels: { boxWidth: 10 } }}
			/>
		)
	}
}
