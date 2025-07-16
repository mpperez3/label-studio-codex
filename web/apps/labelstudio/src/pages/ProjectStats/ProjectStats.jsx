import { useEffect, useState } from 'react';
import { Block } from '../../utils/bem';
import { useAPI } from '../../providers/ApiProvider';
import { useProject } from '../../providers/ProjectProvider';
import { Spinner } from '../../components/Spinner/Spinner';
import { BarChart } from '../../components/BarChart/BarChart';

export const ProjectStats = () => {
  const api = useAPI();
  const { project } = useProject();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (!project?.id) return;
    api.callApi('dataSummary', { params: { pk: project.id } }).then(setSummary);
  }, [project]);

  if (!summary) return (
    <Block name="project-stats"><Spinner size={64} /></Block>
  );

  const labels = [];
  for (const [_, data] of Object.entries(summary.created_labels || {})) {
    for (const [label, count] of Object.entries(data)) {
      const found = labels.find(l => l.label === label);
      if (found) found.count += count;
      else labels.push({ label, count });
    }
  }

  const tasksData = [
    { label: 'Completed', count: project.finished_task_number || 0 },
    { label: 'Remaining', count: (project.task_number || 0) - (project.finished_task_number || 0) },
  ];

  return (
    <Block name="project-stats">
      <h2>Project Statistics</h2>
      <h3>Task Progress</h3>
      <BarChart data={tasksData} />
      <h3>Labels Distribution</h3>
      <BarChart data={labels} />
    </Block>
  );
};

ProjectStats.title = 'Statistics';
ProjectStats.path = '/stats';
