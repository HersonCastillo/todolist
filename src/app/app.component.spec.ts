import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  it('should render correctly', async () => {
    await render(AppComponent);
    expect(screen.getByText(/Todo list/)).toBeTruthy();
  });

  it('should create a task', async () => {
    await render(AppComponent);
    const input = screen.getByRole('textbox');
    const submit = screen.getByRole('button', { name: /Add task/ });

    await userEvent.type(input, 'Something');
    await userEvent.click(submit);

    expect(screen.getByText(/Something/)).toBeTruthy();
  });

  it('should switch between task status', async () => {
    await render(AppComponent, {
      componentProperties: {
        tasks: [
          {
            id: 1,
            title: 'Task 1',
            description: null,
            isDone: false,
            timestamp: new Date(1999, 1, 1),
          },
        ],
      },
    });

    const checkbox = screen.getByRole('checkbox');

    expect(screen.getByText(/Unresolved Tasks/)).toBeTruthy();

    await userEvent.click(checkbox);

    expect(screen.getByText(/Resolved Tasks/)).toBeTruthy();
  });
});
