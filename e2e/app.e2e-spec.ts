import { SanTestPage } from './app.po';

describe('san-test App', () => {
  let page: SanTestPage;

  beforeEach(() => {
    page = new SanTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
