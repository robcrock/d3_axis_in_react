const Axis = () => {
  const ticks = useMemo(() => {
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([10, 290])

    return xScale.ticks()
      .map(value => ({
        value, xOffset: xScale(value)
      }))
  }, [])

  return (

  )
}
