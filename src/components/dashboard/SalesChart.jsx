import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from 'recharts'

function SalesChart({
  sales,
}) {
  // Agrupar ventas por día
  const groupedSales = {}

  sales.forEach((sale) => {
    const day =
      new Date(
        sale.date
      ).toLocaleDateString()

    if (!groupedSales[day]) {
      groupedSales[day] = 0
    }

    groupedSales[day] += sale.total
  })

  const chartData = Object.entries(
    groupedSales
  ).map(([date, total]) => ({
    date,
    total,
  }))

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-zinc-900
        p-6
      "
    >

      <div className="mb-8">

        <h2 className="text-white text-2xl font-bold">
          Ventas
        </h2>

        <p className="text-zinc-500 mt-2">
          Evolución de facturación.
        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={chartData}>

            <XAxis
              dataKey="date"
              stroke="#71717a"
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#22c55e"
              fill="#22c55e33"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default SalesChart