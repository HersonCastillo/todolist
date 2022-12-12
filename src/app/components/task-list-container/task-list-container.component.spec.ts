import { render, screen, fireEvent } from '@testing-library/angular';
import { TaskListContainerComponent } from './task-list-container.component';

describe(TaskListContainerComponent.name, () => {
  it('should render correctly', async () => {
    await render(TaskListContainerComponent, {
      componentProperties: {
        title: 'Task List Test',
      },
    });

    expect(screen.getByText(/Task List Test/)).toBeTruthy();
  });

  it('should emit task list', async () => {
    const emitter = { emit: jest.fn() };
    const task = {
      id: 1,
      title: 'Title',
      description: 'Description',
      isDone: false,
      timestamp: new Date(1999, 1, 1),
    };

    await render(TaskListContainerComponent, {
      componentProperties: {
        title: 'Task List Test',
        list: [task],
        checkboxChange: emitter as never,
      },
    });

    const input = screen.getByRole('checkbox');
    fireEvent.click(input);

    expect(emitter.emit).toHaveBeenCalledWith({ checked: true, task });
  });
});
