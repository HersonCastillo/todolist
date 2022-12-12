import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { InputBoxComponent } from './input-box.component';

describe(InputBoxComponent.name, () => {
  it('should render correctly', async () => {
    await render(InputBoxComponent);
    expect(screen.getByText(/Write something.../)).toBeTruthy();
  });

  it('should emit input content', async () => {
    const emitter = { emit: jest.fn() };
    await render(InputBoxComponent, {
      componentProperties: {
        send: emitter as never,
      },
    });

    const input = screen.getByRole('textbox');
    const submit = screen.getByRole('button', { name: /Add task/ });

    await userEvent.type(input, 'Something');
    await userEvent.click(submit);

    expect(emitter.emit).toHaveBeenCalledWith({
      title: 'Something',
      description: null,
    });
  });

  it('should show error on invalid input', async () => {
    await render(InputBoxComponent);
    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'test');
    await userEvent.tab();

    expect(screen.getByText(/This field is required/)).toBeTruthy();
  });
});
