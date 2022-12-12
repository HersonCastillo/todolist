import { fireEvent, render, screen } from '@testing-library/angular';
import { ITask } from 'interfaces/task';
import { TaskListComponent } from './task-list.component';

describe(TaskListComponent.name, () => {
  const tasks: ITask[] = [
    {
      id: 1,
      title: 'Test 1',
      description: 'Description',
      isDone: false,
      timestamp: new Date(1999, 1, 1),
    },
    {
      id: 2,
      title: 'Test 2',
      description: null,
      isDone: false,
      timestamp: new Date(1999, 1, 2),
    },
    {
      id: 3,
      title: 'Test 3',
      description: 'Description test',
      isDone: true,
      timestamp: new Date(1999, 10, 10),
    },
    {
      id: 4,
      title: 'Test 4',
      description: 'Description test',
      isDone: true,
      timestamp: new Date(1999, 3, 10),
    },
  ];

  it('should render correctly', async () => {
    await render(TaskListComponent, {
      componentProperties: { tasks },
    });

    expect(screen.getByText(/Unresolved Tasks/)).toBeTruthy();
    expect(screen.getByText(/Resolved Tasks/)).toBeTruthy();
  });

  it('should emit checkbox event on click', async () => {
    const emitter = { emit: jest.fn() };
    await render(TaskListComponent, {
      componentProperties: {
        tasks,
        checkboxChange: emitter as never,
      },
    });

    const input = screen.getAllByRole('checkbox').at(0)!;
    fireEvent.click(input);

    expect(emitter.emit).toHaveBeenCalled();
  });

  it('should show unresolved tasks', async () => {
    await render(TaskListComponent, {
      componentProperties: {
        tasks: tasks.filter(({ isDone }) => !isDone),
      },
    });

    expect(screen.getByText(/Unresolved Tasks/)).toBeTruthy();
    expect(screen.queryByText(/Resolved Tasks/)).toBeFalsy();
  });

  it('should show resolved tasks', async () => {
    await render(TaskListComponent, {
      componentProperties: {
        tasks: tasks.filter(({ isDone }) => isDone),
      },
    });

    expect(screen.getByText(/Resolved Tasks/)).toBeTruthy();
    expect(screen.queryByText(/Unresolved Tasks/)).toBeFalsy();
  });
});
