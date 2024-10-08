// import { render, screen, fireEvent } from '@testing-library/angular';
// import { CounterComponent } from './counter.component';
//
// describe('CounterComponent', () => {
//   it('should render counter and greeting', async () => {
//     await render(CounterComponent, {
//       componentProperties: {
//         counter: 5,
//         greeting: 'Hello Alias!',
//       },
//     });
//
//     expect(screen.getByText('Current Count: 5')).toBeVisible();
//     expect(screen.getByText('Hello Alias!')).toBeVisible();
//   });
//
//   it('should increment the counter on click', async () => {
//     await render(CounterComponent, {
//       componentProperties: { counter: 5 },
//     });
//
//     const incrementButton = screen.getByRole('button', { name: '+' });
//     fireEvent.click(incrementButton);
//
//     expect(screen.getByText('Current Count: 6')).toBeVisible();
//   });
//
//   it('should decrement the counter on click', async () => {
//     await render(CounterComponent, {
//       componentProperties: { counter: 5 },
