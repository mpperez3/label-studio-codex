import { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, axisLeft, axisBottom, max } from 'd3';

export const BarChart = ({ data, width = 400, height = 200 }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = select(ref.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const x = scaleBand()
      .domain(data.map(d => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = scaleLinear()
      .domain([0, max(data, d => d.count) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append('g')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.label))
      .attr('y', d => y(d.count))
      .attr('height', d => y(0) - y(d.count))
      .attr('width', x.bandwidth())
      .attr('fill', '#3182bd');

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(axisBottom(x));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisLeft(y));
  }, [data, height, width]);

  return <svg ref={ref} width={width} height={height} />;
};
