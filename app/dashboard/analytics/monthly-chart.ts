import betweenWeeks from "./between-weeks"

export const monthlyChart = (chartItems: { date: Date; revenue: number }[]) => {
  return [
    {
      date: "3 Weeks Ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date!, 28, 21))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "2 Weeks Ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date!, 21, 14))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "1 Week Ago",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date!, 14, 7))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
    {
      date: "This Week",
      revenue: chartItems
        .filter((order) => betweenWeeks(order.date!, 7, 0))
        .reduce((acc, price) => acc + price.revenue, 0),
    },
  ]
}
