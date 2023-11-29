import { IsAuthGuard } from './is-auth.guard';

describe('IsAuthGuard', () => {
  it('should be defined', () => {
    expect(new IsAuthGuard()).toBeDefined();
  });
});
